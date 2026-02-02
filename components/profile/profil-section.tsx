"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from "@/types";
import EmptyAnswerIcon from "@/assets/svgs/undraw_public-discussion_693m.svg";
const tabs = [
  { id: "about", label: "À propos" },
  { id: "blog", label: "Blogs" },
  { id: "forums", label: "Forums" },
];

import {
  Github,
  Instagram,
  Twitter,
  ExternalLink,
  ThumbsUp,
} from "lucide-react";
import ImageWrapper from "@/components/imageWrapper";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  type: "github" | "instagram" | "twitter" | "web";
};

const iconMap = {
  github: <Github className="w-4 h-4 text-muted-foreground" />,
  instagram: <Instagram className="w-4 h-4 text-muted-foreground" />,
  twitter: <Twitter className="w-4 h-4 text-muted-foreground" />,
  web: <ExternalLink className="w-4 h-4 text-muted-foreground" />,
};

export function ButtonLink({ href, type }: ButtonLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${type}`}
      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center transition-colors"
    >
      {iconMap[type]}
    </a>
  );
}

export default function ProfileSection({ user }: { user: UserProfile }) {
  const [activeTab, setActiveTab] = useState("about");
  const hasLinks =
    user?.websiteLink ||
    user?.githubLink ||
    user?.instagramLink ||
    user?.twitterLink;
  return (
    <div className="w-full px-4 lg:px-0 lg:mt-10 ">
      <div className="border-b border-muted">
        <nav className="flex w-full max-sm:justify-center space-x-8 px-6 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-8 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 pt-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-secondary text-secondary"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
      <div className="lg:p-6 py-6 ">
        {activeTab === "about" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-lg font-semibold text-muted-foreground mb-6">À propos</h2>
              <div className="space-y-4">
                <p className="text-card-foreground leading-relaxed">
                  {user?.bio || "Pas de bio pour le moment"}
                </p>
              </div>
            </div>
            <div>
              {/* <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Détails contact
              </h2>
              <div className="mb-6">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  ADRESSE EMAIL
                </p>
                <a
                  href={`mailto:${user?.email}`}
                  target=""
                  className="text-secondary  font-medium"
                >
                  {user?.email}
                </a>
              </div> */}
              <div className="mb-8">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
                  LIENS SOCIALS
                </p>
                <div className="flex space-x-3">
                  {hasLinks ? (
                    <>
                      {user?.websiteLink && (
                        <ButtonLink href={user?.websiteLink} type="web" />
                      )}
                      {user?.githubLink && (
                        <ButtonLink href={user?.githubLink} type="github" />
                      )}
                      {user?.instagramLink && (
                        <ButtonLink
                          href={user?.instagramLink}
                          type="instagram"
                        />
                      )}
                      {user?.twitterLink && (
                        <ButtonLink href={user?.twitterLink} type="twitter" />
                      )}
                    </>
                  ) : (
                    <span className="text-sm text-card-foreground">
                      Pas de lien social disponible
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
                  COMPÉTENCES
                </p>
                <div className="flex flex-wrap gap-2">
                  {user?.skills?.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-muted text-muted-foreground  px-3 py-1 text-sm font-normal"
                    >
                      {skill.text}
                    </Badge>
                  ))}
                  {user?.skills?.length === 0 && (
                    <span className="text-sm text-card-foreground">
                      Pas de compétences ajouté
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "blog" && (
          <>
            {user!.blogPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user?.blogPosts.map((item, i) => (
                  <Link href={`/blog/${item.slug}`} key={i}>
                    <Card key={item.id} className="group bg-muted">
                      <CardContent className="p-4">
                        <div className="w-full h-48 overflow-hidden  rounded-lg mb-4">
                          <ImageWrapper
                            className="w-full object-cover h-full object-center "
                            src={item.preview}
                            hash={item.previewHash}
                            width={1280}
                            height={680}
                            //placeholder="blur"
                            //blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
                            alt={item.title}
                          />
                        </div>
                        <h3 className="text-lg font-semibold  mb-2 line-clamp-1 group-hover:text-secondary">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.createdAt).toLocaleDateString(
                              "FR-fr",
                              {
                                dateStyle: "medium",
                              },
                            )}
                          </span>
                          <div className="flex items-center text-muted-foreground gap-1">
                            <ThumbsUp className="h-4 w-4 " />
                            {item.likes.length}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
            {user?.blogPosts.length === 0 && (
              <>
                <EmptyAnswerIcon className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
                <h2 className="text-lg mx-auto text-center font-medium my-3 text-muted-foreground">
                  Pas de blog publier !
                </h2>
              </>
            )}
          </>
        )}

        {activeTab === "forums" && (
          <>
            {user!.forumPosts.length > 0 && (
              <div className="space-y-4">
                {user?.forumPosts.map((item, i) => (
                  <Link href={`/forum/${item.id}`} key={i}>
                    <Card key={item.id} className="group mb-4 bg-muted">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold group-hover:text-secondary line-clamp-1">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {item.textContent}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>{item.replies.length} Réponses</span>
                              <span>•</span>
                              <span>{formatRelativeTime(item.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
            {user?.forumPosts.length === 0 && (
              <>
                <EmptyAnswerIcon className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
                <h2 className="text-lg mx-auto text-center font-medium my-3 text-muted-foreground">
                  Pas de question posé !
                </h2>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
