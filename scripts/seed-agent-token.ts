import { db } from "../lib/db";
import { userTable, apiToken, apiTokenPermission, rolesTable } from "../lib/db/schema";
import { eq } from "drizzle-orm";
import { randomBytes, randomUUID } from "crypto";

async function main() {
  const agentEmail = "agent-mcp@gndc.tech";
  const agentUsername = "aibot";

  console.log("🌱 Seeding AI Agent with Scoped Tokens...");

  // 1. Check/Create Agent User
  let agent = await db.query.userTable.findFirst({
    where: eq(userTable.email, agentEmail),
  });

  if (!agent) {
    console.log("👤 Creating new agent user...");
    const userRole = await db.query.rolesTable.findFirst({
      where: eq(rolesTable.name, "user"),
    });
    const roleId = userRole?.id || 1;

    const result = await db.insert(userTable).values({
      id: "b6653a77-3763-4a2d-8fe0-d1f40683b114", // Using the provided ID
      email: agentEmail,
      username: agentUsername,
      name: "AI Agent GNDC",
      role_id: roleId,
      isCompletedProfile: true,
      email_verified: true,
      bio: "Automated AI Agent for MCP GNDC platform operations",
    }).returning();
    agent = result[0];
  } else {
    console.log(`👤 Agent user exists: ${agent.id}`);
  }

  const tokenConfigs = [
    {
      name: "Read-Only Token",
      scopes: ["read:messages"],
      permissions: ["bot:read"],
    },
    {
      name: "Read-Write Token",
      scopes: ["read:messages", "write:messages"],
      permissions: ["bot:write"],
    },
  ];

  console.log("\n🔑 Generating Scoped Tokens...");

  for (const config of tokenConfigs) {
    const tokenString = `mcp-sk-${randomBytes(32).toString("hex")}`;
    
    // Create the token entry
    const [tokenEntry] = await db.insert(apiToken).values({
      id: randomUUID(),
      token: tokenString,
      userId: agent.id,
      name: config.name,
    }).returning();

    // Create the permission entry
    await db.insert(apiTokenPermission).values({
      id: randomUUID(),
      apiTokenId: tokenEntry.id,
      scope: config.scopes,
      permission: config.permissions,
    });

    console.log(`
✅ ${config.name} Created:`);
    console.log(`   Token: ${tokenString}`);
    console.log(`   Scopes: [${config.scopes.join(", ")}]`);
    console.log(`   Permissions: [${config.permissions.join(", ")}]`);
  }

  console.log("\n✨ Seeding completed. Use these tokens in Authorization headers.");
}

main().catch((e) => {
  console.error("❌ Error seeding scoped tokens:", e);
  process.exit(1);
});