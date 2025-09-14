import { render } from "@react-email/render";
import React from "react";
import LayoutEmail from "./base-layout";
import NewBlog, { NewBlogProps } from "./new-blog";
import LoginCodeEmail, { LoginCodeEmailProps } from "./login-code";
import ResetPasswordEmail, { ResetPasswordEmailProps } from "./password-reset";
import NewUser, { NewUserProps } from "./new-user";
import LeaderBoard, { LeaderBoardProps } from "./leader-board";
import NewForum, { NewForumProps } from "./new-forum";
import BlogPublished, { BlogPublishedProps } from "./blog-published";
import Notification, { NotificationProps } from "./notification";
import ValidatedBlog, { ValidatedBlogProps } from "./validated-blog";
import {
  NewsletterDigestLayout,
  NewsletterDigestLayoutProps,
} from "./weekly-digest";

export type Templates =
  | { type: "joined"; props: NewUserProps }
  | { type: "otp"; props: LoginCodeEmailProps }
  | { type: "reset"; props: ResetPasswordEmailProps }
  | { type: "newBlog"; props: NewBlogProps }
  | { type: "leaderboard"; props: LeaderBoardProps }
  | { type: "forum"; props: NewForumProps }
  | { type: "blogPublished"; props: BlogPublishedProps }
  | { type: "notification"; props: NotificationProps }
  | { type: "validated"; props: ValidatedBlogProps }
  | { type: "digest-blog"; props: NewsletterDigestLayoutProps };

export async function renderEmail(template: Templates): Promise<string> {
  switch (template.type) {
    case "notification":
      return render(<Notification {...template.props} />);
    case "otp":
      return render(<LoginCodeEmail {...template.props} />);
    case "reset":
      return render(<ResetPasswordEmail {...template.props} />);
    case "newBlog":
      return render(<NewBlog {...template.props} />);
    case "joined":
      return render(<NewUser {...template.props} />);
    case "forum":
      return render(<NewForum {...template.props} />);
    case "validated":
      return render(<ValidatedBlog {...template.props} />);
    case "digest-blog":
      return await render(<NewsletterDigestLayout {...template.props} />);
    case "blogPublished":
      return render(<BlogPublished {...template.props} />);
    case "leaderboard":
      return render(<LeaderBoard {...template.props} />);
    default:
      throw new Error("Unknown template type");
  }
}
