import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Code, Users, Target, Activity, Briefcase, PhoneCall } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";


const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Grand Nord Developers Community (GNDC)</h1>
      <hr/>
      <section className="mb-12 py-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Code className="mr-2" /> Description
        </h2>
        <p className="mb-4">
          Grand Nord Developers Community (GNDC) est une communauté dynamique et passionnée de développeurs basée dans le Grand Nord du Cameroun. Cette communauté est composée de développeurs, ingénieurs et passionnés de technologie qui partagent une vision commune de l&apos;avenir technologique de leur région.
        </p>
        <p>Notre devise : Nous contribuons au développement technologique du Grand Nord Cameroun</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Target className="mr-2" /> Nos Objectifs
        </h2>
        <ul className="list-disc pl-6">
          <li>Stimuler l&apos;innovation technologique</li>
          <li>Favoriser la collaboration entre les développeurs</li>
          <li>Contribuer au développement de la région et du Cameroun</li>
          <li>Encourager la collaboration entre les développeurs locaux pour bâtir un réseau solide et solidaire</li>
          <li>Fournir des ressources et des formations afin de développer les compétences des membres et de les maintenir à jour avec les dernières avancées technologiques</li>
          <li>Créer un écosystème favorable à l&apos;innovation et à l&apos;entrepreneuriat, permettant aux développeurs de transformer leurs idées en projets concrets</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Activity className="mr-2" /> Nos Activités
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex items-center">
              <Users className="mr-2" /> Formations et Ateliers
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6">
                <li>Organiser des formations pour initier les jeunes aux domaines de la technologie</li>
                <li>Ateliers pratiques pour découvrir les processus technologiques</li>
                <li>Masterclass et séminaires sur l&apos;entrepreneuriat et autres compétences avancées</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center">
              <Code className="mr-2" /> Hackathons et Compétitions de Codage
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6">
                <li>Organiser des hackathons nocturnes pour travailler sur des projets intensifs</li>
                <li>Projets de codage collaboratifs axés sur des défis spécifiques ou des initiatives communautaires</li>
                <li>Défis de codage en direct avec des prix pour les gagnants</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center">
              <Users className="mr-2" /> Mentorat et Opportunités Professionnelles
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6">
                <li>Faciliter les interactions régulières entre mentors expérimentés et apprenants</li>
                <li>Offrir des opportunités de stage, des programmes de formation et des événements de recrutement</li>
                <li>Faciliter la connexion entre développeurs et professionnels de l&apos;industrie</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center">
              <Briefcase className="mr-2" /> Soutien aux Start-ups et Partenariats
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6">
                <li>Masterclass certifiantes pour les aspirants entrepreneurs</li>
                <li>Accès à des ressources supplémentaires et occasions d&apos;apprentissage grâce aux partenariats</li>
                <li>Soutenir les initiatives technologiques locales et promouvoir l&apos;entrepreneuriat technologique</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Users className="mr-2" /> Pourquoi Rejoindre GNDC ?
        </h2>
        <ul className="list-disc pl-6">
          <li>Possibilité de participer à des formations, des ateliers pratiques et des sessions de mentorat</li>
          <li>Opportunités de collaboration et de partage de connaissances avec d&apos;autres développeurs passionnés</li>
          <li>Accès à des ressources et à des opportunités de formation pour améliorer ses compétences techniques</li>
          <li>Possibilités de développement professionnel et personnel à travers divers programmes et événements organisés par la communauté</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <PhoneCall className="mr-2" /> Contactez-nous
        </h2>
        <p>Téléphone : +237 691805321 / +237 672277579</p>
        <p>Email : contact@gndc.org</p>

        <div className="mt-6 flex justify-center space-x-4">
            <Button className="text-white" asChild>
                <Link href="/contact"> Laissez un message</Link>
             </Button>
          </div>
      </section>
    </div>
  );
};

export default AboutUs;