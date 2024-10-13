import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import {
  BellIcon,
  Building2Icon,
  NewspaperIcon,
  Share2Icon,
} from "lucide-react";
import Globe from "@/components/Globe";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import NumberTicker from "@/components/ui/number-ticker";
// import { Calendar } from "@/components/ui/calendar";
// import AnimatedBeamMultipleOutputDemo from "@/components/example/animated-beam-multiple-outputs";
// import AnimatedListDemo from "@/components/example/animated-list-demo";
// import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
// import Marquee from "@/components/magicui/marquee";

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    classNameName: "col-span-3 lg:col-span-1",
    background: (
      //   <Marquee
      //     pauseOnHover
      //     classNameName="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      //   >
      //     {files.map((f, idx) => (
      //       <figure
      //         key={idx}
      //         classNameName={cn(
      //           "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
      //           "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      //           "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      //           "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
      //         )}
      //       >
      //         <div classNameName="flex flex-row items-center gap-2">
      //           <div classNameName="flex flex-col">
      //             <figcaption classNameName="text-sm font-medium dark:text-white ">
      //               {f.name}
      //             </figcaption>
      //           </div>
      //         </div>
      //         <blockquote classNameName="mt-2 text-xs">{f.body}</blockquote>
      //       </figure>
      //     ))}
      //   </Marquee>
      <></>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    classNameName: "col-span-3 lg:col-span-2",
    background: (
      //   <AnimatedListDemo classNameName="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
      <></>
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Learn more",
    classNameName: "col-span-3 lg:col-span-2",
    background: (
      //   <AnimatedBeamMultipleOutputDemo classNameName="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
      <></>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    classNameName: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      //   <Calendar
      //     mode="single"
      //     selected={new Date(2022, 4, 11, 0, 0, 0)}
      //     classNameName="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      //   />
      <></>
    ),
  },
];
/*
       <BentoGrid classNameName="screen-wrapper my-12 lg:max-w-screen-lg">
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid> 
      */
export default function BentoSection() {
  return (
    <div className="screen-wrapper">
      <div className="w-full grid grid-cols-12 gap-4 xl:gap-6">
        <div className="col-span-12 md:col-span-6 md:order-2 lg:col-span-4 grid gap-4 xl:gap-6">
          <a
            className="md:order-1 relative focus:outline-none before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition before:hover:border-2 before:hover:border-secondary before:focus:border-2 before:focus:border-secondary before:hover:shadow-lg dark:before:border-neutral-800 dark:before:hover:border-blue-500 dark:before:focus:border-blue-500 dark:rounded-xl"
            href="/sign-in"
          >
            <div className="relative overflow-hidden size-full rounded-xl">
              <div className="p-6 flex flex-col justify-center items-center md:min-h-[480px] text-center rounded-xl dark:border-neutral-700">
                <p className="text-primary text-xs font-semibold uppercase">
                  Plus de
                </p>
                <span className=" text-primary  text-7xl font-bold">
                  <NumberTicker value={500} />+
                </span>
                <h3 className="mt-6 text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200">
                  Membres
                </h3>
                <p className="mt-2 text-gray-500 dark:text-neutral-400">
                  Réjoignez nous maintenant pour construire le futur du Grand
                  Nord
                </p>
                <p className="mt-6 inline-flex justify-center items-center gap-x-1 text-center bg-secondary hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-lg py-3 px-4">
                  Créer un compte
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </p>
              </div>

              <div className="absolute top-0 start-full -z-[1] w-60 h-20 bg-blue-100 blur-[100px] -translate-y-full -translate-x-1/2 dark:bg-blue-900/30"></div>
              <div className="absolute top-0 start-full -z-[1] w-60 h-20 bg-purple-100 blur-[100px] -translate-y-full -translate-x-1/2 dark:bg-violet-900/30"></div>
              <div className="absolute top-1/2 start-1/2 -z-[1] w-60 h-32 bg-purple-100 blur-[100px] -translate-y-1/2 -translate-x-1/2 dark:bg-violet-900/30"></div>
              <div className="absolute -bottom-40 -end-24 -z-[1] w-60 h-32 bg-blue-200 blur-[100px] dark:bg-blue-900/70"></div>
              <div className="absolute -bottom-[635px] -end-[635px] -z-[1] size-[635px] border border-dashed border-violet-200 rounded-full transform -translate-y-[255px] -translate-x-[310px] opacity-40 dark:border-violet-900/60"></div>
              <div className="absolute -bottom-[490px] -end-[490px] -z-[1] w-[490px] h-[490px] border border-dashed border-violet-200 rounded-full transform -translate-y-[190px] -translate-x-[240px] opacity-60 dark:border-violet-900/60"></div>
              <div className="absolute -bottom-[340px] -end-[340px] -z-[1] w-[340px] h-[340px] border border-dashed border-violet-200 rounded-full transform -translate-y-[120px] -translate-x-[170px] opacity-80 dark:border-violet-900/60"></div>
              <div className="absolute -bottom-[200px] -end-[200px] -z-[1] w-[200px] h-[200px] border border-dashed border-violet-200 rounded-full transform -translate-y-[60px] -translate-x-[100px] dark:border-violet-900/60"></div>
            </div>
          </a>

          <a
            className="md:order-2 relative focus:outline-none p-6 flex flex-col justify-center items-center md:min-h-[230px] text-center rounded-xl before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition before:hover:border-2 before:hover:border-secondary before:focus:border-2 before:focus:border-secondary before:hover:shadow-lg dark:before:border-neutral-800 dark:before:hover:border-blue-500 dark:before:focus:border-blue-500 dark:rounded-xl"
            href="/events"
          >
            <CalendarIcon className="shrink-0 size-10 mb-3 text-secondary" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200">
              Nos évènemenets
            </h3>
            <p className="mt-2 text-gray-500 dark:text-neutral-400">
              nous organisons des évènements telque hachathon et atélier
              pratique, rassemblant des centaines de participants chaque année.
            </p>
            <p className="mt-2 inline-flex items-center gap-x-1 text-secondary font-medium dark:text-blue-500">
              Voir le prochain évènement
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </p>
          </a>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 md:order-1 grid gap-4 xl:gap-6">
          <a className="md:order-2 relative focus:outline-none" href="/hire-us">
            <div className="overflow-hidden p-6 flex flex-col justify-between items-center md:min-h-[480px] text-center rounded-xl before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition before:hover:border-2 before:hover:border-secondary before:focus:border-2 before:focus:border-secondary before:hover:shadow-lg dark:before:border-neutral-800 dark:before:hover:border-blue-500 dark:before:focus:border-blue-500">
              <div className="flex justify-center relative w-full h-[258px] before:absolute before:top-0 before:-inset-x-6  before:bg-no-repeat before:bg-center before:bg-cover before:w-[calc(100%+48px)] before:h-full before:-z-[1] lg:before:bg-auto">
                <Globe />
              </div>

              <div className="mt-8">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200">
                  Notre expertise
                </h3>
                <p className="mt-2 text-gray-500 dark:text-neutral-400">
                  La GNDC régroupe des experts dans plusieurs domaines et
                  secteurs d&apos;activité technologiques près à innover
                </p>
                <p className="mt-2 inline-flex items-center gap-x-1 text-secondary font-medium dark:text-blue-500">
                  Embaucher un membre
                  <svg
                    className="size-2.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </p>
              </div>
            </div>

            <div className="absolute top-0 end-0 -z-[1] w-70 h-auto">
              <svg
                width="384"
                height="268"
                viewBox="0 0 384 268"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_f_6966_190390)">
                  <rect
                    x="200.667"
                    y="-57"
                    width="240.294"
                    height="124.936"
                    fill="#E2CCFF"
                    fill-opacity="0.35"
                  ></rect>
                </g>
                <defs>
                  <filter
                    id="filter0_f_6966_190390"
                    x="0.666687"
                    y="-257"
                    width="640.294"
                    height="524.936"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood
                      flood-opacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    ></feBlend>
                    <feGaussianBlur
                      stdDeviation="100"
                      result="effect1_foregroundBlur_6966_190390"
                    ></feGaussianBlur>
                  </filter>
                </defs>
              </svg>
            </div>
          </a>

          <a
            className="lg:mt-20 md:order-1 relative focus:outline-none p-6 flex flex-col justify-center items-center md:min-h-[230px] text-center rounded-xl before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition before:hover:border-2 before:hover:border-secondary before:focus:border-2 before:focus:border-secondary before:hover:shadow-lg dark:before:border-neutral-800 dark:before:hover:border-blue-500 dark:before:focus:border-blue-500 dark:rounded-xl"
            href="/be-sponsor"
          >
            <Building2Icon
              className="shrink-0 size-10 mb-3 mx-auto text-secondary"
              strokeWidth={1}
            />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200">
              10+ Entréprises
            </h3>
            <p className="mt-2 text-gray-500 dark:text-neutral-400">
              Notre communauté s&apos;associe à des entreprises, pour innover.
            </p>
            <p className="mt-2 inline-flex items-center gap-x-1 text-secondary font-medium dark:text-blue-500">
              Dévenir sponsor
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </p>
          </a>
        </div>

        <div className="col-span-12 lg:col-span-4 md:order-3 grid md:grid-cols-2 lg:grid-cols-1 gap-4 xl:gap-6">
          <a
            className="md:order-2 relative focus:outline-none before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition before:hover:border-2 before:hover:border-secondary before:focus:border-2 before:focus:border-secondary before:hover:shadow-lg after:absolute after:inset-x-0.5 after:bottom-0.5 after:z-10 after:w-[calc(100%-4px)] after:h-24 after:rounded-b-xl after:bg-gradient-to-t after:from-white after:via-white/90 after:to-white/40 dark:after:from-neutral-900 dark:after:via-neutral-900/90 dark:after:to-neutral-900/40 dark:before:border-neutral-800 dark:before:hover:border-blue-500 dark:before:focus:border-blue-500 dark:rounded-xl"
            href="/projects"
          >
            <div className="relative overflow-hidden size-full rounded-xl">
              <div className="flex flex-col justify-between md:min-h-[480px] text-center rounded-xl dark:border-neutral-700">
                <div className="p-6">
                  <svg
                    className="shrink-0 size-10 mb-3 mx-auto"
                    width="46"
                    height="46"
                    viewBox="0 0 46 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 17V39"
                      stroke="var(--secondary-color)"
                      stroke-width="2"
                    ></path>
                    <path
                      d="M6 17H40"
                      stroke="var(--secondary-color)"
                      stroke-width="2"
                    ></path>
                    <rect
                      x="6"
                      y="6"
                      width="34"
                      height="34"
                      rx="5"
                      stroke="var(--secondary-color)"
                      stroke-width="2"
                    ></rect>
                  </svg>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200">
                    Nos projets
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-neutral-400">
                    Nos solutions technologiques concrets ayant un impact
                    positif sur la communauté locale
                  </p>
                  <p className="mt-2 inline-flex items-center gap-x-1 text-secondary font-medium dark:text-blue-500">
                    Voir tout
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </p>
                </div>

                <img
                  className="w-10/12 ms-auto dark:hidden"
                  src="assets/others/templates.webp"
                  alt="Templates"
                />
              </div>

              <div className="absolute top-1/2 -start-1/2 -z-[1] w-60 h-32 bg-purple-200 blur-[100px] -translate-y-1/2 dark:bg-violet-900/30"></div>
            </div>
          </a>

          <a
            className="lg:mt-20 md:order-1 relative focus:outline-none p-6 flex flex-col justify-center items-center md:min-h-[230px] text-center rounded-xl before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition before:hover:border-2 before:hover:border-secondary before:focus:border-2 before:focus:border-secondary before:hover:shadow-lg dark:before:border-neutral-800 dark:before:hover:border-blue-500 dark:before:focus:border-blue-500 dark:rounded-xl"
            href="/blog"
          >
            <NewspaperIcon
              className="shrink-0 size-10 mb-3 mx-auto text-secondary"
              strokeWidth={1}
            />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200">
              Publications populaires
            </h3>
            <p className="mt-2 text-gray-500 dark:text-neutral-400">
              Decouvrez nos articles populaires pour vous tenir informé des
              dernières tendances
            </p>
            <p className="mt-2 inline-flex items-center gap-x-1 text-secondary font-medium dark:text-blue-500">
              Voir plus
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
