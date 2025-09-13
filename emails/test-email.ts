import { transporter } from "@/lib/connection";
import { renderEmail } from "./mailer";

// Configure your transporter (adjust based on your email service)

// Sample data for testing
const sampleData = {
  // Test user data
  testUser: {
    name: "Jean Dupont",
    email: "mohamedconsole3+test@gmail.com",
    firstName: "Jean",
  },

  // Sample forum data
  forum: {
    id: "forum-123",
    title: "Comment optimiser les performances d'une application React ?",
    author: {
      name: "Marie Martin",
    },
  },

  // Sample blog data
  blog: {
    title: "Les meilleures pratiques pour le développement web moderne",
    author: "Pierre Dubois",
    slug: "meilleures-pratiques-dev-web-2024",
    excerpt:
      "Découvrez les techniques et outils essentiels pour créer des applications web performantes et maintenables en 2024.",
    category: "Développement Web",
    estimatedReadTime: 8,
  },

  // Sample leaderboard data
  leaderboard: {
    rank: 3,
    xp: 2450,
    tops: [
      { name: "Alice Moreau", xp: 3200 },
      { name: "Bob Laurent", xp: 2800 },
      { name: "Jean Dupont", xp: 2450 },
      { name: "Sophie Bernard", xp: 2100 },
      { name: "Marc Petit", xp: 1950 },
    ],
  },

  // Sample admin user
  admin: {
    name: "Admin GNDC",
    email: "admin@gndc.tech",
  },
};

// Email test functions
export class EmailTester {
  // Test New User Welcome Email
  static async testNewUserEmail() {
    try {
      const html = await renderEmail({
        type: "joined",
        props: {
          name: sampleData.testUser.name,
        },
      });

      await transporter.sendMail({
        from: '"GNDC Team" <noreply@gndc.tech>',
        to: sampleData.testUser.email,
        subject: `Bienvenue sur GNDC, ${sampleData.testUser.name}! 🎉`,
        html,
      });

      console.log("✅ New User Welcome email sent successfully");
    } catch (error) {
      console.error("❌ Error sending New User Welcome email:", error);
    }
  }

  // Test Login Code Email
  static async testLoginCodeEmail() {
    try {
      const validationCode = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      const html = await renderEmail({
        type: "otp",
        props: {
          validationCode,
        },
      });

      await transporter.sendMail({
        from: '"GNDC Security" <noreply@gndc.tech>',
        to: sampleData.testUser.email,
        subject: `Your GNDC login code: ${validationCode}`,
        html,
      });

      console.log("✅ Login Code email sent successfully");
    } catch (error) {
      console.error("❌ Error sending Login Code email:", error);
    }
  }

  // Test Password Reset Email
  static async testPasswordResetEmail() {
    try {
      const resetToken = "sample-reset-token-123";
      const resetLink = `https://gndc.tech/reset-password?token=${resetToken}`;

      const html = await renderEmail({
        type: "reset",
        props: {
          userFirstname: sampleData.testUser.firstName,
          resetPasswordLink: resetLink,
        },
      });

      await transporter.sendMail({
        from: '"GNDC Security" <noreply@gndc.tech>',
        to: sampleData.testUser.email,
        subject: "Reset your GNDC password 🔒",
        html,
      });

      console.log("✅ Password Reset email sent successfully");
    } catch (error) {
      console.error("❌ Error sending Password Reset email:", error);
    }
  }

  // Test New Forum Question Email
  static async testNewForumEmail() {
    try {
      const html = await renderEmail({
        type: "forum",
        props: {
          userName: sampleData.testUser.name,
          author: sampleData.forum.author.name,
          id: sampleData.forum.id,
          title: sampleData.forum.title,
        },
      });

      await transporter.sendMail({
        from: '"Forum GNDC" <noreply@gndc.tech>',
        to: sampleData.testUser.email,
        subject: "Nouvelle question sur le forum 🤔",
        html,
      });

      console.log("✅ New Forum Question email sent successfully");
    } catch (error) {
      console.error("❌ Error sending New Forum Question email:", error);
    }
  }

  // Test New Blog Post (Admin Notification)
  static async testNewBlogAdminEmail() {
    try {
      const html = await renderEmail({
        type: "newBlog",
        props: {
          title: sampleData.blog.title,
          author: sampleData.blog.author,
          slug: sampleData.blog.slug,
          adminName: sampleData.admin.name,
        },
      });

      await transporter.sendMail({
        from: '"GNDC Blog" <noreply@gndc.tech>',
        to: sampleData.admin.email,
        subject: `Nouveau blog à réviser: ${sampleData.blog.title}`,
        html,
      });

      console.log("✅ New Blog Admin notification email sent successfully");
    } catch (error) {
      console.error("❌ Error sending New Blog Admin email:", error);
    }
  }

  // Test Blog Published Email (to users)
  static async testBlogPublishedEmail() {
    try {
      // Note: You'll need to add this to your renderEmail function in mailer.tsx
      const html = await renderEmail({
        type: "blogPublished", // Add this case to your renderEmail function
        props: {
          title: sampleData.blog.title,
          author: sampleData.blog.author,
          slug: sampleData.blog.slug,
          userName: sampleData.testUser.name,
          excerpt: sampleData.blog.excerpt,
          category: sampleData.blog.category,
          estimatedReadTime: sampleData.blog.estimatedReadTime,
        },
      });

      await transporter.sendMail({
        from: '"GNDC Blog" <noreply@gndc.tech>',
        to: sampleData.testUser.email,
        subject: `📖 Nouveau blog: ${sampleData.blog.title}`,
        html,
      });

      console.log("✅ Blog Published email sent successfully");
    } catch (error) {
      console.error("❌ Error sending Blog Published email:", error);
    }
  }

  // Test Leaderboard Email
  static async testLeaderboardEmail() {
    try {
      const html = await renderEmail({
        type: "leaderboard",
        props: {
          name: sampleData.testUser.name,
          username: sampleData.testUser.name.toLowerCase().replace(" ", "."),
          rank: sampleData.leaderboard.rank,
          xp: sampleData.leaderboard.xp,
          tops: sampleData.leaderboard.tops,
        },
      });

      await transporter.sendMail({
        from: '"GNDC Leaderboard" <noreply@gndc.tech>',
        to: sampleData.testUser.email,
        subject: `🏆 Classement hebdomadaire - Vous êtes #${sampleData.leaderboard.rank}!`,
        html,
      });

      console.log("✅ Leaderboard email sent successfully");
    } catch (error) {
      console.error("❌ Error sending Leaderboard email:", error);
    }
  }

  // Test General Notification Email
  static async testNotificationEmail(
    type: "info" | "success" | "warning" | "error" = "info"
  ) {
    try {
      const notifications = {
        info: {
          title: "Mise à jour du système",
          message:
            "Nous avons apporté des améliorations à notre plateforme pour une meilleure expérience utilisateur. Découvrez les nouvelles fonctionnalités dans votre tableau de bord.",
          actionUrl: "https://gndc.tech/dashboard",
          actionText: "Voir les nouveautés",
        },
        success: {
          title: "Félicitations ! Badge débloqué",
          message:
            "Vous avez débloqué le badge 'Contributeur Expert' grâce à vos contributions exceptionnelles à la communauté. Continuez comme ça!",
          actionUrl: "https://gndc.tech/profile/badges",
          actionText: "Voir mes badges",
        },
        warning: {
          title: "Action requise: Vérification du profil",
          message:
            "Votre profil nécessite une mise à jour pour rester conforme à nos nouvelles politiques. Veuillez vérifier et compléter les informations manquantes.",
          actionUrl: "https://gndc.tech/profile/edit",
          actionText: "Mettre à jour le profil",
        },
        error: {
          title: "Problème de sécurité détecté",
          message:
            "Nous avons détecté une activité suspecte sur votre compte. Par mesure de sécurité, certaines fonctionnalités ont été temporairement désactivées.",
          actionUrl: "https://gndc.tech/security",
          actionText: "Sécuriser mon compte",
        },
      };

      const notification = notifications[type];

      const html = await renderEmail({
        type: "notification",
        props: {
          title: notification.title,
          message: notification.message,
          type,
          actionUrl: notification.actionUrl,
          actionText: notification.actionText,
          userName: sampleData.testUser.name,
        },
      });

      const subjectPrefixes = {
        info: "ℹ️",
        success: "🎉",
        warning: "⚠️",
        error: "🚨",
      };

      await transporter.sendMail({
        from: '"GNDC Notifications" <noreply@gndc.tech>',
        to: sampleData.testUser.email,
        subject: `${subjectPrefixes[type]} ${notification.title}`,
        html,
      });

      console.log(
        `✅ ${type.toUpperCase()} Notification email sent successfully`
      );
    } catch (error) {
      console.error(
        `❌ Error sending ${type.toUpperCase()} Notification email:`,
        error
      );
    }
  }

  // Test all emails at once
  static async testAllEmails() {
    console.log("🚀 Starting comprehensive email tests...\n");

    await this.testNewUserEmail();
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second between emails

    await this.testLoginCodeEmail();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await this.testPasswordResetEmail();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await this.testNewForumEmail();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await this.testNewBlogAdminEmail();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await this.testBlogPublishedEmail();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await this.testLeaderboardEmail();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Test all notification types
    await this.testNotificationEmail("info");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await this.testNotificationEmail("success");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await this.testNotificationEmail("warning");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await this.testNotificationEmail("error");

    console.log("\n✅ All email tests completed!");
  }
}

// Usage examples:
/*
// Test individual emails
await EmailTester.testNewUserEmail();
await EmailTester.testLoginCodeEmail();
await EmailTester.testLeaderboardEmail();

// Test specific notification type
await EmailTester.testNotificationEmail('success');

// Test all emails
await EmailTester.testAllEmails();
*/

// Export sample data for use in other files
export { sampleData };
