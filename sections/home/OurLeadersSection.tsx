import React from "react";
import { Mail, Linkedin } from "lucide-react";
import leaders from "@/data/ourLeaders";

import Image, { StaticImageData } from "next/image";

// Import social media icons
import FacebookIcon from "@/assets/images/social-icons/facebook.svg";
import GithubIcon from "@/assets/images/social-icons/github.svg";
import GmailIcon from "@/assets/images/social-icons/gmail.svg";
import LinkedInIcon from "@/assets/images/social-icons/linkedin.svg";

// const TeamMember: React.FC<Leader> = ({ name, role, url, socials }) => (
//   <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
//     <Image loading="lazy"  src={url} alt={name} width={80} height={80} className="rounded-full mb-2 fill-current text-primary" />
//     <h3 className="font-bold text-sm text-center">{name}</h3>
//     <p className="text-xs text-gray-500 text-center">{role}</p>
//     <div className="flex justify-center space-x-2 mt-2 text-primary">
//       {/* Gmail Icon */}
//       <a href={`mailto:${socials.gmail}`} aria-label="Email">
//         <Image loading="lazy"  src={GmailIcon} alt="Gmail" width={16} height={16} className="text-primary hover:text-blue-500"/>
//       </a>
//       {/* Facebook Icon */}
//       <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
//         <Image loading="lazy"  src={FacebookIcon} alt="Facebook" width={10} height={10} className="hover:opacity-75" />
//       </a>
//       {/* LinkedIn Icon */}
//       <a href={socials.linkedln} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
//         <Image loading="lazy"  src={LinkedInIcon} alt="LinkedIn" width={16} height={16} className="hover:opacity-75" />
//       </a>
//       {/* Github Icon */}
//       <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="Github">
//         <Image loading="lazy"  src={GithubIcon} alt="Github" width={16} height={16} className="hover:opacity-75" />
//       </a>
//     </div>
//   </div>
// );

// const TeamMembers: React.FC = () => (
//   <section className="bg-gray-50 py-8 px-4">
//     <div className="max-w-6xl mx-auto">
//       <div className="mb-12 text-center">
//         <h2 className="text-3xl font-bold text-black mb-4">Nos leaders</h2>
//         <p className="text-xl leading-normal max-w-2xl mx-auto">
//           GNDC est dirigée par une équipe de leaders passionnés et visionnaires,
//           dévoués à l&apos;innovation technologique et à l&apos;enseignement dans le Grand Nord Cameroun.
//         </p>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {leaders.map((leader, index) => (
//           <TeamMember key={index} {...leader} />
//         ))}
//       </div>
//     </div>
//   </section>
// );

//export default TeamMembers;
//import React from "react";
import TeamCard from "@/components/cards/TeamCard";

const Team = () => {
  return (
    <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 w-full  bg-gray-50">
      <div className="screen-wrapper">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <h2 className="mb-3 text-3xl text-primary font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Nos Leaders
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                GNDC est dirigée par une équipe de leaders passionnés et
                visionnaires, dévoués à l&apos;innovation technologique et à
                l&apos;enseignement dans le Grand Nord Cameroun.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {leaders.map((leader, index) => (
            <TeamCard key={index} {...leader} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
