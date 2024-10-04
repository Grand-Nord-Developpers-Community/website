import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-form";
import Logo from "@/assets/images/brand/logo.png";
import CoverLogin from "@/assets/images/slider/bg.jpg";
export const metadata: Metadata = {
  title: "GNDC | Inscription",
  description: "Inscription dans la plus grande communauté Tech du Grand Nord",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container px-5 flex max-lg:mx-auto relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 max-lg:hidden",
          )}
        >
          Se connecter
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900">
            <Image
              src={CoverLogin}
              alt="login cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-20 flex items-center text-lg font-medium">
            <span className="sr-only">GNDC</span>
            <Link href={"/"}>
              <Image src={Logo} alt="logo GNDC" width={150} />
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-left">
                &ldquo;Communautés des développeurs du Grand Nord Cameroun pour
                promouvoir l&apos;innovation, partager les compétences
                technologiques, et résoudre les défis locaux à travers des
                solutions collaboratives.&rdquo;
              </p>
              <footer className="text-sm">Touza Isaac</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 max-lg:mt-10">
          <div className="absolute top-5 left-5 z-20 flex items-center text-lg font-medium hidden max-lg:block">
            <span className="sr-only">GNDC</span>
            <Link href={"/"}>
              <Image src={Logo} alt="logo GNDC" width={150} />
            </Link>
          </div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Créer un compte
              </h1>
              <p className="text-sm text-muted-foreground">
                Entrez votre email pour crée un compte
              </p>
            </div>
            <UserAuthForm />
            <p className="hidden max-lg:block mx-auto">
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
              En cliquant sur continuez, vous acceptez notre{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms de Service
              </Link>{" "}
              et{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Politique privée
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
