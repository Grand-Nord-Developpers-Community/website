"use client";
import { Metadata } from "next";
import Link from "next/link";
<<<<<<< HEAD
import { UserAuthForm } from "@/components/user-auth-form";
import { useRouter } from "next/navigation";
import { useState, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { LoginActionState, login } from "@/app/lib/auth/action";
import { SubmitButton } from "@/components/submit-button-form";

// export const metadata: Metadata = {
//   title: "GNDC | Inscription",
//   description: "Inscription dans la plus grande communauté Tech du Grand Nord",
// };
=======

import SignIn from "@/components/signin-form";
export const metadata: Metadata = {
  title: "GNDC | Connexion",
  description: "Inscription dans la plus grande communauté Tech du Grand Nord",
};
>>>>>>> 6df20023aa48dd63e7e2c311d70542d107e348db

export default function AuthenticationPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: "idle",
    }
  );

  useEffect(() => {
    if (state.status === "failed") {
      toast.error("Invalid credentials!");
    } else if (state.status === "invalid_data") {
      toast.error("Failed validating your submission!");
    } else if (state.status === "success") {
      router.refresh();
    }
  }, [state.status, router]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

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
<<<<<<< HEAD
      <UserAuthForm view="login" action={handleSubmit} defaultEmail={email}>
        <SubmitButton>Se connecter</SubmitButton>
      </UserAuthForm>
=======
      <SignIn/>
>>>>>>> 6df20023aa48dd63e7e2c311d70542d107e348db
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
