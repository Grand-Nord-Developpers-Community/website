import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import HeadingPage from "@/sections/common/HeadingPage";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  Code,
  Users,
  Target,
  Activity,
  Briefcase,
  PhoneCall,
  Globe,
  Zap,
  BookOpen,
  Rocket,
} from "lucide-react";

export const metadata: Metadata = {
  title: "GNDC | À propos de nous",
  description:
    "Rejoignez la Grand Nord Developers Community (GNDC) pour stimuler l'innovation technologique et le développement dans le nord du Cameroun. Découvrez notre mission, nos activités et comment vous pouvez participer à cette aventure passionnante.",
  keywords:
    "GNDC, développeurs, Cameroun, Grand Nord, technologie, innovation, communauté",
};

const AboutUs = () => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white">
      <HeadingPage
        title="Qui sommes-nous"
        description="A propos de la Grand Nord Developers Community"
        icon={<QuestionMarkCircledIcon className="w-8 h-8 text-white" />}
      />
      <div className="container mx-auto px-4 py-12">
        <section className="mb-16 py-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-primary">
            Notre Vision
          </h2>
          <p className="text-lg text-center max-w-3xl mx-auto leading-relaxed">
            À la GNDC, nous sommes plus qu&apos;une communauté - nous sommes un
            mouvement. Notre passion pour la technologie et l&apos;innovation
            nous pousse à remodeler l&apos;avenir du Grand Nord du Cameroun.
            Ensemble, nous construisons un écosystème dynamique où les idées
            fleurissent, les compétences se développent et les rêves deviennent
            réalité.
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/bemember"
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              Participer à la révolution
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">
            Ce Qui Nous Anime
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-10 h-10 text-yellow-500" />,
                title: "Innovation",
                description: "Favoriser des idées et des solutions novatrices",
              },
              {
                icon: <Users className="w-10 h-10 text-blue-500" />,
                title: "Collaboration",
                description: "Construire un réseau solide et solidaire",
              },
              {
                icon: <BookOpen className="w-10 h-10 text-green-500" />,
                title: "Éducation",
                description:
                  "Apprentissage continu et développement des compétences",
              },
              {
                icon: <Rocket className="w-10 h-10 text-red-500" />,
                title: "Croissance",
                description: "Accélérer le développement personnel et régional",
              },
              {
                icon: <Target className="w-10 h-10 text-purple-500" />,
                title: "Impact",
                description:
                  "Faire une différence durable dans notre communauté",
              },
              {
                icon: <Briefcase className="w-10 h-10 text-indigo-500" />,
                title: "Opportunité",
                description: "Créer des voies vers le succès professionnel",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <CardHeader className="flex flex-col items-center">
                  {item.icon}
                  <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-center">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">
            Nos Initiatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Code className="w-8 h-8 text-primary" />,
                title: "Ateliers Techniques & Bootcamps",
                description:
                  "Des expériences d&apos;apprentissage intensives et pratiques pour améliorer vos compétences",
              },
              {
                icon: <Activity className="w-8 h-8 text-primary" />,
                title: "Hackathons & Défis de Programmation",
                description:
                  "Compétitions excitantes pour résoudre des problèmes réels",
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Programme de Mentorat",
                description:
                  "Orientation par des experts de l&apos;industrie pour accélérer votre croissance",
              },
              {
                icon: <Briefcase className="w-8 h-8 text-primary" />,
                title: "Incubateur de Startups",
                description:
                  "Support et ressources pour transformer vos idées en projets réussis",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <CardHeader className="flex items-center space-x-4">
                  {item.icon}
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <p>{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-primary text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Rejoignez nous !
          </h2>
          <p className="text-lg text-center mb-8">
            Faites partie d&apos;une communauté qui façonne l&apos;avenir de la
            technologie dans le Grand Nord. Il y a une place pour vous ici.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/bemember">Nous rejoindre</Link>
            </Button>
            <Button
              variant="default"
              className="border-2 border-secondary"
              size="lg"
              asChild
            >
              <Link href="/events">Événements à Venir</Link>
            </Button>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Nous contacter
          </h2>
          <p className="mb-4">
            <PhoneCall className="inline-block mr-2" /> +237 691 805 321 / +237
            672 277 579
          </p>
          <p className="mb-6">
            <Globe className="inline-block mr-2" /> contact@gndc.org
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Envoyer un Message</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://twitter.com/GNDCommunity"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nous suivre
              </a>
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AboutUs;
