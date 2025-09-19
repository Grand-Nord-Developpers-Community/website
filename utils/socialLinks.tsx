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
      return <Linkedin className={`${baseClasses} text-[#0077B5] `} />;
    case "github":
      return <Github className={`${baseClasses} text-gray-800`} />;
    case "twitter":
      return <Twitter className={`${baseClasses} text-sky-500`} />;
    case "instagram":
      return <Instagram className={`${baseClasses} text-pink-500`} />;
    case "website":
      return <Globe className={`${baseClasses} text-emerald-600`} />;
    case "facebook":
      return <Facebook className={`${baseClasses} text-blue-600`} />;
    default:
      return <Globe className={`${baseClasses} text-gray-600`} />;
  }
};

export const getSocialButtonStyle = (platform: string) => {
  const baseClasses =
    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-md";

  switch (platform) {
    case "linkedin":
      return `${baseClasses} bg-blue-50 hover:bg-blue-100`;
    case "github":
      return `${baseClasses} bg-gray-100 hover:bg-gray-200`;
    case "twitter":
      return `${baseClasses} bg-sky-50 hover:bg-sky-100`;
    case "instagram":
      return `${baseClasses} bg-pink-50 hover:bg-pink-100`;
    case "website":
      return `${baseClasses} bg-emerald-50 hover:bg-emerald-100`;
    case "facebook":
      return `${baseClasses} bg-blue-50 hover:bg-blue-100`;
    default:
      return `${baseClasses} bg-gray-50 hover:bg-gray-100`;
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
