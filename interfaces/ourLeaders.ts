import { StaticImageData } from "next/image";

export default interface OurLeaders {
    name: string;
    first_name: string,
    last_name: string,
    socials: {
        gmail: string;
        facebook: string;
        linkedln: string;
    }
    url: StaticImageData;
  }
  