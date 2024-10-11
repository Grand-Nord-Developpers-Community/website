import React from "react";
import Image from "next/image";
import develperImage from "../../assets/images/commons/developerImage.png";

interface StatProps {
  number: string;
  title: string;
  description: string;
}

const StatCard = ({ number, title, description }: StatProps) => (
  <div className="mb-8">
    <div className="flex items-baseline gap-1">
      <h3 className="text-4xl font-bold text-secondary">{number}</h3>
      <span className="text-xl font-semibold text-secondary">+</span>
    </div>
    <h4 className="text-white font-semibold mb-1">{title}</h4>
    <p className="text-white/80 text-sm leading-relaxed">{description}</p>
  </div>
);

function AboutSection() {
  return (
    <div className="w-full bg-[#1B3B5A] py-10 px-4 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="text-white">
            <h2 className="text-3xl font-bold text-secondary mb-6">À propos</h2>
            <p className="text-xl leading-relaxed mb-6">
              Grand Nord Developers Community réunit les développeurs du Grand
              Nord Cameroun pour promouvoir l&apos;innovation, partager les
              compétences technologiques, et résoudre les défis locaux à travers
              des solutions collaboratives.
            </p>
            <hr />
            <div className="grid md:grid-cols-2 gap-x-8 py-4">
              <StatCard
                number="500"
                title="Développeurs"
                description="engagés, unis par la passion de l'innovation."
              />
              <StatCard
                number="20"
                title="Projets"
                description="technologiques concrets ayant un impact positif sur la communauté locale."
              />
              <StatCard
                number="10"
                title="Évènements"
                description="organisés, rassemblant des centaines de participants chaque année."
              />
              <StatCard
                number="30"
                title="Initiatives"
                description="en cours, allant de solutions numériques à des applications innovantes."
              />
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[600px] rounded-3xl overflow-hidden">
            <Image
              src={develperImage}
              alt="Developer working"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
