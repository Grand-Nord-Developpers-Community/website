#!/usr/bin/env node

import dotenv from "dotenv";
import { EmailTester } from "./test-email";

// Load environment variables
dotenv.config();

// Command line arguments
const args = process.argv.slice(2);
const command = args[0];

async function main() {
  console.log("🔥 GNDC Email Template Tester\n");

  // Check required environment variables
  //   if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  //     console.error(
  //       "❌ Missing required environment variables: SMTP_USER and SMTP_PASS"
  //     );
  //     console.log("\nPlease set the following in your .env file:");
  //     console.log("SMTP_HOST=smtp.gmail.com (optional, defaults to Gmail)");
  //     console.log("SMTP_USER=your-email@gmail.com");
  //     console.log("SMTP_PASS=your-app-password");
  //     process.exit(1);
  //   }

  try {
    switch (command) {
      case "welcome":
        console.log("Testing Welcome Email...");
        await EmailTester.testNewUserEmail();
        break;

      case "login":
        console.log("Testing Login Code Email...");
        await EmailTester.testLoginCodeEmail();
        break;

      case "reset":
        console.log("Testing Password Reset Email...");
        await EmailTester.testPasswordResetEmail();
        break;

      case "forum":
        console.log("Testing New Forum Question Email...");
        await EmailTester.testNewForumEmail();
        break;

      case "blog-admin":
        console.log("Testing New Blog Admin Notification Email...");
        await EmailTester.testNewBlogAdminEmail();
        break;

      case "blog-published":
        console.log("Testing Blog Published Email...");
        await EmailTester.testBlogPublishedEmail();
        break;

      case "leaderboard":
        console.log("Testing Leaderboard Email...");
        await EmailTester.testLeaderboardEmail();
        break;

      case "notification":
        const notificationType =
          (args[1] as "info" | "success" | "warning" | "error") || "info";
        console.log(
          `Testing ${notificationType.toUpperCase()} Notification Email...`
        );
        await EmailTester.testNotificationEmail(notificationType);
        break;

      case "all":
        console.log("Testing All Email Templates...");
        await EmailTester.testAllEmails();
        break;

      default:
        console.log("Usage: npm run test-emails <command>");
        console.log("\nAvailable commands:");
        console.log("  welcome          - Test welcome email");
        console.log("  login            - Test login code email");
        console.log("  reset            - Test password reset email");
        console.log("  forum            - Test new forum question email");
        console.log("  blog-admin       - Test new blog admin notification");
        console.log("  blog-published   - Test blog published email");
        console.log("  leaderboard      - Test leaderboard email");
        console.log(
          "  notification [type] - Test notification (info/success/warning/error)"
        );
        console.log("  all              - Test all email templates");
        console.log("\nExamples:");
        console.log("  npm run test-emails welcome");
        console.log("  npm run test-emails notification success");
        console.log("  npm run test-emails all");
        break;
    }
    process.exit(1);
  } catch (error) {
    console.error("❌ Error running email test:", error);
    process.exit(1);
  }
}

main();
