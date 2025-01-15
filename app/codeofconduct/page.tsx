import React from "react";
import { Shield, MessageCircle, Users, Search, Heart } from "lucide-react";
import HeadingPage from "@/sections/common/HeadingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GNDC | Code de conduite",
  description:
    "Communauté technologique pour la promotion de l'innovation et de la technologie dans le Grand Nord Cameroun",
};

const page: React.FC = () => {
  return (
    <>
      <HeadingPage title="Code de Conduite GNDC" />
      <div className="prose mx-auto px-4 py-6">
        <h2 className="flex items-center text-xl font-bold mb-2">
          <Shield className="mr-2 text-primary" />
          Respect mutuel
        </h2>
        <p>
          Traitez tous les membres de la communauté avec respect et courtoisie.
          Nous valorisons la diversité et nous nous engageons à créer un
          environnement inclusif pour tous. Évitez d&apos;utiliser un langage ou
          des images inappropriés, et soyez toujours attentif aux différences
          culturelles et personnelles.
        </p>

        <h2 className="flex items-center text-xl font-bold mb-2">
          <MessageCircle className="mr-2 text-primary" />
          Communication constructive
        </h2>
        <p>
          Exprimez vos idées clairement et écoutez attentivement les autres.
          Acceptez les critiques constructives et offrez des retours de manière
          bienveillante et respectueuse. Cherchez à comprendre avant de vous
          faire comprendre. Une communication efficace est la clé d&apos;une
          collaboration réussie.
        </p>

        <h2 className="flex items-center text-xl font-bold mb-2">
          <Users className="mr-2 text-primary" />
          Collaboration et Partage
        </h2>
        <p>
          Encouragez la collaboration et le partage des connaissances au sein de
          la communauté. Chacun a quelque chose à apporter, et ensemble, nous
          pouvons surmonter les défis et innover. Participez activement aux
          discussions et projets, et soyez prêt à aider les autres membres.
        </p>

        <h2 className="flex items-center text-xl font-bold mb-2">
          <Search className="mr-2 text-primary" />
          Intégrité et Honnêteté
        </h2>
        <p>
          Agissez toujours avec intégrité et honnêteté. Présentez des
          informations précises et évitez de diffuser des rumeurs ou des
          informations non vérifiées. Respectez les droits d&apos;auteur et les
          licences de propriété intellectuelle. Soyez transparent dans vos
          actions et vos intentions.
        </p>

        <h2 className="flex items-center text-xl font-bold mb-2">
          <Heart className="mr-2 text-primary" />
          Signalement des problèmes
        </h2>
        <p>
          Si vous êtes témoin d&apos;un comportement inapproprié ou d&apos;une
          violation de ce code de conduite, signalez-le immédiatement aux
          modérateurs de la communauté. Toutes les plaintes seront examinées et
          traitées de manière confidentielle pour protéger les parties
          impliquées.
        </p>

        <h2 className="text-xl font-bold mb-2">Objectif de la communauté</h2>
        <p>
          La GNDC (Communauté des Développeurs du Grand Nord Cameroun) vise à
          promouvoir l&apos;innovation, partager les compétences technologiques,
          et résoudre les défis locaux à travers des solutions collaboratives.
          Nous nous engageons à créer un environnement propice à
          l&apos;apprentissage, au développement personnel et à l&apos;entraide.
        </p>

        <h2 className="text-xl font-bold mb-2">
          Responsabilités des Modérateurs
        </h2>
        <p>
          Les modérateurs de la communauté sont responsables de clarifier les
          normes de comportement acceptable et sont tenus de prendre des mesures
          correctives appropriées et équitables en réponse à tout comportement
          inacceptable. Ils doivent agir de manière impartiale et respecter la
          confidentialité des informations des membres.
        </p>

        <h2 className="text-xl font-bold mb-2">Portée</h2>
        <p>
          Ce code de conduite s&apos;applique à tous les espaces communautaires,
          qu&apos;ils soient en ligne ou hors ligne, ainsi qu&apos;à toutes les
          personnes représentant la communauté dans des espaces publics. Cela
          inclut les forums de discussion, les réseaux sociaux, les événements,
          et toute autre interaction publique.
        </p>

        <h2 className="text-xl font-bold mb-2">Application</h2>
        <p>
          Les cas de comportement abusif, de harcèlement ou autrement
          inacceptable peuvent être signalés aux modérateurs de la communauté à
          [insérer les coordonnées]. Toutes les plaintes seront examinées de
          manière rigoureuse et aboutiront à une réponse jugée nécessaire et
          appropriée aux circonstances. Les modérateurs sont tenus de maintenir
          la confidentialité des plaignants pour garantir un environnement sûr
          et respectueux.
        </p>

        <p>
          En adoptant ce code de conduite, nous nous engageons à bâtir une
          communauté où chacun se sent en sécurité, respecté et inclus. Nous
          croyons fermement que la diversité et l&apos;inclusion sont des forces
          qui nous permettront de réussir et d&apos;innover ensemble.
        </p>

        <h2 className="text-xl font-bold mb-2">Attribution</h2>
        <p>
          Ce Code de Conduite est adapté du{" "}
          <a
            href="https://www.contributor-covenant.org"
            className="text-primary hover:underline"
          >
            Contributor Covenant
          </a>
          , version 2.0, disponible à{" "}
          <a
            href="https://www.contributor-covenant.org/version/2/0/code_of_conduct.html"
            className="text-primary hover:underline"
          >
            https://www.contributor-covenant.org/version/2/0/code_of_conduct.html
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default page;
