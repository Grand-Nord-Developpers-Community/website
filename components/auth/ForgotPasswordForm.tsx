"use client";
import { passwordResetToken } from "@/lib/api/auth/password-reset";
import {
  PasswordResetTokenValidator,
  passwordResetTokenValidator,
} from "@/lib/validators/auth-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input, Link } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProviderForm } from "./ProviderForm";

export const ForgotPasswordForm = () => {
  const methods = useForm<PasswordResetTokenValidator>({
    resolver: zodResolver(passwordResetTokenValidator),
    values: {
      email: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = methods;

  const passwordResetTokenMutation = useMutation({
    mutationFn: async (input: PasswordResetTokenValidator) => {
      const { data, serverError } = await passwordResetToken({
        email: input.email,
      });
      if (serverError) {
        throw new Error(serverError);
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Password reset link sent");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: PasswordResetTokenValidator) => {
    passwordResetTokenMutation.mutate(data);
  };
  
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex min-h-[40px] flex-col  gap-2 pb-2">
          <p className="text-xl font-medium">Forgot password </p>
          <p className="text-sm text-secondary-foreground">
            Enter your email address and we will send you a link to reset your
            password
          </p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  label="Email Address"
                  type="email"
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("email");
                  }}
                  variant="bordered"
                  placeholder="Enter your email"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              );
            }}
          />
          <Button
            fullWidth
            isLoading={passwordResetTokenMutation.isPending}
            color="primary"
            type="submit">
            Continue
          </Button>
        </form>

        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <ProviderForm />
        <p className="text-center text-small">
          <Link href="/auth/login" size="sm">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

const PasswordResetToken = () => {
  const methods = useForm<PasswordResetTokenValidator>({
    resolver: zodResolver(passwordResetTokenValidator),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    trigger,
  } = methods;

  const passwordResetTokenMutation = useMutation({
    mutationFn: async (input: PasswordResetTokenValidator) => {
      const { data, serverError } = await passwordResetToken({
        email: input.email,
      });
      if (serverError) {
        throw new Error(serverError);
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Password reset link sent");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: PasswordResetTokenValidator) => {
    await passwordResetTokenMutation.mutateAsync(data);
  };

  return <form onSubmit={handleSubmit(onSubmit)}></form>;
};
