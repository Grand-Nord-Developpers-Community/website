import React from "react";
import { Shield, Lock, UserCheck } from "lucide-react";
import HeadingPage from "@/sections/common/HeadingPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "GNDC | Politique de confidentialité",
  description:
    "Communauté technologique pour la promotion de l'innovation et de la technologie dans le Grand Nord Cameroun",
};
const page: React.FC = () => {
  return (
    <>
      <HeadingPage title="Politique de Confidentialité de la GNDC" />
      <div className="prose dark:prose-invert mx-auto px-4 py-6">
        <h2 className="flex items-center text-xl font-bold mb-2">
          <Shield className="mr-2 text-primary" />
          Collecte d&apos;informations
        </h2>
        <p>
          Nous recueillons des informations personnelles que vous nous
          fournissez directement, telles que votre nom, adresse e-mail, et
          informations de profil. Nous collectons également automatiquement
          certaines informations sur votre utilisation de notre service, y
          compris, mais sans s&apos;y limiter, les adresses IP, les types de
          navigateurs, les pages visitées, et les temps de visite.
        </p>

        <h2 className="flex items-center text-xl font-bold mb-2">
          <Lock className="mr-2 text-primary" />
          Utilisation des données
        </h2>
        <p>Nous utilisons les informations que nous collectons pour :</p>
        <ul>
          <li>Fournir, maintenir et améliorer notre service.</li>
          <li>
            Communiquer avec vous, notamment pour répondre à vos questions,
            fournir des mises à jour et des informations sur notre service.
          </li>
          <li>
            Détecter, prévenir et résoudre les problèmes techniques et de
            sécurité afin d&apos;assurer la meilleure expérience utilisateur
            possible.
          </li>
          <li>
            Analyser l&apos;utilisation de notre service pour comprendre les
            tendances et améliorer la fonctionnalité et les performances.
          </li>
        </ul>

        <h2 className="flex items-center text-xl font-bold mb-2">
          <UserCheck className="mr-2 text-primary" />
          Protection des données
        </h2>
        <p>
          Nous mettons en œuvre des mesures de sécurité appropriées pour
          protéger vos informations personnelles contre l&apos;accès non
          autorisé, la modification, la divulgation ou la destruction. Ces
          mesures incluent :
        </p>
        <ul>
          <li>Le chiffrement des données sensibles.</li>
          <li>
            La restriction de l&apos;accès aux données personnelles aux seuls
            employés et partenaires qui en ont besoin pour exécuter leurs
            tâches.
          </li>
          <li>
            La mise en place de protocoles stricts de sécurité des informations
            et de contrôle d&apos;accès.
          </li>
        </ul>

        <h2 className="text-xl font-bold mb-2">Partage des informations</h2>
        <p>
          Nous ne partageons vos informations personnelles avec des tiers que
          dans les circonstances suivantes :
        </p>
        <ul>
          <li>Avec votre consentement explicite.</li>
          <li>Pour se conformer à des obligations légales.</li>
          <li>
            Avec des fournisseurs de services tiers qui nous aident à exploiter
            notre service, à condition qu&apos;ils acceptent de protéger vos
            informations de la même manière que nous.
          </li>
        </ul>

        <h2 className="text-xl font-bold mb-2">Conservation des données</h2>
        <p>
          Nous conservons vos informations personnelles aussi longtemps que
          nécessaire pour atteindre les objectifs décrits dans cette politique
          de confidentialité, sauf si une période de conservation plus longue
          est requise ou permise par la loi.
        </p>

        <h2 className="text-xl font-bold mb-2">Vos droits</h2>
        <p>
          Vous avez le droit d&apos;accéder à vos informations personnelles, de
          les corriger, de demander leur suppression ou de limiter leur
          traitement. Pour exercer ces droits, veuillez nous contacter à
          [insérer les coordonnées].
        </p>

        <h2 className="text-xl font-bold mb-2">
          Modifications de cette politique
        </h2>
        <p>
          Nous pouvons mettre à jour cette politique de confidentialité de temps
          à autre. Nous vous informerons de toute modification en publiant la
          nouvelle politique de confidentialité sur cette page. Nous vous
          encourageons à consulter cette page régulièrement pour rester informé
          des changements.
        </p>

        <h2 className="text-xl font-bold mb-2">Contact</h2>
        <p>
          Si vous avez des questions sur cette politique de confidentialité ou
          sur nos pratiques de protection des données, veuillez nous contacter à
          :
        </p>
        <p>
          <span className="text-secondary">Adresse e-mail</span> :
          contact@gndc.org
          <br />
          <span className="text-secondary">Telephone: </span>: +237 691805321 /
          +237 672277579
        </p>

        <p>
          En utilisant notre service, vous acceptez les termes de cette
          politique de confidentialité.
        </p>

        <p className="mt-6 text-center font-semibold">
          GNDC - Communauté des Développeurs du Grand Nord Cameroun
        </p>
      </div>
    </>
  );
};

export default page;
