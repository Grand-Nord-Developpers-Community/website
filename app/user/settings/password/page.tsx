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

  return (
    <Form {...form}>
      <div>
        <h2 className="text-xl font-semibold mb-2">Mot de passe</h2>
        <p className="text-gray-600 mb-4">
          Vous devez renseigner votre mot de passe actuel pour changer de mot de
          passe.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-md"
        noValidate
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe actuel</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
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
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input type="password" {...field} autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmez le mot de passe</FormLabel>
              <FormControl>
                <Input type="password" {...field} autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          Mettre à jour le mot de passe
        </Button>
      </form>
    </Form>
  );
}
