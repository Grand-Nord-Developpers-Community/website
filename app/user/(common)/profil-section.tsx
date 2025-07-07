"use client";

import { useState } from "react";
import { Facebook, Send, Twitter, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const tabs = [
  { id: "about", label: "À propos" },
  { id: "blog", label: "Blogs" },
  { id: "forums", label: "Forums" },
];

const skills = [
  "User Interface",
  "User Experience",
  "Interaction Design",
  "3D Design",
  "Information Architecture",
  "User Research",
  "Wireframing",
];

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="w-full lg:mt-10 ">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex w-full max-sm:justify-center space-x-8 px-6 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-8 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 pt-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-secondary text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
      <div className="lg:p-6 py-6">
        {activeTab === "about" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                À propos
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Greetings, fellow software enthusiasts! I'm thrilled to see
                  your interest in exploring my profile. I'm Nguyen Shane, a
                  24-year-old software engineer from the United Kingdom. My
                  educational path led me to earn a Bachelor's Degree in
                  Computer Science, specializing in Software Engineering. With
                  this qualification, I'm equipped to dive deep into the world
                  of coding and development, ready to tackle exciting projects
                  and contribute to cutting-edge technological advancements...
                </p>
                {/* <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                  See more
                </button> */}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Détails contact
              </h2>

              {/* Email */}
              <div className="mb-6">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                  ADRESSE EMAIL
                </p>
                <a
                  href="mailto:hello@nguyen.shane.com"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  hello@nguyen.shane.com
                </a>
              </div>
              <div className="mb-8">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
                  LIENS SOCIALS
                </p>
                <div className="flex space-x-3">
                  <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <Facebook className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <Send className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <Twitter className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <Instagram className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
                  COMPÉTENCES
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 text-sm font-normal"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "blog" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Blog Post Title {item}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Dec {item}, 2024
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Technology
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "forums" && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <Card key={item} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          Forum Discussion {item}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        This is a sample forum discussion about software
                        development and best practices in modern web
                        development.
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span>12 replies</span>
                        <span>•</span>
                        <span>Last activity 2h ago</span>
                        <span>•</span>
                        <span>By User{item}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
