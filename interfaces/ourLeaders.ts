import { StaticImageData } from "next/image";

export default interface OurLeaders {
    name: string;
    socials: {
        gmail: string;
        facebook: string;
        linkedln: string;
    }
    url: StaticImageData;
  }
  