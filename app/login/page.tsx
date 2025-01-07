import { Metadata } from "next";
import Link from "next/link";

import SignIn from "@/components/signin-form";
export const metadata: Metadata = {
  title: "GNDC | Connexion",
  description: "Inscription dans la plus grande communauté Tech du Grand Nord",
};

export default function AuthenticationPage(props: {
  searchParams: { callbackUrl: string | undefined }
}) {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center mb-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Connectez-vous
        </h1>
        <p className="text-sm text-muted-foreground mb-2">
          Entrez vos informations
        </p>
      </div>
      <SignIn props={props}/>
      <p className="max-lg:block mx-auto text-center mt-2">
        {" "}
        <Link
          href="/sign-up"
          className="underline underline-offset-4 hover:text-primary"
        >
          Créer
        </Link>{" "}
        , si vous n&apos;aviez pas déjà un compte
      </p>
    </>
  );
}
