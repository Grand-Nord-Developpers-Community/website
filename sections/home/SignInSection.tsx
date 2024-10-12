import { Button } from "@/components/ui/button";

const SignInSection = () => {
  return (
    <section className="">
      <div className="screen-wrapper">
        <div className='flex items-center justify-center  bg-[url("/circles.svg")] bg-cover bg-center px-8 py-20 text-center md:p-20'>
          <div className="mx-auto max-w-screen-md">
            <h1 className="mb-4 text-balance text-3xl font-semibold md:text-5xl">
              Rejoindre notre communauté
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Ensemble rendons l&apos; avenir du Grand Nord en technologie bien
              meilleur. soutenez l&apos;innovation technologique dans le Grand
              Nord Cameroun, tout en faisant partie d&apos;un mouvement qui
              façonne l&apos;avenir numérique de la région.
            </p>
            <div className="mt-11 flex flex-col justify-center gap-2 sm:flex-row">
              <Button size="lg">Se connecter</Button>
              <Button size="lg" variant="outline">
                Nous sponsoriser
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInSection;
