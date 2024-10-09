import { StaticImageData } from "next/image";

export default interface OurLeaders {
    name: string;
    role: string;
    socials: {
        gmail: string;
        facebook: string;
        linkedln: string;
        github: string;
    }
    url: StaticImageData;
  }
  