<<<<<<< HEAD
"use client";
import { Metadata } from "next";
import Link from "next/link";
import { UserAuthForm } from "@/components/user-auth-form";
import { useRouter } from "next/navigation";
import { useState, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { SubmitButton } from "@/components/submit-button-form";
// export const metadata: Metadata = {
//   title: "GNDC | Inscription",
//   description: "Inscription dans la plus grande communauté Tech du Grand Nord",
// };
import { register, RegisterActionState } from "@/app/lib/auth/action";
export default function AuthenticationPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: "idle",
    }
  );

  useEffect(() => {
    if (state.status === "user_exists") {
      toast.error("Account already exists");
    } else if (state.status === "failed") {
      toast.error("Failed to create account");
    } else if (state.status === "invalid_data") {
      toast.error("Failed validating your submission!");
    } else if (state.status === "success") {
      toast.success("Account created successfully");
      router.refresh();
    }
  }, [state, router]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

=======
import Link from "next/link";
import SignUpForm from "@/components/signup-form";
//import { UserAuthForm } from "@/components/user-auth-form";

export default function AuthenticationPage() {
>>>>>>> 6df20023aa48dd63e7e2c311d70542d107e348db
  return (
    <>
      <div className="flex flex-col space-y-2 text-center mb-2 mt-8">
        <h1 className="text-2xl font-semibold tracking-tight">Bienvenue</h1>
        <p className="text-sm text-muted-foreground mb-2">
          Entrez vos informations pour créer votre compte
        </p>
      </div>
<<<<<<< HEAD
      <UserAuthForm view="sign-up" action={handleSubmit} defaultEmail={email}>
        <SubmitButton>Creez mon compte</SubmitButton>
      </UserAuthForm>
=======
      {/* <UserAuthForm view="sign-up" /> */}
      <SignUpForm />
>>>>>>> 6df20023aa48dd63e7e2c311d70542d107e348db
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
