import OurSponsors from "@/interfaces/ourSponsors";

import logo2zaLab from "@/assets/images/sponsors/logo_2zaLab.png";
import logoCITS from "@/assets/images/sponsors/logo_CITS.png";
import logoGDG_Garoua from "@/assets/images/sponsors/logo_gdg_garoua.png";
import logoGDG_Maroua from "@/assets/images/sponsors/logo_gdg_maroua.png";
import logoMIT from "@/assets/images/sponsors/logo_MIT.png";
import logoMountainHub from "@/assets/images/sponsors/logo_mountain_hub.png";
import logoSamplex from "@/assets/images/sponsors/logo_samplex.png";

const date = new Date();

const ourSponsors: OurSponsors[] = [
  {
    logo: {
      height: logoGDG_Maroua.height,
      url: logoGDG_Maroua.src,
      width: logoGDG_Maroua.width,
    },
    name: "GDG Maroua",
    url: "https://gdg.com",
  },
  {
    logo: {
      height: logoGDG_Garoua.height,
      url: logoGDG_Garoua.src,
      width: logoGDG_Garoua.width,
    },
    name: "GDG Garoua",
    url: "https://gdg.com",
  },
  {
    logo: {
      height: logoMIT.height,
      url: logoMIT.src,
      width: logoMIT.width,
    },
    name: "MIT",
    url: "https://gdg.com",
  },
  {
    logo: {
      height: logoSamplex.height,
      url: logoSamplex.src,
      width: logoSamplex.width,
    },
    name: "Samplex",
    url: "https://gdg.com",
  },
  {
    logo: {
      height: logo2zaLab.height,
      url: logo2zaLab.src,
      width: logo2zaLab.width,
    },
    name: "2zalab",
    url: "https://gdg.com",
  },
  {
    logo: {
      height: logoMountainHub.height,
      url: logoMountainHub.src,
      width: logoMountainHub.width,
    },
    name: "Mountain Hub",
    url: "https://gdg.com",
  },
  {
    logo: {
      height: logoCITS.height,
      url: logoCITS.src,
      width: logoCITS.width,
    },
    name: "Cameroon International Tech Summit",
    url: "https://gdg.com",
  },
];

export default ourSponsors;
