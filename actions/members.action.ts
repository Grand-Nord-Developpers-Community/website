"use server";

import { db } from "@/lib/db";
import { members } from "@/lib/db/schema";
import { eq, desc, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createMemberAction(formData: FormData) {
  try {
    const memberData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      region: formData.get("region") as any,
      domain: formData.get("domain") as any,
      photoUrl: formData.get("photoUrl") as string,
      bio: formData.get("bio") as string,
      linkedin: (formData.get("linkedin") as string) || "",
      github: (formData.get("github") as string) || "",
      twitter: (formData.get("twitter") as string) || "",
      instagram: (formData.get("instagram") as string) || "",
      website: (formData.get("website") as string) || "",
      facebook: (formData.get("facebook") as string) || "",
      languages: JSON.parse((formData.get("languages") as string) || "[]"),
      isLeader: false,
      isApproved: false,
    };

    // Validation basique
    if (
      !memberData.fullName ||
      !memberData.email ||
      !memberData.phone ||
      !memberData.region ||
      !memberData.domain ||
      !memberData.photoUrl ||
      !memberData.bio
    ) {
      throw new Error("Tous les champs obligatoires doivent être remplis");
    }

    const existingMember = await db.query.members.findFirst({
      where: eq(members.email, memberData.email),
    });

    if (existingMember) {
      throw new Error("Un membre avec cet email existe déjà");
    }

    await db.insert(members).values(memberData);

    revalidatePath("/members");
    revalidatePath("/");

    return {
      success: true,
      message: "Votre demande d'adhésion a été soumise avec succès !",
    };
  } catch (error) {
    console.error("Error creating member:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'inscription",
    };
  }
}

export async function getMembers() {
  const rawMembers = await db.query.members.findMany({
    orderBy: [desc(members.createdAt)],
    where: eq(members.isApproved, true),
  });

  return rawMembers.map((member) => ({
    ...member,
    isLeader: member.isLeader === true || String(member.isLeader) === "true",
    isApproved:
      member.isApproved === true || String(member.isApproved) === "true",
  }));
}

export async function getLeaders() {
  const rawLeaders = await db.query.members.findMany({
    where: eq(members.isLeader, true),
  });

  return rawLeaders.map((leader) => ({
    ...leader,
    isLeader: leader.isLeader === true || String(leader.isLeader) === "true",
    isApproved:
      leader.isApproved === true || String(leader.isApproved) === "true",
  }));
}

export async function getAllMembers() {
  return db.query.members.findMany({
    orderBy: [desc(members.createdAt)],
  });
}

export async function getMember(id: string) {
  const memberData = await db.query.members.findFirst({
    where: eq(members.id, id),
  });

  if (!memberData) {
    throw new Error("Member not found");
  }

  return memberData;
}

export async function approveMember(id: string) {
  await db
    .update(members)
    .set({ isApproved: true, updatedAt: new Date() })
    .where(eq(members.id, id));

  revalidatePath("/members");
  revalidatePath("/admin");
}
