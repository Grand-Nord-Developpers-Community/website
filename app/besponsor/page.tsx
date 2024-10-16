import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Gift, Rocket, Users } from 'lucide-react';
import Image from "next/image";
import Image1 from "@/assets/images/img1.jpg";
import Image2 from "@/assets/images/img2.jpg";

export const metadata = {
  title: "GNDC | Devenir Sponsor",
  description: "Soutenez l'innovation technologique dans le Grand Nord Cameroun en devenant sponsor de GNDC",
};

interface SponsorshipTierProps {
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

const SponsorshipTier: React.FC<SponsorshipTierProps> = ({ title, price, features, recommended = false }) => (
  <Card className={`flex flex-col h-full transition-all duration-300 hover:shadow-xl ${recommended ? 'border-primary border-2 scale-105' : ''}`}>
    <CardContent className="flex flex-col h-full p-6">
      {recommended && (
        <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">
          Recommandé
        </span>
      )}
      <h3 className="text-2xl font-bold mb-2 text-primary">{title}</h3>
      <p className="text-3xl font-extrabold mb-6 text-secondary">{price}</p>
      <ul className="space-y-2 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <ArrowRight className="text-primary mr-2" size={16} />
            {feature}
          </li>
        ))}
      </ul>
      <Button variant={recommended ? "default" : "outline"} className="w-full hover:bg-secondary hover:text-white transition-colors duration-300">
        Choisir ce plan
      </Button>
    </CardContent>
  </Card>
);

const DevenirSponsorPage = () => {
  return (
    <section>
      <div className="bg-gradient-to-b from-primary to-primary-dark text-white">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h1 className="max-w-lg mb-6 text-4xl font-bold leading-none tracking-tight sm:text-5xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-200 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern id="star-pattern" x="0" y="0" width=".15" height=".30">
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect fill="url(#star-pattern)" width="52" height="24" />
                </svg>
                <span className="relative">Devenez</span>
              </span>{' '}
              <span className="text-secondary font-extrabold">Sponsor de l&apos;Innovation</span>
            </h1>
            <p className="text-base md:text-lg">
              Rejoignez-nous dans notre mission de propulser l&apos;innovation technologique dans le Grand Nord Cameroun. 
              Votre soutien fait la différence !
            </p>
          </div>
          
          <div className="grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-3 sm:grid-cols-2">
            <div className="duration-300 transform bg-white text-primary border-l-4 border-primary hover:-translate-y-2">
              <div className="h-full p-5 border border-l-0 rounded-r shadow-sm">
                <h6 className="mb-2 font-semibold leading-5">Visibilité Accrue</h6>
                <p className="text-sm">
                  Exposez votre marque à un public passionné de technologie et d&apos;innovation.
                </p>
              </div>
            </div>
            <div className="duration-300 transform bg-white text-primary border-l-4 border-primary hover:-translate-y-2">
              <div className="h-full p-5 border border-l-0 rounded-r shadow-sm">
                <h6 className="mb-2 font-semibold leading-5">Réseau Étendu</h6>
                <p className="text-sm">
                  Connectez-vous avec des talents locaux et des leaders de l&apos;industrie tech.
                </p>
              </div>
            </div>
            <div className="duration-300 transform bg-white text-primary border-l-4 border-primary hover:-translate-y-2">
              <div className="h-full p-5 border border-l-0 rounded-r shadow-sm">
                <h6 className="mb-2 font-semibold leading-5">Impact Social</h6>
                <p className="text-sm">
                  Contribuez directement au développement technologique de la région.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <h2 className="max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight text-primary sm:text-4xl md:mx-auto">
            Choisissez votre niveau de partenariat
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Nous offrons différentes options pour répondre à vos objectifs et votre budget.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          <SponsorshipTier
            title="Bronze"
            price="500 000 FCFA"
            features={[
              "Logo sur notre site web",
              "Mention lors des événements",
              "1 billet gratuit pour nos conférences"
            ]}
          />
          <SponsorshipTier
            title="Argent"
            price="1 000 000 FCFA"
            features={[
              "Tous les avantages Bronze",
              "Stand aux événements majeurs",
              "3 billets gratuits pour nos conférences",
              "Participation à un panel d'experts"
            ]}
            recommended={true}
          />
          <SponsorshipTier
            title="Or"
            price="2 500 000 FCFA"
            features={[
              "Tous les avantages Argent",
              "Naming d'un événement majeur",
              "5 billets VIP pour nos conférences",
              "Mentorat exclusif de startups locales"
            ]}
          />
        </div>
      </div>
      
      <div className="bg-gray-50 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
          <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
            <div className="max-w-xl mb-6">
              <h2 className="font-sans text-3xl font-bold tracking-tight text-primary sm:text-4xl sm:leading-none max-w-lg mb-6">
                Prêt à faire partie de
                <br className="hidden md:block" />
                l&apos;avenir technologique{' '}
                <span className="inline-block text-secondary">du Grand Nord ?</span>
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                Contactez-nous dès aujourd&apos;hui pour discuter des opportunités de partenariat 
                et commencer à façonner ensemble l&apos;avenir de la tech au Cameroun.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/contact" className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-secondary hover:bg-secondary-dark focus:shadow-outline focus:outline-none">
                Nous contacter
              </Link>
              <Link href="/about" className="inline-flex items-center font-semibold transition-colors duration-200 text-secondary hover:text-secondary-dark">
                En savoir plus
                <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center lg:w-1/2">
            <div className="w-3/5">
              <Image
                className="object-cover rounded-lg shadow-lg"
                src={Image1}
                alt="Sponsor Impact"
              />
            </div>
            <div className="w-10/12 -ml-16 lg:-ml-32">
              <Image
                className="object-cover rounded-lg shadow-lg"
                src={Image2}
                alt="Tech Community"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Card className="max-w-4xl mx-auto my-16 bg-white text-primary shadow-xl">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold mb-4 text-center text-primary">Notre engagement envers nos sponsors</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Gift className="flex-shrink-0 w-6 h-6 text-secondary mr-4" />
              <span className="text-gray-700">Reconnaissance publique et visibilité accrue dans la communauté tech</span>
            </li>
            <li className="flex items-start">
              <Rocket className="flex-shrink-0 w-6 h-6 text-secondary mr-4" />
              <span className="text-gray-700">Opportunités exclusives de networking et de développement commercial</span>
            </li>
            <li className="flex items-start">
              <Users className="flex-shrink-0 w-6 h-6 text-secondary mr-4" />
              <span className="text-gray-700">Accès privilégié à un vivier de talents tech locaux pour vos recrutements</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default DevenirSponsorPage;