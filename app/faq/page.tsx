"use client";

import React, { ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import {Button } from "@/components/ui/button";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}
/*
const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${className}`} {...props}>
    {children}
  </button>
);
*/

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200 py-4">
    <button
      className="flex w-full items-center justify-between text-left"
      onClick={onClick}
    >
      <span className="text-lg font-medium">{question}</span>
      {isOpen ? (
        <ChevronUp className="h-5 w-5 text-gray-500" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-500" />
      )}
    </button>
    {isOpen && (
      <p className="mt-2 text-gray-600">{answer}</p>
    )}
  </div>
);


const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'general' | 'support' | 'autres'>('general');

  const faqCategories = {
    general: [
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
      }
    ],
    support: [
      {
        question: "Comment puis-je obtenir de l'aide pour un problème technique ?",
        answer: "Nous offrons plusieurs options de support : vous pouvez poser vos questions sur notre forum communautaire, participer à nos sessions de mentorat, ou contacter directement un de nos leaders via la plateforme de messagerie de notre site web."
      },
      {
        question: "Y a-t-il des ressources d'apprentissage disponibles pour les membres ?",
        answer: "Oui, nous mettons à disposition de nos membres une bibliothèque de ressources en ligne, incluant des tutoriels, des cours vidéo et des documents techniques. De plus, nous organisons régulièrement des ateliers de formation sur diverses technologies."
      }
    ],
    autres: [
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
    ]
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h4 className="text-xl font-bold text-[#C38D3D] uppercase mb-2">COMMENT COMMENCER</h4> 
          <h1 className="text-4xl font-bold">Questions fréquemment posées</h1>
        </div>
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <nav className="space-y-2">
              {(['general', 'support', 'autres'] as const).map((category) => (
                <button 
                  key={category}
                  className={`w-full text-left py-2 px-4 rounded font-medium ${
                    activeCategory === category 
                      ? 'bg-[#F6EAD7] text-[#C38D3D] font-bold' 
                      : 'text-gray-600 hover:bg-[#FDF6EC]'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          <div className="col-span-3">
            {faqCategories[activeCategory].map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold">Vous avez d&apos;autres questions ?</h2>
          <p className="mt-4 text-gray-600">
            N&apos;hésitez pas à nous contacter via nos réseaux sociaux ou à nous rejoindre sur WhatsApp.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Button>
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;