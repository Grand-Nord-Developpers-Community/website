import { Button, Heading, Section, Text, Hr } from "@react-email/components";
import * as React from "react";
import LayoutEmail, { baseUrl } from "./base-layout";

export interface BlogPublishedProps {
  title: string;
  author: string;
  slug: string;
  userName: string;
  excerpt?: string;
  category?: string;
  estimatedReadTime?: number;
}

export default function BlogPublished({
  title,
  author,
  slug,
  userName,
  excerpt,
  category = "General",
  estimatedReadTime = 5,
}: BlogPublishedProps) {
  return (
    <LayoutEmail
      title={`New Blog: ${title}`}
      preview={`${author} just published: ${title}. Don't miss this fresh content!`}
    >
      {/* Hero Section */}
      <Section className="text-center mb-8">
        <Text className="text-4xl mb-4">📖</Text>
        <Heading className="text-2xl font-bold text-gray-900 mb-2">
          Fresh Content Just Dropped!
        </Heading>
        <Text className="text-gray-600">
          A new blog post is live and ready for you to explore
        </Text>
      </Section>

      {/* Personal Greeting */}
      <Section className="mb-6">
        <Text className="text-gray-700 text-lg">
          Hey <span className="font-semibold text-gray-900">{userName}</span>!
          👋
        </Text>
        <Text className="text-gray-700 mt-2">
          We thought you'd be interested in this new blog post from{" "}
          <span className="font-semibold text-blue-600">{author}</span>.
        </Text>
      </Section>

      {/* Blog Card */}
      <Section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-2xl p-6 mb-6 shadow-sm">
        {/* Author Info */}
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full w-12 h-12 flex items-center justify-center mr-4">
            <Text className="text-white text-xl font-bold">
              {author.charAt(0).toUpperCase()}
            </Text>
          </div>
          <div>
            <Text className="font-semibold text-gray-900">{author}</Text>
            <Text className="text-sm text-gray-600">Community Author</Text>
          </div>
        </div>

        {/* Blog Title */}
        <Heading className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
          {title}
        </Heading>

        {/* Blog Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Text className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            📂 {category}
          </Text>
          <Text className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            ⏱️ {estimatedReadTime} min read
          </Text>
          <Text className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
            🆕 Just Published
          </Text>
        </div>

        {/* Excerpt */}
        {excerpt && (
          <div className="bg-white bg-opacity-60 rounded-lg p-4 mb-4 border border-white border-opacity-40">
            <Text className="text-gray-700 text-sm leading-relaxed italic">
              "{excerpt}..."
            </Text>
          </div>
        )}

        {/* Engagement Preview */}
        <div className="bg-white bg-opacity-50 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <Text className="text-gray-600">
                👁️ <span className="font-medium">Be the first viewer</span>
              </Text>
            </div>
            <Text className="text-blue-600 font-medium">Start reading! 📚</Text>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="text-center mb-6">
        <Button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-200 inline-block text-decoration-none"
          href={`${baseUrl}/blog/${slug}`}
        >
          📖 Read Full Article
        </Button>
        <Text className="text-sm text-gray-600 mt-2">
          Join the conversation and share your thoughts!
        </Text>
      </Section>

      <Hr className="my-6 border-gray-200" />

      {/* Engagement Section */}
      <Section className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
        <Heading className="text-lg font-bold text-green-800 mb-3 text-center">
          💬 Join the Discussion
        </Heading>
        <Text className="text-green-700 text-center mb-4">
          Be among the first to comment and engage with this fresh content!
        </Text>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
            <Text className="text-2xl mb-1">❤️</Text>
            <Text className="text-xs font-medium text-green-800">Like</Text>
          </div>
          <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
            <Text className="text-2xl mb-1">💬</Text>
            <Text className="text-xs font-medium text-green-800">Comment</Text>
          </div>
          <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
            <Text className="text-2xl mb-1">🔗</Text>
            <Text className="text-xs font-medium text-green-800">Share</Text>
          </div>
        </div>
      </Section>

      {/* Personalized Recommendations */}
      <Section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
        <Heading className="text-lg font-bold text-gray-900 mb-3">
          🎯 Why This Might Interest You
        </Heading>
        <div className="space-y-3">
          <div className="flex items-start">
            <Text className="text-lg mr-3">✨</Text>
            <Text className="text-sm text-gray-700">
              <span className="font-medium">Fresh Perspective:</span> New
              insights from an active community member
            </Text>
          </div>
          <div className="flex items-start">
            <Text className="text-lg mr-3">🎓</Text>
            <Text className="text-sm text-gray-700">
              <span className="font-medium">Learn & Grow:</span> Expand your
              knowledge in {category.toLowerCase()}
            </Text>
          </div>
          <div className="flex items-start">
            <Text className="text-lg mr-3">🤝</Text>
            <Text className="text-sm text-gray-700">
              <span className="font-medium">Community Connection:</span> Connect
              with {author} and other readers
            </Text>
          </div>
        </div>
      </Section>

      {/* Quick Actions */}
      <Section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start">
          <Text className="text-2xl mr-3">⚡</Text>
          <div className="flex-1">
            <Text className="font-medium text-yellow-800 mb-2">
              Quick Actions
            </Text>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-yellow-200">
                <div className="flex items-center">
                  <Text className="text-lg mr-2">🔖</Text>
                  <Text className="text-sm font-medium text-gray-900">
                    Bookmark for Later
                  </Text>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-yellow-200">
                <div className="flex items-center">
                  <Text className="text-lg mr-2">📧</Text>
                  <Text className="text-sm font-medium text-gray-900">
                    Share via Email
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer Note */}
      <Section className="mt-6 text-center">
        <Text className="text-xs text-gray-500">
          💡 Want more personalized content? Update your preferences in your{" "}
          <a href={`${baseUrl}/settings`} className="text-blue-600 underline">
            account settings
          </a>
          .
        </Text>
      </Section>
    </LayoutEmail>
  );
}
