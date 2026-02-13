import { db } from "../lib/db";
import { userTable, rolesTable } from "../lib/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const agentEmail = "agent-mcp@gndc.tech";
  const agentUsername = "aibot";

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

  const record=await db.insert(rolesTable).values({
    name:"ai"
  }).returning()

  const data=await db.update(userTable).set({
    role_id:record[0].id
  }).where(eq(userTable.id,agent.id)).returning()


  console.log("\nnew data...");

  console.table(record)
  console.table(data)

  //console.log("\n✨ Seeding completed. Use these tokens in Authorization headers.");
}

main().catch((e) => {
  console.error("❌ Error seeding :", e);
  process.exit(1);
});