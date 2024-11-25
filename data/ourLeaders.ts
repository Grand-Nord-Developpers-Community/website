import leader1 from "../assets/images/leaders/vana.jpg";
import leader2 from "../assets/images/leaders/djakaye.jpg";
import leader3 from "../assets/images/leaders/assan.jpg";
import leader4 from "../assets/images/leaders/dr_sangoumi.jpg";
import leader5 from "../assets/images/leaders/touza.jpg";
import sanda from "../assets/images/leaders/sanda.jpg";
import yameni from "../assets/images/leaders/nestor.jpg";
import bekaiwe from "../assets/images/leaders/bekaiwe.jpg";

import OurLeaders from "@/interfaces/ourLeaders";

const leaders: OurLeaders[] = [
  {
    name: "Touza Isaac",
    url: leader5,
    role: "Coordonateur",
    socials: {
      gmail: "isaac_touza@outlook.fr	",
      facebook: "https://www.facebook.com/touza.isaac",
      linkedln: "https://www.linkedin.com/in/touzaisaac",
      github: "https://github.com/2zalab",
    },
  },
  {
    name: "Dr Saoungoumi Rodrigue",
    role: "Président d'honneur",
    url: leader4,
    socials: {
      gmail: "sangoumi@gmail.com",
      facebook: "",
      linkedln: "",
      github: "",
    },
  },
  {
    name: "Nsangou Assan Zidan",
    role: "Leader - Adamaoua",
    url: leader3,
    socials: {
      gmail: "johndoe@gmail.com",
      facebook: "aajt",
      linkedln: "",
      github: "",
    },
  },
  {
    name: "Yameni Pougoue Gabin ",
    role: "Co-Leader - Adamaoua",
    url: yameni,
    socials: {
      gmail: "johndoe@gmail.com",
      facebook: "aajt",
      linkedln: "",
      github: "",
    },
  },
  {
    name: "SANDA Oumarou",
    role: "Leader - Extrême Nord",
    url: sanda,

    socials: {
      gmail: "johndoe@gmail.com",
      facebook: "aajt",
      linkedln: "",
      github: "",
    },
  },

  {
    name: "VANA ZOKOM ELIE",
    role: "Co-Leader - Extrême Nord",

    url: leader1,
    socials: {
      gmail: "eliezokom@gmail.com",
      facebook: "https://www.facebook.com/zokom.elie",
      linkedln: "https://www.linkedin.com/in/elievanazokom",
      github: "https://github.com/goodbuzzer",
    },
  },
  {
    name: "Bakaiwe Menga Rodrigue",
    role: "Leader - Nord",
    url: bekaiwe,

    socials: {
      gmail: "johndoe@gmail.com",
      facebook: "aajt",
      linkedln: "",
      github: "",
    },
  },
  {
    name: "DJAKAYE Dieudonné ",
    role: "Co-Leader - Nord",
    url: leader2,

    socials: {
      gmail: "johndoe@gmail.com",
      facebook: "aajt",
      linkedln: "",
      github: "",
    },
  },
];

export default leaders;
