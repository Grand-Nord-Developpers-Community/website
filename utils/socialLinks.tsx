import {
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Globe,
  Facebook,
} from "lucide-react";
import { Member, SocialLink } from "@/types/members";

export const getSocialIcon = (platform: string) => {
  const baseClasses = "w-4 h-4 transition-all duration-200";

  switch (platform) {
    case "linkedin":
      return <Linkedin className={baseClasses} />;
    case "github":
      return <Github className={baseClasses} />;
    case "twitter":
      return <Twitter className={baseClasses} />;
    case "instagram":
      return <Instagram className={baseClasses} />;
    case "website":
      return <Globe className={baseClasses} />;
    case "facebook":
      return <Facebook className={baseClasses} />;
    default:
      return <Globe className={baseClasses} />;
  }
};

export const getSocialButtonStyle = (platform: string) => {
  const baseClasses =
    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-md";

  switch (platform) {
    case "linkedin":
      return `${baseClasses} bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-200`;
    case "github":
      return `${baseClasses} bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white shadow-gray-200`;
    case "twitter":
      return `${baseClasses} bg-gradient-to-br from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white shadow-sky-200`;
    case "instagram":
      return `${baseClasses} bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-pink-200`;
    case "website":
      return `${baseClasses} bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-emerald-200`;
    case "facebook":
      return `${baseClasses} bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-200`;
    default:
      return `${baseClasses} bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-gray-200`;
  }
};

export const getSocialLinks = (member: Member): SocialLink[] => {
  const links = [];
  if (member.linkedin)
    links.push({ platform: "linkedin", url: member.linkedin });
  if (member.github) links.push({ platform: "github", url: member.github });
  if (member.twitter) links.push({ platform: "twitter", url: member.twitter });
  if (member.instagram)
    links.push({ platform: "instagram", url: member.instagram });
  if (member.website) links.push({ platform: "website", url: member.website });
  if (member.facebook)
    links.push({ platform: "facebook", url: member.facebook });
  return links;
};
