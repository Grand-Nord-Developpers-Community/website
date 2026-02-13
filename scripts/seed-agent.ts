import { db } from "../lib/db";
import { userTable, apiToken, rolesTable } from "../lib/db/schema";
import { eq } from "drizzle-orm";
import { randomBytes, randomUUID } from "crypto";

async function main() {
  const agentEmail = "agent-mcp@gndc.tech";
  const agentUsername = "aibot";

  // Generate a secure token 
  const token = `mcp-sk-${randomBytes(32).toString("hex")}`;

  console.log("Seeding AI Agent...");

  // Check if agent exist user:b6653a77-3763-4a2d-8fe0-d1f40683b114
  let agent = await db.query.userTable.findFirst({
    where: eq(userTable.email, agentEmail),
  });

  if (!agent) {
    console.log("Creating new agent user...");

    // Get role ID for 'user' or default to 1
    const userRole = await db.query.rolesTable.findFirst({
      where: eq(rolesTable.name, "ai"),
    });
    const roleId = userRole?.id || 1;

    // Create user
    const result = await db
      .insert(userTable)
      .values({
        id: randomUUID(),
        email: agentEmail,
        username: agentUsername,
        name: "AI Agent GNDC",
        role_id: roleId,
        isCompletedProfile: true,
        email_verified: true,
        image:
          "http://res.cloudinary.com/dmkjfuddr/image/upload/v1770951108/jcu2dfufuou0qahm5jpe.jpg",
        bio: "Automated AI Agent for MCP GNDC plateform operations",
      })
      .returning();

    agent = result[0];
    console.log(`Agent user created with ID: ${agent.id}`);
  } else {
    console.log(`Agent user already exists with ID: ${agent.id}`);
  }

  // Create API token linked to the agent user
  console.log("Creating API token...");
  await db.insert(apiToken).values({
    token: token,
    userId: agent.id,
  });

  console.log("\n✅ API Token Generated Successfully!");
  console.log("----------------------------------------");
  console.log(`Token: ${token}`);
  console.log("----------------------------------------");
  console.log("Use this token in Authorization header: Bearer <token>");
}

main().catch((e) => {
  console.error("Error seeding agent:", e);
  process.exit(1);
});
