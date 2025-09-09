import { render } from "@react-email/render";
import React from "react";
import LayoutEmail from "./base-layout";
import NewBlog, { NewBlogProps } from "./new-blog";
import LoginCodeEmail, { LoginCodeEmailProps } from "./login-code";
import ResetPasswordEmail, { ResetPasswordEmailProps } from "./password-reset";
import NewUser, { NewUserProps } from "./new-user";
import LeaderBoard, { LeaderBoardProps } from "./leader-board";
import NewForum, { NewForumProps } from "./new-forum";

export type Templates =
  | { type: "joined"; props: NewUserProps }
  | { type: "otp"; props: LoginCodeEmailProps }
  | { type: "reset"; props: ResetPasswordEmailProps }
  | { type: "newBlog"; props: NewBlogProps }
  | { type: "leaderboard"; props: LeaderBoardProps }
  | { type: "forum"; props: NewForumProps }
  | { type: "notification"; props: { title: string; message: string } };

export async function renderEmail(template: Templates): Promise<string> {
  switch (template.type) {
    case "notification":
      return render(<LayoutEmail {...template.props}>hi</LayoutEmail>);
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

    case "leaderboard":
      return render(<LeaderBoard {...template.props} />);
    default:
      throw new Error("Unknown template type");
  }
}
