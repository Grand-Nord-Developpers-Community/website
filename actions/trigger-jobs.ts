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

export async function triggerBlogCreated(data: JobPayloads["BLOG_CREATED"]) {
  try {
    const handle = await blogCreatedJob.trigger(data);
    return { success: true, handle };
  } catch (error) {
    console.error("Failed to trigger blog created job:", error);
    return { success: false, error: String(error) };
  }
}

export async function triggerBlogLiked(data: JobPayloads["BLOG_LIKED"]) {
  try {
    const handle = await blogLikedJob.trigger(data);
    return { success: true, handle };
  } catch (error) {
    console.error("Failed to trigger blog liked job:", error);
    return { success: false, error: String(error) };
  }
}

export async function triggerCommentAdded(data: JobPayloads["COMMENT_ADDED"]) {
  try {
    const handle = await commentAddedJob.trigger(data);
    return { success: true, handle };
  } catch (error) {
    console.error("Failed to trigger comment added job:", error);
    return { success: false, error: String(error) };
  }
}

export async function triggerForumCreated(data: JobPayloads["FORUM_CREATED"]) {
  try {
    const handle = await forumCreatedJob.trigger(data);
    return { success: true, handle };
  } catch (error) {
    console.error("Failed to trigger forum created job:", error);
    return { success: false, error: String(error) };
  }
}

export async function triggerUpvoted(data: JobPayloads["UPVOTED"]) {
  try {
    const handle = await upvotedJob.trigger(data);
    return { success: true, handle };
  } catch (error) {
    console.error("Failed to trigger upvoted job:", error);
    return { success: false, error: String(error) };
  }
}

export async function triggerNewUser(data: JobPayloads["USER_NEW"]) {
  try {
    const handle = await newUserJob.trigger(data);
    return { success: true, handle };
  } catch (error) {
    console.error("Failed to trigger new user job:", error);
    return { success: false, error: String(error) };
  }
}

export async function triggerCustomEvent(data: JobPayloads["CUSTOM_EVENT"]) {
  try {
    const handle = await customEventJob.trigger(data);
    return { success: true, handle };
  } catch (error) {
    console.error("Failed to trigger custom event job:", error);
    return { success: false, error: String(error) };
  }
}
