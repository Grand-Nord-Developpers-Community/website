import { handlers } from "@/workers/handler";
import { JobPayloads } from "@/workers/jobs";
import { schedules, task } from "@trigger.dev/sdk/v3";

// Blog Created Job
export const blogCreatedJob = task({
  id: "blog-created",
  run: async (payload: JobPayloads["BLOG_CREATED"]) => {
    await handlers.BLOG_CREATED(payload);
    return { success: true };
  },
});

// Blog Liked Job
export const blogLikedJob = task({
  id: "blog-liked",
  run: async (payload: JobPayloads["BLOG_LIKED"]) => {
    await handlers.BLOG_LIKED(payload);
    return { success: true };
  },
});

// Comment Added Job
export const commentAddedJob = task({
  id: "comment-added",
  run: async (payload: JobPayloads["COMMENT_ADDED"]) => {
    await handlers.COMMENT_ADDED(payload);
    return { success: true };
  },
});

// Forum Created Job
export const forumCreatedJob = task({
  id: "forum-created",
  run: async (payload: JobPayloads["FORUM_CREATED"]) => {
    await handlers.FORUM_CREATED(payload);
    return { success: true };
  },
});

// Upvoted Job
export const upvotedJob = task({
  id: "upvoted",
  run: async (payload: JobPayloads["UPVOTED"]) => {
    await handlers.UPVOTED(payload);
    return { success: true };
  },
});

// New User Job
export const newUserJob = task({
  id: "user-new",
  run: async (payload: JobPayloads["USER_NEW"]) => {
    await handlers.USER_NEW(payload);
    return { success: true };
  },
});

// Weekly Leaderboard Job
export const weeklyLeaderboardJob = schedules.task({
  id: "weekly-leaderboard",
  cron: "0 0 * * 1", // Every Monday at midnight
  //@ts-ignore
  run: async (payload) => {
    await handlers.WEEKLY_LEADERBOARD({});
    return { success: true };
  },
});

// Custom Event Job
export const customEventJob = task({
  id: "custom-event",
  run: async (payload: JobPayloads["CUSTOM_EVENT"]) => {
    await handlers.CUSTOM_EVENT(payload);
    return { success: true };
  },
});
