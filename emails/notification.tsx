import { Section, Text, Heading, Button, Hr } from "@react-email/components";
import * as React from "react";
import LayoutEmail, { baseUrl } from "./base-layout";

export interface NotificationProps {
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  actionUrl?: string;
  actionText?: string;
  userName?: string;
}

export default function Notification({
  title,
  message,
  type = "info",
  actionUrl,
  actionText,
  userName,
}: NotificationProps) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case "success":
        return {
          emoji: "✅",
          bgColor: "from-green-50 to-emerald-50",
          borderColor: "border-green-200",
          textColor: "text-green-800",
          iconBg: "bg-green-600",
          buttonColor:
            "from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
        };
      case "warning":
        return {
          emoji: "⚠️",
          bgColor: "from-yellow-50 to-orange-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-800",
          iconBg: "bg-yellow-600",
          buttonColor:
            "from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700",
        };
      case "error":
        return {
          emoji: "❌",
          bgColor: "from-red-50 to-pink-50",
          borderColor: "border-red-200",
          textColor: "text-red-800",
          iconBg: "bg-red-600",
          buttonColor:
            "from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700",
        };
      default: // info
        return {
          emoji: "💡",
          bgColor: "from-blue-50 to-indigo-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-800",
          iconBg: "bg-blue-600",
          buttonColor:
            "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
        };
    }
  };

  const config = getTypeConfig(type);

  return (
    <LayoutEmail title={title} preview={message.substring(0, 100) + "..."}>
      {/* Hero Section */}
      <Section className="text-center mb-8">
        <Text className="text-4xl mb-4">{config.emoji}</Text>
        <Heading className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </Heading>
        <Text className="text-gray-600">
          We have an important update for you
        </Text>
      </Section>

      {/* Personal Greeting */}
      {userName && (
        <Section className="mb-6">
          <Text className="text-gray-700 text-lg">
            Hi <span className="font-semibold text-gray-900">{userName}</span>{" "}
            👋
          </Text>
        </Section>
      )}

      {/* Main Message */}
      <Section
        className={`bg-gradient-to-r ${config.bgColor} border ${config.borderColor} rounded-2xl p-6 mb-6 shadow-sm`}
      >
        <div className="flex items-start">
          <div
            className={`${config.iconBg} rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0`}
          >
            <Text className="text-white text-xl">{config.emoji}</Text>
          </div>
          <div className="flex-1">
            <Heading className={`text-xl font-bold ${config.textColor} mb-3`}>
              {title}
            </Heading>
            <div className="bg-white bg-opacity-60 rounded-lg p-4 border border-white border-opacity-40">
              <Text className="text-gray-700 leading-relaxed">{message}</Text>
            </div>
          </div>
        </div>
      </Section>

      {/* Action Button */}
      {actionUrl && actionText && (
        <Section className="text-center mb-6">
          <Button
            className={`bg-gradient-to-r ${config.buttonColor} text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-200 inline-block text-decoration-none`}
            href={actionUrl}
          >
            {actionText}
          </Button>
        </Section>
      )}

      <Hr className="my-6 border-gray-200" />

      {/* Type-specific additional content */}
      {type === "success" && (
        <Section className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start">
            <Text className="text-2xl mr-3">🎉</Text>
            <div>
              <Text className="font-medium text-green-900 mb-2">
                Great Job!
              </Text>
              <Text className="text-green-700 text-sm">
                This positive update reflects your engagement with our
                community. Keep up the excellent work!
              </Text>
            </div>
          </div>
        </Section>
      )}

      {type === "warning" && (
        <Section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start">
            <Text className="text-2xl mr-3">⚡</Text>
            <div>
              <Text className="font-medium text-yellow-900 mb-2">
                Action May Be Required
              </Text>
              <Text className="text-yellow-700 text-sm">
                Please review this notification carefully. Some warnings may
                require your attention to maintain optimal account status.
              </Text>
            </div>
          </div>
        </Section>
      )}

      {type === "error" && (
        <Section className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start">
            <Text className="text-2xl mr-3">🆘</Text>
            <div>
              <Text className="font-medium text-red-900 mb-2">
                Immediate Attention Needed
              </Text>
              <Text className="text-red-700 text-sm mb-3">
                This issue requires prompt resolution to ensure your account
                continues to function properly.
              </Text>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg text-sm text-decoration-none"
                href={`${baseUrl}/support`}
              >
                Get Help Now
              </Button>
            </div>
          </div>
        </Section>
      )}

      {type === "info" && (
        <Section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start">
            <Text className="text-2xl mr-3">📋</Text>
            <div>
              <Text className="font-medium text-blue-900 mb-2">
                Stay Informed
              </Text>
              <Text className="text-blue-700 text-sm">
                We'll continue to keep you updated with important information
                about your account and our community.
              </Text>
            </div>
          </div>
        </Section>
      )}

      {/* Footer */}
      <Section className="mt-6 text-center">
        <Text className="text-sm text-gray-600 mb-3">
          Questions about this notification?
        </Text>
        <Button
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg text-sm text-decoration-none"
          href={`${baseUrl}/support`}
        >
          💬 Contact Support
        </Button>
      </Section>
    </LayoutEmail>
  );
}
