"use server";

import {
  blogCreatedJob,
  blogLikedJob,
  commentAddedJob,
  forumCreatedJob,
  upvotedJob,
  newUserJob,
  weeklyLeaderboardJob,
  customEventJob,
} from "@/trigger/jobs";
import { JobPayloads } from "@/workers/jobs";
import { tasks } from "@trigger.dev/sdk/v3";

export async function triggerBlogCreated(data: JobPayloads["BLOG_CREATED"]) {
  try {
    const handle = await tasks.trigger<typeof blogCreatedJob>(
      "blog-created",
      data
    );
    return { handle };
  } catch (error) {
    console.error("Failed to trigger blog created job:", error);
    return { success: false, error: String(error) };
  }
}

export async function triggerBlogLiked(data: JobPayloads["BLOG_LIKED"]) {
  try {
    const handle = await tasks.trigger<typeof blogLikedJob>("blog-liked", data);
    return { handle };
  } catch (error) {
    console.error("Failed to trigger blog liked job:", error);
    return { success: false, error: String(error) };
  }
}

export async function triggerCommentAdded(data: JobPayloads["COMMENT_ADDED"]) {
  try {
    const handle = await tasks.trigger<typeof commentAddedJob>(
      "comment-added",
      data
    );
    return { handle };
  } catch (error) {
    console.error("Failed to trigger comment added job:", error);
    return { success: false, error: String(error) };
  }
}

export async function triggerForumCreated(data: JobPayloads["FORUM_CREATED"]) {
  try {
    const handle = await tasks.trigger<typeof forumCreatedJob>(
      "forum-created",
      data
    );
    return { handle };
  } catch (error) {
    console.error("Failed to trigger forum created job:", error);
    return { success: false, error: String(error) };
  }
}

export async function triggerUpvoted(data: JobPayloads["UPVOTED"]) {
  try {
    const handle = await tasks.trigger<typeof upvotedJob>("upvoted", data);
    return { handle };
  } catch (error) {
    console.error("Failed to trigger upvoted job:", error);
    return { success: false, error: String(error) };
  }
}

export async function triggerNewUser(data: JobPayloads["USER_NEW"]) {
  try {
    const handle = await tasks.trigger<typeof newUserJob>("user-new", data);
    return { handle };
  } catch (error) {
    console.error("Failed to trigger new user job:", error);
    return { success: false, error: String(error) };
  }
}

export async function triggerCustomEvent(data: JobPayloads["CUSTOM_EVENT"]) {
  try {
    const handle = await tasks.trigger<typeof customEventJob>(
      "custom-event",
      data
    );
    return { handle };
  } catch (error) {
    console.error("Failed to trigger custom event job:", error);
    return { success: false, error: String(error) };
  }
}
