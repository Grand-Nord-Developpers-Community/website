"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  UpdatePasswordInput,
  updatePasswordSchema,
} from "@/schemas/password-schema";
import { updateUserPassword } from "@/actions/user.actions";
import { useUserSettings } from "../(common)/user-setting-context";

export default function PasswordForm() {
  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const { user } = useUserSettings();
  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
    reset,
  } = form;

  const onSubmit = async (values: UpdatePasswordInput) => {
    try {
      const res = await updateUserPassword(user!.id!, values);

      if (!res.success) {
        if (res.revalidate === "currentPassword") {
          setError("currentPassword", { message: res.message });
        } else {
          toast.error(res.message);
        }
        return;
      }

      toast.success("Mot de passe mis à jour avec succès");
      reset();
    } catch (e) {
      toast.error(e as string);
    }
  };
  const isUserHasOauthAccount = user?.oauthAccounts.length! > 0;

  return (
    <Form {...form}>
      <div>
        {isUserHasOauthAccount && (
          <>
            <div className="mb-4">
              <div className="flex items-start gap-2 rounded-md border border-destructive bg-destructive/10 p-4">
                <svg
                  className="h-5 w-5 text-destructive mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-destructive">
                    Vous ne pouvez pas changer votre mot de passe car vous
                    utilisez un compte OAuth.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pour changer votre mot de passe, veuillez d&apos;abord
                    dissocier votre compte OAuth.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        <h2 className="text-xl font-semibold mb-2">Mot de passe</h2>
        <p className="text-muted-foreground mb-4">
          Vous devez renseigner votre mot de passe actuel pour changer de mot de
          passe.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full"
        noValidate
      >
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Mot de passe actuel</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    disabled={isUserHasOauthAccount}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Nouveau mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    disabled={isUserHasOauthAccount}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmez le mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  disabled={isUserHasOauthAccount}
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting || isUserHasOauthAccount}>
          Mettre à jour le mot de passe
        </Button>
      </form>
    </Form>
  );
}
