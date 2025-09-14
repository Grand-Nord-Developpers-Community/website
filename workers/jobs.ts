import { replyProps } from "@/actions/post_comment.actions";

// types/jobs.ts
export type JobPayloads = {
  BLOG_CREATED: { slug: string };
  BLOG_LIKED: { blogId: string; userId: string };
  COMMENT_ADDED: { commentAuthorId: string; comment: replyProps };
  FORUM_CREATED: { forumId: string };
  UPVOTED: { commentId: string; userId: string; targetUserId: string };
  USER_NEW: { userId: string };
  WEEKLY_LEADERBOARD: {};
  WEEKLY_DIGEST_BLOG: { date: Date };
  VALIDATED_BLOG: { blogId: string };
  CUSTOM_EVENT: { payload: Record<string, unknown> };
};
