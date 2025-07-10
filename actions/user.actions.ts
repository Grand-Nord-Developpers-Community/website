"use server";
import { db } from "@/lib/db";
import { blogPost, userTable as user, userTable } from "@/lib/db/schema";
//import { LoginSchema } from "@/schemas/login-schema";
//import { RegisterSchema } from "@/schemas/register-schema";
import { completeProfileSchema } from "@/schemas/profile-schema";
import { eq, sql, desc, count, or, ilike } from "drizzle-orm";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { lucia, auth } from "@/lib/auth";
import {
  loginWithGithub as loginGithub,
  loginWithGoogle,
} from "@/lib/api/auth/login";
import { updateUserSchema } from "@/schemas/user-schema";
import { Argon2id } from "oslo/password";

export async function getUserFromDb(email: string, password: string) {
  try {
    const existedUser = await db.query.userTable.findFirst({
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

/*export async function login({
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
}*/

export async function loginWithGithub(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  //await signIn("github");
  try {
    await loginGithub();
  } catch (error) {
    console.log(error);
    return redirect(`/error-auth?error=${error}`);
  }
}

/*export async function register({
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
*/
/*export async function logout() {
  try {
    await LoginOut()
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
  
  // try {
  //   await signOut({
  //     redirect: false,
  //   });
  //   return {
  //     success: true,
  //   };
  // } catch (error: any) {
  //   return {
  //     success: false,
  //     message: error.message,
  //   };
  // }
}*/

export async function updateUserRole(
  userId: string,
  role: "user" | "admin" | "manager"
) {
  await db.update(user).set({ role }).where(eq(user.id, userId));
  revalidatePath("/admin/users");
}

export async function getUserSession() {
  const session = await auth();
  return session?.user?.name ? session : undefined;
}

export async function getUserProfileUserAuth() {
  try {
    const session = await auth();
    const profile = await db.query.userTable.findFirst({
      //@ts-ignnore
      where: eq(user.id, session ? (session.user?.id as string) : ""),
      columns: {
        id: true,
        name: true,
        image: true,
        username: true,
        bio: true,
        websiteLink: true,
        experiencePoints: true,
        email: true,
        isCheckProfile: true,
      },
      with: {
        activity: {
          columns: {
            currentStreak: true,
            totalDaysActive: true,
          },
        },
        forumPosts: {
          columns: {
            score: true,
            textContent: true,
            title: true,
            content: true,
            createdAt: true,
            id: true,
          },
          with: {
            replies: {
              columns: {
                id: true,
              },
              with: {
                votes: true,
              },
            },
            votes: {
              columns: {
                id: true,
                isUpvote: true,
              },
            },
          },
        },
        blogPosts: {
          columns: {
            title: true,
            description: true,
            createdAt: true,
            isDraft: true,
            slug: true,
            id: true,
            content: true,
            like: true,
          },
          with: {
            replies: {
              columns: {
                id: true,
              },
              with: {
                votes: true,
              },
            },
            likes: {
              columns: {
                isLike: true,
              },
            },
          },
        },
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
export async function getUserProfileInformation() {
  const { user } = await auth();
  const profile = getUserProfile(user?.id as string);
  return profile;
}
export async function getUserProfile(userId: string) {
  const profile = await db.query.userTable.findFirst({
    where: or(or(ilike(user.username, userId), eq(user.id, userId))),
    with: {
      activity: {
        columns: {
          currentStreak: true,
          totalDaysActive: true,
        },
      },
      blogPosts: {
        where: eq(blogPost.isDraft, false),
        columns: {
          content: false,
        },
        with: {
          likes: {
            columns: {
              id: true,
            },
          },
        },
      },
      forumPosts: {
        columns: {
          content: false,
        },
        with: {
          replies: {
            columns: {
              id: true,
            },
          },
        },
      },
    },
    columns: {
      id: false,
      username: true,
      name: true,
      image: true,
      bio: true,
      skills: true,
      websiteLink: true,
      experiencePoints: true,
      streak: false,
      email: true,
      role: true,
      location: true,
      phoneNumber: true,
      githubLink: true,
      twitterLink: true,
      instagramLink: true,
      lastActive: false,
      isCompletedProfile: true,
      createdAt: true,
    },
  });

  if (!profile) {
    return undefined;
  }

  return profile;
}

export async function getUsersListByRank() {
  try {
    const users = await db.query.userTable.findMany({
      orderBy: [desc(user.experiencePoints)],
      columns: {
        image: true,
        name: true,
        email: true,
        experiencePoints: true,
        createdAt: true,
        username: true,
      },
    });
    return users;
  } catch (e) {
    console.log("Error : " + e);
    return undefined;
  }
}

export async function getNewUsersList() {
  try {
    const users = await db.query.userTable.findMany({
      orderBy: [desc(user.createdAt)],
      columns: {
        image: true,
        name: true,
        email: true,
        experiencePoints: true,
        createdAt: true,
      },
      limit: 5,
    });
    return users;
  } catch (e) {
    console.log("Error : " + e);
    return undefined;
  }
}

export async function getTotalUsers() {
  try {
    const users = await db.select({ count: count() }).from(userTable);
    return users[0].count;
  } catch (e) {
    console.log("Error : " + e);
    return 0;
  }
}

export async function getUserProfileImage(userId: string) {
  const profileImage = await db.query.userTable.findFirst({
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
  const userToDelete = await db.query.userTable.findFirst({
    where: eq(user.id, userId),
  });

  if (!userToDelete) {
    throw new Error("User not found");
  }

  // Check if the user is not a super admin
  if (userToDelete.role === "manager") {
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

const RESTRICTED_USERNAME = [
  "dashboard",
  "profile",
  "profil",
  "settings",
  "setting",
  "admin",
  "api",
];
export async function updateUserProfileCompletion(
  userId: string,
  data: z.infer<typeof completeProfileSchema>
) {
  try {
    const validatedData = completeProfileSchema.parse(data);

    const userAccount = await db.query.userTable.findFirst({
      //@ts-ignore
      where: (user, { eq }) =>
        or(
          eq(user.username, data.username),
          ilike(user.username, data.username)
        ),
    });

    if (userAccount || RESTRICTED_USERNAME.includes(validatedData.username)) {
      const error = new Error("USERNAME_TAKEN");
      throw error;
    }
    const res = await db
      .update(user)
      .set({
        ...validatedData,
        isCompletedProfile: true,
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId));

    await refreshSession();
    revalidatePath(`/profile/${userId}`);
    revalidatePath("/user");
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return {
      sucess: false,
      username: `${error.message}` === "USERNAME_TAKEN",
      message: `Une erreure s'est produite lors de la completion de votre profile\n: ${error.message}`,
    };
  }
}
export async function refreshSession() {
  //clean previous authentification credential
  const session = await auth();
  await lucia.invalidateSession(session?.session?.id!);

  //create
  const s = await lucia.createSession(session?.user?.id!, {});
  const sessionCookie = lucia.createSessionCookie(s.id);
  cookies().set(sessionCookie);
  return s;
}
export async function updateUserStreak(userId: string) {
  const userRecord = await db.query.userTable.findFirst({
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
  const userRecord = await db.query.userTable.findFirst({
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

export async function updateUserCheckProfile(userId: string) {
  try {
    const res = await db
      .update(user)
      .set({
        isCheckProfile: true,
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
  const currentUser = await db.query.userTable.findFirst({
    where: eq(user.id, userId),
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  // Prepare update object
  const updateObject: Partial<typeof user.$inferInsert> = {};

  // Handle password update
  if (validatedData.newPassword) {
    const isCurrentPasswordValid = await new Argon2id().verify(
      currentUser.password!,
      validatedData.currentPassword!
    );
    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Hash and set new password
    updateObject.password = await new Argon2id().hash(
      validatedData.newPassword
    );
  }

  if (validatedData.name) updateObject.name = validatedData.name;
  if (validatedData.username) {
    const userAccount = await db.query.userTable.findFirst({
      where: (user, { eq }) =>
        or(
          eq(user.username, validatedData.username),
          ilike(user.username, validatedData.username)
        ),
    });

    if (userAccount || RESTRICTED_USERNAME.includes(validatedData.username)) {
      const error = new Error("USERNAME_TAKEN");
      throw error;
    }
  }
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
  await refreshSession();
  revalidatePath(`/user/${updateObject.username || currentUser.username}`);
  revalidatePath("/admin/users");
  revalidatePath("/user/dashboard");
  revalidatePath("/user/profile");
}
