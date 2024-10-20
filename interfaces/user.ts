import { StaticImageData, StaticImport } from "next/dist/shared/lib/get-img-props";

export default interface User {
  name: string;
  profile_image: string | StaticImageData;
  created_at: Date;
  updated_at: Date;
}
