import Link from "next/link";
import SignUpForm from "@/components/signup-form";
//import { UserAuthForm } from "@/components/user-auth-form";

export default function AuthenticationPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center mb-2 mt-8">
        <h1 className="text-2xl font-semibold tracking-tight">Bienvenue</h1>
        <p className="text-sm text-muted-foreground mb-2">
          Entrez vos informations pour créer votre compte
        </p>
      </div>
      {/* <UserAuthForm view="sign-up" /> */}
      <SignUpForm />
      <p className="max-lg:block mx-auto text-center mt-2">
        {" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Se connecter
        </Link>{" "}
        , si vous aviez déjà un compte
      </p>
    </>
  );
}
