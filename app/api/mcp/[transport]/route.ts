import { createMcpHandler, withMcpAuth } from "mcp-handler";
import { z } from "zod";
import { db } from "@/lib/db";
import { apiToken, blogPost, forumPost, userTable } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import {marked} from "marked"
import { updateBlogVisibility } from "@/actions/blog.actions";
import { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";

// Context storage for userId
//const authContext = new AsyncLocalStorage<string>();

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// Define the MCP Handler
const handler = createMcpHandler(
  (server) => {
    // List Blogs
    server.registerTool(
      "list_blogs",
      {
        description: "List blog posts with pagination and search",
        inputSchema: z.object({
          page: z.number().default(0),
          pageSize: z.number().default(10),
          query: z.string().optional(),
          isDraft: z.boolean().default(false),
        }),
      },
      async ({ page, pageSize, query, isDraft }) => {
        const q = query;
        // @ts-ignore
        const results = await db.query.blogPost.findMany({
          limit: pageSize,
          offset: page * pageSize,
          orderBy: [desc(blogPost.createdAt)],
          // @ts-ignore
          where: (blogs, { and, eq, like, or }) => {
            const conds = [];
            if (q)
              conds.push(
                or(
                  like(blogs.title, `%${q}%`),
                  like(blogs.description, `%${q}%`),
                ),
              );
            conds.push(eq(blogs.isDraft, isDraft));
            return and(...conds);
          },
          with: {
            author: {
              columns: { username: true, name: true, email: true },
            },
          },
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      },
    );

    // Create Blog
    server.registerTool(
      "create_blog",
      {
        description: "Create a new blog post",
        inputSchema: z.object({
          title: z.string(),
          description: z.string(),
          content: z
            .string()
            .describe("the mardown format content of the blog"),
          preview: z.string(),
          previewHash: z.string().default(""),
          tags: z.string().optional(),
        }),
      },
      async (args, extra) => {
        const userId = extra.authInfo?.extra?.userId as string | undefined;
        const permissions = extra.authInfo?.extra?.permissions as
          | string[]
          | undefined;
        if (!permissions?.includes("bot:write")) {
          throw new Error(
            "Forbidden: Insufficient permissions to create a blog post.",
          );
        }
        if (!userId) {
          throw new Error(
            "Unauthorized: No user context found. Please provide a valid API Token.",
          );
        }

        const { title, description, content, preview, previewHash, tags } =
          args;
        const slug = slugify(title);

        const existing = await db.query.blogPost.findFirst({
          where: eq(blogPost.slug, slug),
        });
        if (existing) throw new Error("A blog with this title already exists.");

        const render=await marked(content)
        const result = await db
          .insert(blogPost)
          .values({
            title,
            description,
            content:render,
            preview,
            previewHash,
            tags: tags || null,
            authorId: userId,
            slug,
          })
          .returning();

        return {
          content: [{ type: "text", text: JSON.stringify(result[0], null, 2) }],
        };
      },
    );

    // List Forums
    server.registerTool(
      "list_forums",
      {
        description: "List forum posts",
        inputSchema: z.object({
          page: z.number().default(0),
          pageSize: z.number().default(10),
          query: z.string().optional(),
        }),
      },
      async ({ page, pageSize, query }) => {
        const q = query;
        const results = await db.query.forumPost.findMany({
          limit: pageSize,
          offset: page * pageSize,
          orderBy: [desc(forumPost.createdAt)],
          // @ts-ignore
          where: (forums, { like, or }) => {
            if (q)
              return or(
                like(forums.title, `%${q}%`),
                like(forums.textContent, `%${q}%`),
              );
          },
          with: {
            author: { columns: { username: true, name: true } },
          },
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      },
    );

    // Create Forum
    server.registerTool(
      "create_forum",
      {
        description: "Create a new forum post",
        inputSchema: z.object({
          title: z.string(),
          content: z.string(),
          textContent: z.string(),
        }),
      },
      async ({ title, content, textContent },extra) => {
        const userId = extra.authInfo?.extra?.userId as string | undefined
        const permissions = extra.authInfo?.extra?.permissions as string[]|undefined
        
        if(!permissions?.includes("bot:write")){
          throw new Error("Forbidden: Insufficient permissions to create a blog post.");
        }
        if (!userId) throw new Error("Unauthorized");

        const result = await db
          .insert(forumPost)
          .values({
            title,
            content,
            textContent,
            authorId: userId,
          })
          .returning();
        return {
          content: [{ type: "text", text: JSON.stringify(result[0], null, 2) }],
        };
      },
    );

    // Toggle Blog Visibility
    server.registerTool(
      "toggle_blog_visibility",
      {
        description: "Toggle the visibility (draft status) of a blog post",
        inputSchema: z.object({
          id: z.string().describe("The UUID of the blog post"),
          isDraft: z
            .boolean()
            .describe("Set to true to make it a draft, false to publish"),
        }),
      },
      async ({ id, isDraft },extra) => {
        //const userId = authContext.getStore();
        const userId = extra.authInfo?.extra?.userId as string | undefined;
        
        if (!userId) throw new Error("Unauthorized");

        // We use the existing server action to benefit from XP and trigger side-effects
        const result = await updateBlogVisibility({ id, isDraft });

        if (!result.success) {
          throw new Error(result.message || "Failed to update blog visibility");
        }

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    // List Users
    server.registerTool(
      "list_users",
      {
        description: "List users",
        inputSchema: z.object({
          page: z.number().default(0),
          pageSize: z.number().default(10),
          query: z.string().optional(),
        }),
      },
      async ({ page, pageSize, query }) => {
        const q = query;
        const results = await db.query.userTable.findMany({
          limit: pageSize,
          offset: page * pageSize,
          orderBy: [desc(userTable.createdAt)],
          // @ts-ignore
          where: (users, { like, or }) => {
            if (q)
              return or(
                like(users.name, `%${q}%`),
                like(users.username, `%${q}%`),
              );
          },
          columns: {
            id: true,
            name: true,
            username: true,
            email: true,
            role_id: true,
            createdAt: true,
          },
          with: {
            role: { columns: { name: true } },
          },
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      },
    );

    // Search Images (Unsplash)
    server.registerTool(
      "search_images",
      {
        description: "Search for images using Unsplash API",
        inputSchema: z.object({
          query: z.string().describe("The search query for images"),
          page: z.number().default(1).describe("Page number"),
          perPage: z.number().default(10).describe("Number of items per page"),
        }),
      },
      async ({ query, page, perPage }) => {
        const accessKey = process.env.UNSPLASH_ACCESS_KEY;
        if (!accessKey) {
          throw new Error("Unsplash Access Key is not configured.");
        }

        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query,
          )}&page=${page}&per_page=${perPage}`,
          {
            headers: {
              Authorization: `Client-ID ${accessKey}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Unsplash API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Simplify the output
        const images = data.results.map((img: any) => ({
          id: img.id,
          description: img.description || img.alt_description,
          url: img.urls.regular,
          thumbnail: img.urls.small,
          author: img.user.name,
          authorLink: img.user.links.html,
        }));

        return {
          content: [{ type: "text", text: JSON.stringify(images, null, 2) }],
        };
      },
    );
  },
  {
    capabilities: {
      experimental: {
        auth: {
          type: "bearer",
          required: true,
        },
      },
    },
  },
  {
    streamableHttpEndpoint: "/mcp",
    sseEndpoint: "/sse",
    sseMessageEndpoint: "/message",
    basePath: "/api/mcp",
    maxDuration: 60,
    redisUrl: process.env.REDIS_URL,
  },
);
const verifyToken = async (
  req: Request,
  bearerToken?: string
): Promise<AuthInfo | undefined> => {
  if (!bearerToken) return undefined;

  // TODO: Replace with actual token verification logic
  // This is just an example implementation
  console.log(bearerToken)
  const tokenRecord = await db.query.apiToken.findFirst({
    where: eq(apiToken.token, bearerToken),
    with:{
      permissions:true
    }
  });
  //const isValid = bearerToken.startsWith("__TEST_VALUE__");

  if (!tokenRecord) return undefined;
  const data=tokenRecord.permissions

  return {
    token: bearerToken,
    scopes: data?.scope||[],
    clientId: tokenRecord.id,
    extra: {
      userId: tokenRecord.userId,
      // Add any additional user/client information here
      permissions: data?.permission||[],
      timestamp: new Date().toISOString(),
    },
  };
};

// Create the auth handler with required scopes
const authHandler = withMcpAuth(handler, verifyToken, {
  required: true,
  requiredScopes: ["read:messages"],
  resourceMetadataPath: "/.well-known/oauth-protected-resource",
});

// Export the handler for both GET and POST methods
export { authHandler as GET, authHandler as POST };

// async function handleRequest(
//   req: NextRequest,
//   { params }: { params: Promise<{ transport: string }> },
// ) {
//   // Await params for Next.js 16
//   const resolvedParams = await params;

//   // Basic Auth Check via Header
//   const authHeader = req.headers.get("Authorization");
//   console.log("Auth Header:", authHeader);
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return new NextResponse("Unauthorized: Missing Bearer Token", {
//       status: 401,
//     });
//   }
//   const token = authHeader.split(" ")[1];

//   // Verify token in DB
//   const tokenRecord = await db.query.apiToken.findFirst({
//     where: eq(apiToken.token, token),
//   });

//   if (!tokenRecord) {
//     return new NextResponse("Forbidden: Invalid Token", { status: 403 });
//   }

//   if (tokenRecord.expiresAt && tokenRecord.expiresAt < new Date()) {
//     return new NextResponse("Forbidden: Token Expired", { status: 403 });
//   }

//   // Pass request to MCP handler with context
//   // We bind the userId to the AsyncLocalStorage store
//   return authContext.run(tokenRecord.userId, () =>
//     //@ts-ignore
//     handler(req, { params: resolvedParams }),
//   );
// }

// export { handleRequest as GET, handleRequest as POST };
