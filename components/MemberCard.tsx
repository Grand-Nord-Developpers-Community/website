import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Code, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Member } from "@/types/members";
import { getSocialIcon, getSocialButtonStyle, getSocialLinks } from "@/utils/socialLinks";
import { mapDomainInverse, toTitleCase } from "@/utils/members";
import defaultImage from "@/assets/images/members/default.png";
import bgImage from "@/assets/images/brand/bg-login.jpg";

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const socialLinks = getSocialLinks(member);

  return (
    <Card className="group bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md rounded-2xl overflow-hidden">
      <CardHeader className="relative p-0">
        <div className="relative">
          <Image
            src={bgImage}
            width={400}
            height={160}
            className="w-full h-40 object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="absolute -bottom-10 left-6 z-10">
          <div className="relative">
            <Image
              src={member.photoUrl || defaultImage}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
              alt={member.fullName}
            />
            {member.isLeader && (
              <div className="absolute -top-1 -right-1 bg-blue-600 rounded-full p-1">
                <Star size={14} className="text-white fill-white" />
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-12 pb-6 px-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize group-hover:text-blue-600 transition-colors">
            {toTitleCase(member.fullName)}
          </h3>
          <Badge
            variant="secondary"
            className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
          >
            {mapDomainInverse(member.domain)}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
            <span className="uppercase font-medium">
              {member.region}
            </span>
          </div>

          {member.languages && member.languages.length > 0 && (
            <div className="flex items-center text-gray-600 text-sm">
              <Code className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
              <span className="truncate">
                {member.languages.join(", ")}
              </span>
            </div>
          )}

          <div className="flex items-center text-gray-600 text-sm">
            <Mail className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
            <Link
              href={`mailto:${member.email}`}
              target="_blank"
              className="truncate hover:text-blue-600 cursor-pointer transition-colors"
            >
              {member.email}
            </Link>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium mr-2">
                Social:
              </span>
              <div className="flex gap-2">
                {socialLinks
                  .slice(0, 4)
                  .map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={getSocialButtonStyle(link.platform)}
                      title={`${member.fullName} sur ${link.platform}`}
                    >
                      {getSocialIcon(link.platform)}
                    </Link>
                  ))}
                {socialLinks.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-medium">
                    +{socialLinks.length - 4}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;