import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignInSection = () => {
  return (
    <section className="">
      {/* <div className="screen-wrapper">
        <div className='flex items-center justify-center  bg-[url("/circles.svg")] bg-cover bg-center px-8 py-20 text-center md:p-20'>
          <div className="mx-auto max-w-screen-md">
            <h1 className="mb-4 text-balance text-3xl font-semibold md:text-5xl text-primary">
              Rejoindre notre communauté
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Ensemble rendons l&apos; avenir du Grand Nord en technologie bien
              meilleur.
              <span className="max-sm:hidden">
                Soutenez l&apos;innovation technologique dans le Grand Nord
                Cameroun, tout en faisant partie d&apos;un mouvement qui façonne
                l&apos;avenir numérique de la région.
              </span>
            </p>
            <div className="mt-11 flex flex-col justify-center gap-2 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/login">Se connecter</Link>
              </Button>
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/30"
                asChild
              >
                <Link href="/besponsor">Nous sponsoriser</Link>
              </Button>
            </div>
          </div>
        </div>
      </div> */}
      <section className='relative mx-auto max-w-[85rem] px-4 pb-24 pt-10 sm:px-6 lg:px-8 bg-[url("/circles.svg")] bg-cover bg-center'>
        <div className="absolute left-0 top-[55%] scale-90 md:top-[20%] xl:left-[10%] xl:top-[25%]">
          <svg
            width="64"
            height="64"
            fill="none"
            stroke-width="1.5"
            color="#ea580c"
            viewBox="0 0 24 24"
          >
            <path
              fill="#ea580c"
              stroke="#ea580c"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 23a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM3 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM3 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            ></path>
            <path
              stroke="#ea580c"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 7.353v9.294a.6.6 0 0 1-.309.525l-8.4 4.666a.6.6 0 0 1-.582 0l-8.4-4.666A.6.6 0 0 1 3 16.647V7.353a.6.6 0 0 1 .309-.524l8.4-4.667a.6.6 0 0 1 .582 0l8.4 4.667a.6.6 0 0 1 .309.524Z"
            ></path>
            <path
              stroke="#ea580c"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m3.528 7.294 8.18 4.544a.6.6 0 0 0 .583 0l8.209-4.56M12 21v-9"
            ></path>
          </svg>
        </div>
        <div className="absolute left-[85%] top-0 scale-75">
          <svg
            width="64"
            height="64"
            fill="none"
            stroke-width="1.5"
            color="#fbbf24"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#fbbf24"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
            ></path>
            <path
              fill="#fbbf24"
              stroke="#fbbf24"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            ></path>
            <path
              stroke="#fbbf24"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 10.5V9M5 15v-1.5"
            ></path>
            <path
              fill="#fbbf24"
              stroke="#fbbf24"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            ></path>
            <path
              stroke="#fbbf24"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19H9M15 19h-1.5"
            ></path>
          </svg>
        </div>
        <div className="absolute bottom-[5%] left-[60%] scale-[.6] xl:bottom-[15%] xl:left-[35%]">
          <svg
            width="64"
            height="64"
            fill="none"
            stroke-width="1.5"
            color="#a3a3a3"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#a3a3a3"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.164 17c.29-1.049.67-2.052 1.132-3M11.5 7.794A16.838 16.838 0 0 1 14 6.296M4.5 22a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
            ></path>
            <path
              stroke="#a3a3a3"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.5 12a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM19.5 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
            ></path>
          </svg>
        </div>
        <div className="mx-auto mt-5 max-w-xl text-center">
          <h2 className="block text-balance text-4xl font-bold leading-tight tracking-tight dark:text-neutral-200 md:text-5xl lg:text-6xl text-secondary">
            Rejoindre notre communauté
          </h2>
        </div>
        <div className="mx-auto mt-5 max-w-3xl text-center">
          <p className="text-pretty text-lg text-neutral-600 dark:text-neutral-400">
            Ensemble rendons l&apos; avenir du Grand Nord en technologie bien
            meilleur.
            <span className="max-sm:hidden">
              Soutenez l&apos;innovation technologique dans le Grand Nord
              Cameroun, tout en faisant partie d&apos;un mouvement qui façonne
              l&apos;avenir numérique de la région.
            </span>
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Button size="lg" asChild className="max-sm:py-2 max-sm:px-3">
            <Link href="/login">Se connecter</Link>
          </Button>
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 max-sm:py-2 max-sm:px-3"
            asChild
          >
            <Link href="/besponsor">Nous sponsoriser</Link>
          </Button>
        </div>
      </section>
    </section>
  );
};

export default SignInSection;
