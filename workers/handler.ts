import whenBlogLiked from "./actions/when-blog-like.action";
import whenCommentAdded from "./actions/when-comment-add.action";
import whenBlogCreated from "./actions/when-create-blog.action";
import whenForumCreated from "./actions/when-create-forum.action";
import whenNewUser from "./actions/when-new-user.action";
import whenVoted from "./actions/when-upvote.action";
import whenBlogValidated from "./actions/when-validated-blog";
import whenWeeklyLeaderBoard from "./actions/when-weekly-leaderboard-update.action";
import whenWeeklyNews from "./actions/when-weekly-news";
import type { JobPayloads } from "./jobs";

export type Handler<K extends keyof JobPayloads> = (
  data: JobPayloads[K]
) => Promise<void>;

export const handlers: { [K in keyof JobPayloads]: Handler<K> } = {
  BLOG_CREATED: async (data) => {
    await whenBlogCreated(data);
  },
  BLOG_LIKED: async (data) => {
    await whenBlogLiked(data);
  },
  COMMENT_ADDED: async (data) => {
    await whenCommentAdded(data);
  },
  FORUM_CREATED: async (data) => {
    await whenForumCreated(data);
  },
  UPVOTED: async (data) => {
    await whenVoted(data);
  },
  USER_NEW: async (data) => {
    await whenNewUser(data);
  },
  WEEKLY_LEADERBOARD: async (data) => {
    //await whenWeeklyLeaderBoard(data);
  },
  VALIDATED_BLOG: async (data) => {
    await whenBlogValidated(data);
  },
  WEEKLY_DIGEST_BLOG: async (data) => {
    //await whenWeeklyNews(data);
  },
  CUSTOM_EVENT: async (data) => {
    console.log("Custom event:", data.payload);
  },
};
