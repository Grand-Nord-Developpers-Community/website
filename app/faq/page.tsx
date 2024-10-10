"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border border-muted rounded-lg bg-card overflow-hidden">
      <button
        className="w-full px-6 py-4 flex items-center justify-between text-left"
        onClick={onClick}
      >
        <span className="text-lg font-semibold">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "px-6 transition-all duration-200 ease-in-out",
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        )}
      >
        <p className="text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Qu'est-ce que la Grand Nord Developers Community (GNDC) ?",
      answer: "La GNDC est une communauté de développeurs, d'ingénieurs et de passionnés de technologie basée dans le Grand Nord du Cameroun. Notre mission est de promouvoir l'innovation technologique, favoriser la collaboration entre développeurs et contribuer au développement régional."
    },
    {
      question: "Comment puis-je rejoindre la communauté ?",
      answer: "Vous pouvez rejoindre la communauté en remplissant le formulaire d'adhésion disponible sur notre site. Nous accueillons tous les passionnés de technologie, que vous soyez débutant ou expert. Une fois membre, vous aurez accès à nos événements exclusifs, formations et opportunités de réseautage."
    },
    {
      question: "Quels types d'événements organisez-vous ?",
      answer: "Nous organisons régulièrement plusieurs types d'événements : des hackathons (comme 'The Night of Code'), des ateliers pratiques, des masterclass sur des technologies spécifiques, et des sessions de mentorat. Nos événements peuvent être en ligne ou en présentiel, selon le format."
    },
    {
      question: "Dans quelles régions la GNDC est-elle présente ?",
      answer: "La GNDC est active dans les trois régions du Grand Nord du Cameroun : l'Adamaoua, l'Extrême-Nord et le Nord. Chaque région a ses leaders et co-leaders qui coordonnent les activités localement."
    },
    {
      question: "Comment puis-je contribuer à la communauté ?",
      answer: "Il existe plusieurs façons de contribuer : participer aux événements, partager vos connaissances lors des ateliers, devenir mentor pour les développeurs débutants, ou participer à nos projets communautaires comme le développement du site web de la communauté."
    },
    {
      question: "Proposez-vous des programmes de mentorat ?",
      answer: "Oui, nous organisons des sessions de mentorat où des experts de la communauté encadrent les développeurs débutants. Ces sessions permettent un partage d'expérience et un accompagnement personnalisé dans votre parcours de développeur."
    },
    {
      question: "Comment puis-je devenir sponsor de la GNDC ?",
      answer: "Nous sommes toujours à la recherche de partenaires pour soutenir nos initiatives. En tant que sponsor, vous contribuez au développement de l'écosystème technologique dans le Grand Nord Cameroun. Contactez-nous via nos réseaux sociaux ou notre site web pour discuter des opportunités de partenariat."
    },
    {
      question: "Quels sont les projets en cours de la communauté ?",
      answer: "Notre projet principal actuel est le développement du site web officiel de la GNDC, qui servira à la gestion des membres, des événements et des projets communautaires. Nous utilisons des technologies modernes comme Node.js, MongoDB, et Express.js pour ce projet."
    }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-background">
      {/* Hero Section */}
      <div className="relative py-24">
        <div className="container relative z-20">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Questions Fréquentes
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Tout ce que vous devez savoir sur la Grand Nord Developers Community
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container pb-24">
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold">Vous avez d&apos;autres questions ?</h2>
          <p className="mt-4 text-muted-foreground">
            N&apos;hésitez pas à nous contacter via nos réseaux sociaux ou à nous rejoindre sur WhatsApp.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Button className="text-white" asChild>
                <Link href="/contact"> Nous contacter</Link>
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;