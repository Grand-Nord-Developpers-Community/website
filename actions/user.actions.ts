"use server";
import { signIn, signOut } from "@/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { LoginSchema } from "@/schemas/login-schema";
import { RegisterSchema } from "@/schemas/register-schema";
import { completeProfileSchema } from "@/schemas/profile-schema";
import { eq, sql, desc } from "drizzle-orm";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth"
export async function getUserFromDb(email: string, password: string) {
  try {
    const existedUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (!existedUser) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    if (!existedUser.password) {
      return {
        success: false,
        message: "Password is required.",
      };
    }

    const isPasswordMatches = await bcryptjs.compare(
      password,
      existedUser.password
    );

    if (!isPasswordMatches) {
      return {
        success: false,
        message: "Password is incorrect.",
      };
    }

    return {
      success: true,
      data: existedUser,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    LoginSchema.parse({
      email,
      password,
    });

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Email or password is incorrect.",
    };
  }
}

export async function loginWithGithub(props: {
  searchParams: { callbackUrl: string | undefined }
}) {
  //await signIn("github");
  try {
    await signIn("github", {
      redirectTo: props.searchParams?.callbackUrl ?? "",
    })
  } catch (error) {
    // Signin can fail for a number of reasons, such as the user
    // not existing, or the user not having the correct role.
    // In some cases, you may want to redirect to a custom error
    if (error instanceof AuthError) {
      return redirect(`/error-auth?error=${error.type}`)
    }

    // Otherwise if a redirects happens Next.js can handle it
    // so you can just re-thrown the error and let Next.js handle it.
    // Docs:
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    throw error
  }
}
// export async function loginWithFacebook() {
//   await signIn("facebook", {
//     redirect: true,
//     redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
//   })
// }

export async function register({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    RegisterSchema.parse({
      email,
      password,
      confirmPassword,
    });
    // get user from db
    const existedUser = await getUserFromDb(email, password);
    if (existedUser.success) {
      return {
        success: false,
        message: "User already exists.",
      };
    }
    const hash = await bcryptjs.hash(password, 10);

    const [insertedUser] = await db
      .insert(user)
      .values({
        email,
        password: hash,
      })
      .returning({
        id: user.id,
        email: user.email,
      });

    return {
      success: true,
      data: insertedUser,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function logout() {
  try {
    await signOut({
      redirect: false,
    });
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function updateUserRole(
  userId: string,
  role: "user" | "admin" | "super admin"
) {
  await db.update(user).set({ role }).where(eq(user.id, userId));
  revalidatePath("/admin/users");
}

export async function getUserSession() {
  const session = await auth();
  return session?.user?.name ? session : undefined
}

export async function getUserProfileUserAuth() {
  try {
    const session = await auth();
    const profile = await db.query.user.findFirst({
      //@ts-ignnore
      where: eq(user.id, session ? (session.user?.id as string) : ""),
      columns: {
        id: true,
        name: true,
        image: true,
        bio: true,
        websiteLink: true,
        experiencePoints: true,
        streak: true,
        email: true,
        role: true,
        location: true,
        phoneNumber: true,
        githubLink: true,
        twitterLink: true,
        instagramLink: true,
        lastActive: true,
        isCompletedProfile: true,
        createdAt: true,
      },
    });

    if (!profile) {
      return undefined;
    }
    return profile;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
export async function getUserProfile(userId: string) {
  const profile = await db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: {
      id: true,
      name: true,
      image: true,
      bio: true,
      websiteLink: true,
      experiencePoints: true,
      streak: true,
      email: true,
      role: true,
      location: true,
      phoneNumber: true,
      githubLink: true,
      twitterLink: true,
      instagramLink: true,
      lastActive: true,
      isCompletedProfile: true,
      createdAt: true,
    },
  });

  if (!profile) {
    throw new Error("User not found");
  }

  return profile;
}

export async function getUsersListByRank() {
  try {
    const users = await db.query.user.findMany({
      orderBy: [desc(user.experiencePoints)],
      columns: {
        image: true,
        name: true,
        email: true,
        experiencePoints: true,
        createdAt: true
      },
    });
    return users;
  } catch (e) {
    console.log("Error : " + e)
    return undefined
  }


}

export async function getUserProfileImage(userId: string) {
  const profileImage = await db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: {
      image: true,
    },
  });
  return profileImage;
  if (!profileImage) {
    throw new Error("User image not found");
  }
}
// export async function getUserStats(userId: string) {
//   const userStats = await db
//     .select({
//       blogPostCount: sql<number>`count(distinct ${blogPost.id})`,
//       forumPostCount: sql<number>`count(distinct ${forumPost.id})`,
//       experiencePoints: user.experiencePoints,
//       streak: user.streak,
//     })
//     .from(user)
//     .leftJoin(blogPost, eq(blogPost.authorId, user.id))
//     .leftJoin(forumPost, eq(forumPost.authorId, user.id))
//     .where(eq(user.id, userId))
//     .groupBy(user.id)
//     .limit(1);

//   if (userStats.length === 0) {
//     throw new Error("User not found");
//   }

//   return userStats[0];
// }

export async function deleteUser(userId: string) {
  // Fetch user to check if exists and get role
  const userToDelete = await db.query.user.findFirst({
    where: eq(user.id, userId),
  });

  if (!userToDelete) {
    throw new Error("User not found");
  }

  // Check if the user is not a super admin
  if (userToDelete.role === "super admin") {
    throw new Error("Cannot delete a super admin user");
  }

  // Perform the deletion
  await db.delete(user).where(eq(user.id, userId));

  // Revalidate relevant paths
  revalidatePath("/admin/users");
  revalidatePath("/blog");
  revalidatePath("/forum");
  revalidatePath("/events");
}

// User update action
const updateUserSchema = z
  .object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8).optional(),
    confirmNewPassword: z.string().optional(),
    image: z.string().url().optional(),
    bio: z.string().url().optional(),
    location: z.string().max(100).optional(),
    phoneNumber: z.string().max(20).optional(),
    githubLink: z.string().url().optional(),
    twitterLink: z.string().url().optional(),
    instagramLink: z.string().url().optional(),
    websiteLink: z.string().url().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword) {
        return data.newPassword === data.confirmNewPassword;
      }
      return true;
    },
    {
      message: "New passwords do not match",
      path: ["confirmNewPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword) {
        return !!data.currentPassword;
      }
      return true;
    },
    {
      message: "Current password is required to set a new password",
      path: ["currentPassword"],
    }
  );

export async function updateUserProfileCompletion(
  userId: string,
  data: z.infer<typeof completeProfileSchema>
) {
  try {
    const validatedData = completeProfileSchema.parse(data);
    const res = await db
      .update(user)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId));

    revalidatePath(`/profile/${userId}`);
    revalidatePath("/user");
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return {
      sucess: false,
      message:
        "Une erreure s'est produite lors de la completion de votre profile",
    };
  }
}

export async function updateUserStreak(userId: string) {
  const userRecord = await db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: {
      lastActive: true,
      streak: true,
    },
  });

  if (!userRecord) {
    throw new Error("User not found");
  }

  const now = new Date();
  const lastActive = userRecord.lastActive
    ? new Date(userRecord.lastActive)
    : null;
  let newStreak = userRecord.streak || 0;

  if (lastActive) {
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    if (lastActive < twoDaysAgo) {
      // If last active more than two days ago, reset streak
      newStreak = 1;
    } else if (lastActive < oneDayAgo) {
      // If last active was yesterday, increment streak
      newStreak += 1;
    }
    // If last active was today, do nothing (streak stays the same)
  } else {
    // First activity, set streak to 1
    newStreak = 1;
  }

  await db
    .update(user)
    .set({
      lastActive: now,
      streak: newStreak,
    })
    .where(eq(user.id, userId));

  revalidatePath(`/user/dashboard`);
  //revalidatePath('/dashboard')

  return newStreak;
}

export async function getUserStreak(userId: string) {
  const userRecord = await db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: {
      streak: true,
    },
  });

  if (!userRecord) {
    throw new Error("User not found");
  }

  return userRecord.streak || 0;
}

export async function updateUserProfileCompletionState(userId: string) {
  try {
    const res = await db
      .update(user)
      .set({
        isCompletedProfile: true,
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId));

    //revalidatePath(`/profile/${userId}`);
    //revalidatePath("/user");
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return {
      sucess: false,
      message:
        "Une erreure s'est produite lors de la completion de votre profile",
    };
  }
}
export async function updateUser(
  userId: string,
  userData: z.infer<typeof updateUserSchema>
) {
  // Validate input
  const validatedData = updateUserSchema.parse(userData);

  // Fetch the current user data
  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, userId),
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  // Prepare update object
  const updateObject: Partial<typeof user.$inferInsert> = {};

  // Handle password update
  if (validatedData.newPassword) {
    // Verify current password
    const isCurrentPasswordValid = await bcryptjs.compare(
      validatedData.currentPassword!,
      currentUser.password!
    );
    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Hash and set new password
    updateObject.password = await bcryptjs.hash(validatedData.newPassword, 10);
  }

  // Handle other fields
  if (validatedData.name) updateObject.name = validatedData.name;
  if (validatedData.email) updateObject.email = validatedData.email;
  if (validatedData.image) updateObject.image = validatedData.image;
  if (validatedData.bio) updateObject.bio = validatedData.bio;
  if (validatedData.location) updateObject.location = validatedData.location;
  if (validatedData.phoneNumber)
    updateObject.phoneNumber = validatedData.phoneNumber;
  if (validatedData.githubLink)
    updateObject.githubLink = validatedData.githubLink;
  if (validatedData.twitterLink)
    updateObject.twitterLink = validatedData.twitterLink;
  if (validatedData.instagramLink)
    updateObject.instagramLink = validatedData.instagramLink;
  if (validatedData.websiteLink)
    updateObject.websiteLink = validatedData.websiteLink;

  // Add updatedAt timestamp
  updateObject.updatedAt = new Date();

  // Perform the update
  await db.update(user).set(updateObject).where(eq(user.id, userId));

  // Revalidate relevant paths
  revalidatePath(`/users/${userId}`);
  revalidatePath("/admin/users");
}
