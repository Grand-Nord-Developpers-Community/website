"use server";
import { db } from "@/lib/db";
import {
  blogPost,
  forumPost,
  IRole,
  oauthAccountTable,
  postComment,
  rolesTable,
  userTable as user,
  userActivity,
  userLike,
  userTable,
  userVote,
} from "@/lib/db/schema";
//import { LoginSchema } from "@/schemas/login-schema";
//import { RegisterSchema } from "@/schemas/register-schema";
import { completeProfileSchema } from "@/schemas/profile-schema";
import { eq, sql, desc, count, or, ilike, inArray, and } from "drizzle-orm";
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
import {
  UpdatePasswordInput,
  updatePasswordSchema,
} from "@/schemas/password-schema";
import { ScoringPoints } from "@/constants/scoring";
import { processActivity } from "./activity.actions";
import { addJob } from "./qeues.action";

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

export async function updateUserRole(userId: string, role: IRole["name"]) {
  const role_value = await db.query.rolesTable.findFirst({
    columns: {
      id: true,
    },
    where: eq(rolesTable.name, role),
  });
  await db
    .update(user)
    .set({ role_id: role_value?.id })
    .where(eq(user.id, userId));
  revalidatePath("/admin/users");
}

export async function getRoleById(id: number) {
  const role_value = await db.query.rolesTable.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: eq(rolesTable.id, id),
  });
  return role_value?.name ?? "user";
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
      role: {
        columns: {
          name: true,
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
      oauthAccounts: {
        columns: {
          provider_id: true,
          provider_user_id: true,
        },
      },
    },
    columns: {
      id: true,
      username: true,
      name: true,
      image: true,
      bio: true,
      skills: true,
      websiteLink: true,
      experiencePoints: true,
      streak: false,
      email: true,
      role_id: true,
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
        username: true,
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
  const users = await db.select({ count: count() }).from(userTable);
  return users[0].count ?? 0;
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

export async function getUserWithRoleAndDevices(role: IRole["name"]) {
  return await db.query.userTable.findMany({
    columns: {
      name: true,
      email: true,
      id: true,
    },
    where: eq(
      user.role_id,
      db
        .select({ id: rolesTable.id })
        .from(rolesTable)
        .where(eq(rolesTable.name, role))
    ),
    with: {
      devices: true,
      role: {
        columns: {
          name: true,
          id: true,
        },
      },
    },
  });
}
export async function getUserWithRolesAndDevices(role: Array<IRole["name"]>) {
  const roles = await db
    .select({ id: rolesTable.id })
    .from(rolesTable)
    .where(inArray(rolesTable.name, role));

  const roleIds = roles.map((r) => r.id);

  if (roleIds.length === 0) return [];

  return await db.query.userTable.findMany({
    columns: {
      name: true,
      email: true,
      id: true,
    },
    where: inArray(user.role_id, roleIds),
    with: {
      devices: true,
      role: {
        columns: {
          name: true,
          id: true,
        },
      },
    },
  });
}
export async function measure<T>(
  label: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  console.log(`${label} took ${(end - start).toFixed(2)} ms`);
  return result;
}

export async function computeUserXP(userId: string): Promise<number> {
  const blogs = await db.query.blogPost.findMany({
    columns: {
      id: true,
    },
    where: and(eq(blogPost.authorId, userId), eq(blogPost.isDraft, false)),
    with: {
      likes: {
        where: eq(userLike.isLike, true),
      },
      replies: {
        with: {
          votes: {
            where: eq(userVote.isUpvote, true),
          },
        },
        where: eq(postComment.authorId, userId),
      },
    },
  });
  const forums = await db.query.forumPost.findMany({
    columns: {
      id: true,
    },
    where: and(eq(forumPost.authorId, userId)),
    with: {
      votes: {
        where: eq(userVote.isUpvote, true),
      },
      replies: {
        with: {
          votes: {
            where: eq(userVote.isUpvote, true),
          },
        },
        where: eq(postComment.authorId, userId),
      },
    },
  });

  let blogXP = blogs.length * ScoringPoints.ADD_BLOG;
  let forumXp = 0;
  blogs.map((b) => {
    blogXP += b.likes.length * ScoringPoints.UPVOTED_COMMENT;
    b.replies.map((r) => {
      blogXP += r.votes.length * ScoringPoints.UPVOTED_COMMENT;
    });
  });
  forums.map((f) => {
    forumXp += f.votes.length * ScoringPoints.UPVOTED_COMMENT;
    f.replies.map((r) => {
      forumXp += r.votes.length * ScoringPoints.UPVOTED_COMMENT;
    });
  });

  // Count activity streak
  const activity = await db
    .select()
    .from(userActivity)
    .where(eq(userActivity.userId, userId));
  const activityXP =
    activity.length > 0
      ? activity[0].totalDaysActive * ScoringPoints.ACTIVITY_DAY
      : 0;

  return blogXP + forumXp + activityXP;
}

// Compute and update XP for one user
export async function computeAndUpdateUserXP(userId: string): Promise<number> {
  // Blog posts authored (non-drafts)
  const [{ count: blogCount }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(blogPost)
    .where(
      sql`${blogPost.authorId} = ${userId} AND ${blogPost.isDraft} = false`
    );
  const blogXP = blogCount * ScoringPoints.ADD_BLOG;

  // Likes received on blog posts
  const [{ count: blogLikes }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(userLike)
    .innerJoin(blogPost, eq(blogPost.id, userLike.postId))
    .where(sql`${blogPost.authorId} = ${userId} AND ${userLike.isLike} = true`);
  const blogLikeXP = blogLikes * ScoringPoints.UPVOTED_COMMENT; // 1 XP each (you can replace with a constant)

  // Upvotes received on comments (blog + forum)
  const [{ count: commentVotes }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(userVote)
    .innerJoin(postComment, eq(postComment.id, userVote.commentId))
    .where(
      sql`${postComment.authorId} = ${userId} AND ${userVote.isUpvote} = true`
    );
  const commentVoteXP = commentVotes * ScoringPoints.UPVOTED_COMMENT;

  // Upvotes received on forum posts
  const [{ count: forumVotes }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(userVote)
    .innerJoin(forumPost, eq(forumPost.id, userVote.postId))
    .where(
      sql`${forumPost.authorId} = ${userId} AND ${userVote.isUpvote} = true`
    );
  const forumVoteXP = forumVotes * ScoringPoints.UPVOTED_COMMENT;

  // Activity streak
  const [activity] = await db
    .select({ streak: userActivity.totalDaysActive })
    .from(userActivity)
    .where(eq(userActivity.userId, userId));
  const activityXP = activity
    ? activity.streak * ScoringPoints.ACTIVITY_DAY
    : 0;

  // Total XP
  const totalXP =
    blogXP + blogLikeXP + commentVoteXP + forumVoteXP + activityXP;

  // Update user record with new XP
  await db
    .update(user)
    .set({ experiencePoints: totalXP })
    .where(eq(user.id, userId));

  return totalXP;
}

export async function recomputeAllUsersXP() {
  const users = await db.select({ id: user.id }).from(user);

  for (const u of users) {
    await computeAndUpdateUserXP(u.id);
  }
  console.log("done !!");
}
/**pagination fetch */

export async function getPaginatedUsers(page: number, pageSize: number) {
  const offset = page * pageSize;
  const result = await db.query.userTable.findMany({
    orderBy: [desc(user.createdAt)],
    columns: {
      username: true,
      id: true,
      name: true,
      image: true,
      isCompletedProfile: true,
      createdAt: true,
      experiencePoints: true,
    },
    limit: pageSize,
    offset: offset,
  });
  // console.log(result);

  return result;
}

// Example usage:
// const firstPageUsers = await getPaginatedUsers(1, 10);
// const secondPageUsers = await getPaginatedUsers(2, 10);
export async function deleteUser(userId: string) {
  // Fetch user to check if exists and get role
  const userToDelete = await db.query.userTable.findFirst({
    where: eq(user.id, userId),
  });

  if (!userToDelete) {
    throw new Error("User not found");
  }

  // Check if the user is not a super admin
  // if (userToDelete.role === "manager") {
  //   throw new Error("Cannot delete a super admin user");
  // }

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
      .where(eq(user.id, userId))
      .returning();

    await refreshSession();
    await processActivity(res[0].id);
    await addJob("USER_NEW", { userId: res[0].id });
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

  if (validatedData.name) updateObject.name = validatedData.name;
  if (
    validatedData.username &&
    validatedData.username.toLowerCase() !==
      currentUser.username?.toLocaleLowerCase()
  ) {
    const userAccount = await db.query.userTable.findFirst({
      where: (user, { eq }) =>
        or(
          eq(user.username, validatedData.username),
          ilike(user.username, validatedData.username)
        ),
    });

    if (userAccount || RESTRICTED_USERNAME.includes(validatedData.username)) {
      return {
        sucess: false,
        message: "cet identifiant a été deja prise",
        revalidate: "username",
      };
      //const error = new Error("USERNAME_TAKEN");
      //throw error;
    } else {
      updateObject.username = validatedData.username;
    }
  }
  if (validatedData.email) updateObject.email = validatedData.email;

  updateObject.image = validatedData.image;
  updateObject.bio = validatedData.bio;
  updateObject.location = validatedData.location;
  updateObject.phoneNumber = validatedData.phoneNumber;
  updateObject.githubLink = validatedData.githubLink;
  updateObject.twitterLink = validatedData.twitterLink;
  updateObject.instagramLink = validatedData.instagramLink;
  updateObject.websiteLink = validatedData.websiteLink;
  updateObject.skills = validatedData.skills;

  // Add updatedAt timestamp
  updateObject.updatedAt = new Date();

  //console.log("Updating user with data:", updateObject);

  // Perform the update
  await db.update(user).set(updateObject).where(eq(user.id, userId));

  // Revalidate relevant paths
  await refreshSession();
  revalidatePath(`/user/${updateObject.username || currentUser.username}`);
  revalidatePath("/admin/users");
  revalidatePath("/user/dashboard");
  revalidatePath("/user/profile");
  revalidatePath("/user/settings");
  return {
    success: true,
    message: "Votre profil est mise à jour avec sucess",
  };
}

export async function updateUserPassword(
  userId: string,
  data: UpdatePasswordInput
) {
  const validatedData = updatePasswordSchema.parse(data);

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
      return {
        success: false,
        message: "Mot de passe courant est incorrect",
        revalidate: "currentPassword",
      };
      //throw new Error("Current password is incorrect");
    }

    // Hash and set new password
    updateObject.password = await new Argon2id().hash(
      validatedData.newPassword
    );
  }
  await db.update(user).set(updateObject).where(eq(user.id, userId));
  return {
    success: true,
    message: "Mot de passe modifier avec succès",
  };
}
