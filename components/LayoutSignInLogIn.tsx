import React from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/images/brand/logo.png";
import CoverLogin from "@/assets/images/brand/bg-login.jpg";
function LayoutSignInLogIn({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 relative h-screen">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            loading="lazy"
            src={CoverLogin}
            alt="login cover"
            className="absolute inset-0 h-full w-full bg-primary object-cover"
          />
        </aside>

        <main className="relative h-full flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="absolute top-5 left-5 z-20 flex items-center text-lg font-medium  max-lg:block">
              <span className="sr-only">GNDC</span>
              <a href={"/"}>
                <Image loading="lazy" src={Logo} alt="logo GNDC" width={150} />
              </a>
            </div>
            {children}
            <p className="px-8 text-center text-sm text-muted-foreground mt-5">
              En cliquant sur continuer, vous acceptez nos{" "}
              <Link
                href="/codeofconduct"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termes de Service
              </Link>{" "}
              et notre{" "}
              <Link
                href="/privacypolicy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </main>
      </div>
      {/*
       <div className="container px-5 flex max-lg:mx-auto relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 max-lg:hidden"
          )}
        >
          Se connecter
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900">
            <Image loading="lazy" 
              src={CoverLogin}
              alt="login cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-20 flex items-center text-lg font-medium">
            <span className="sr-only">GNDC</span>
            <Link href={"/"}>
              <Image loading="lazy"  src={Logo} alt="logo GNDC" width={150} />
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-left">
                Communauté des développeurs du Grand Nord Cameroun pour
                promouvoir l&apos;innovation, partager les compétences
                technologiques, et résoudre les défis locaux à travers des
                solutions collaboratives.
              </p>
              <footer className="text-sm">Touza Isaac</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 max-lg:mt-10">
          <div className="absolute top-5 left-5 z-20 flex items-center text-lg font-medium hidden max-lg:block">
            <span className="sr-only">GNDC</span>
            <Link href={"/"}>
              <Image loading="lazy"  src={Logo} alt="logo GNDC" width={150} />
            </Link>
          </div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Créer un compte
              </h1>
              <p className="text-sm text-muted-foreground">
                Entrez votre email pour créer un compte
              </p>
            </div>
            <UserAuthForm />
            <p className="hidden max-lg:block mx-auto text-center">
              {" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Se connecter
              </Link>{" "}
              , si vous aviez déjà un compte
            </p>
            <p className="px-8 text-center text-sm text-muted-foreground">
              En cliquant sur continuer, vous acceptez nos{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termes de Service
              </Link>{" "}
              et notre{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </div> */}
    </section>
  );
}

export default LayoutSignInLogIn;
