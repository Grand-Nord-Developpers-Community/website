import { Metadata } from "next";
import BeMemberPage from "./_components/BeMemberPage";

export const metadata: Metadata = {
  title: "GNDC | Devenir membre",
  description:
    "Rejoignez la communauté technologique du Grand Nord Cameroun. Inscrivez-vous pour faire partie de notre réseau d'innovateurs passionnés de technologie.",
};

const BeMember = () => {
  return <BeMemberPage />;
};

export default BeMember;
