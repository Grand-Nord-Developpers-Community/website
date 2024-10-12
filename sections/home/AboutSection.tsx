import NumberTicker from "@/components/ui/number-ticker";
import React from "react";

interface StatProps {
  number: number;
  title: string;
  description: string;
}
const StatCard = ({ number, title, description }: StatProps) => (
  <>
    <li className="flex flex-col -m-0.5 p-4 sm:p-8">
      <div className="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold  text-secondary mb-2">
        <NumberTicker value={number} />+
      </div>
      <h4 className="text-white font-semibold mb-1">{title}</h4>
      <p className="text-white/80 text-sm leading-relaxed">{description}</p>
    </li>
  </>
);

const TestimonialsWithStats = () => {
  return (
    <div className="w-full bg-[#1B3B5A] py-10 text-white">
      <div className="screen-wrapper">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center lg:justify-between">
          <div className="lg:col-span-5 lg:col-start-1">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl text-secondary font-bold lg:text-4xl">
                À propos
              </h2>
              <p>
                Grand Nord Developers Community réunit les développeurs du Grand
                Nord Cameroun pour promouvoir l&apos;innovation, partager les
                compétences technologiques, et résoudre les défis locaux à
                travers des solutions collaboratives.
              </p>
            </div>

            <blockquote className="relative">
              <svg
                className="absolute top-0 start-0 transform -translate-x-6 -translate-y-8 size-16 text-gray-600"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                  fill="currentColor"
                />
              </svg>

              <div className="relative z-10">
                <p className="text-xl italic text-gray-400">
                  Une communautées des devs formidables avec qui travailler.
                  très rapide et professionnel.
                </p>
              </div>

              <footer className="mt-6">
                <div className="flex items-center gap-x-4">
                  <div className="shrink-0">
                    <img
                      className="size-8 rounded-full object-cover"
                      src="https://bachdev.vercel.app/_image?href=%2F_astro%2Fme.CjM5Kvkr.jpeg&w=768&f=webp"
                      alt="Avatar"
                    />
                  </div>
                  <div className="grow">
                    <div className="font-semibold ">MOHAMED EL BACHIR</div>
                    <div className="text-xs ">
                      Lead Frontend GNDC & CEO Woilasoft
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>

          <div className="mt-10 lg:mt-0 lg:col-span-6 lg:col-end-13">
            <div className="space-y-6 sm:space-y-8">
              <ul className="grid grid-cols-2 divide-y divide-y-2 divide-x divide-x-2 divide-gray-200 overflow-hidden">
                <StatCard
                  number={500}
                  title="Développeurs"
                  description="engagés, unis par la passion de l'innovation."
                />
                <StatCard
                  number={20}
                  title="Projets"
                  description="technologiques concrets ayant un impact positif sur la communauté locale."
                />
                <StatCard
                  number={10}
                  title="Évènements"
                  description="organisés, rassemblant des centaines de participants chaque année."
                />
                <StatCard
                  number={30}
                  title="Initiatives"
                  description="en cours, allant de solutions numériques à des applications innovantes."
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsWithStats;
