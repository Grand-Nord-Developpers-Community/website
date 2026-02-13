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

  const data = await db
    .update(userTable)
    .set({
      name: "AI agent",
      bio: "Je suis agent IA de la GNDC, prêt pour servir dans l'objectif de rendre cette communauté actif via cette plateforme ainsi que dans la communauté whatsapp. Rejoindre la communauté whatsapp pour en savoir plus ",
      skills: [
        { id: "1", text: "Automatisation" },
        { id: "2", text: "AI" },
        { id: "3", text: "MCP" },
        { id: "4", text: "Whatsapp Bot" },
        { id: "5", text: "Agent AI" },
      ],
      websiteLink: "https://chat.whatsapp.com/FMUPbBkEKs24B8rE4h9xsh?mode=hqrt2",
    })
    .where(eq(userTable.id, agent.id))
    .returning();

  console.table(data)

  //console.log("\n✨ Seeding completed. Use these tokens in Authorization headers.");
}

main().catch((e) => {
  console.error("❌ Error seeding :", e);
  process.exit(1);
});