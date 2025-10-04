import { getBlogPosts } from "@/actions/blog.actions";
import { getEvents } from "@/actions/event.action";
import { getForumPosts } from "@/actions/forum.actions";
import { getUsers } from "@/actions/user.actions";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.BASE_URL;
  const posts = await getBlogPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map(
    ({ slug, updatedAt }) => ({
      url: `${base}/blog/${slug}`,
      lastModified: new Date(updatedAt),
    })
  );

  const users = await getUsers();
  const userEntries: MetadataRoute.Sitemap = users.map(
    ({ username, updatedAt }) => ({
      url: `${base}/user/${username}`,
      lastModified: new Date(updatedAt),
    })
  );

  // --- Events (dynamic) ---
  const events = await getEvents();
  const eventEntries: MetadataRoute.Sitemap = events.map(
    ({ id, updatedAt }) => ({
      url: `${base}/events/${id}`,
      lastModified: new Date(updatedAt),
    })
  );

  const forums = await getForumPosts();
  const forumsEntries: MetadataRoute.Sitemap = forums.map(
    ({ id, createdAt }) => ({
      url: `${base}/forum/${id}`,
      lastModified: new Date(createdAt),
    })
  );
  const staticRoutes = [
    "admin",
    "about",
    "account",
    "bemember",
    "besponsor",
    "blog",
    "codeofconduct",
    "contact",
    "error-auth",
    "events",
    "faq",
    "forum",
    "leaderboard",
    "login",
    "members",
    "privacypolicy",
    "sign-up",
    "sponsors",
    "user",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${process.env.BASE_URL}/${path}`,
    lastModified: new Date(),
  }));
  return [
    ...staticEntries,
    ...postEntries,
    ...eventEntries,
    ...userEntries,
    ...forumsEntries,
  ];
}
