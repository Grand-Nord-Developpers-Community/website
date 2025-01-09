"use client";
import { resetPassword } from "@/lib/api/auth/password-reset";
import {
  ResetPasswordValidator,
  resetPasswordValidator,
} from "@/lib/validators/auth-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const methods = useForm<ResetPasswordValidator>({
    resolver: zodResolver(resetPasswordValidator),
    values: {
      password: "",
      token: token || "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const resetPasswordMutation = useMutation({
    mutationFn: async (input: ResetPasswordValidator) => {
      const data = await resetPassword({
        password: input.password,
        token: input.token,
      });

      if (data && data.serverError) {
        throw new Error(data.serverError);
      }
    },
    onSuccess: () => {
      toast.success("Password reset successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: ResetPasswordValidator) => {
    await resetPasswordMutation.mutate(data);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex flex-col min-h-[40px]  gap-2 pb-2">
          <p className="text-xl font-medium">Create a new password</p>
          <p className="text-sm">
            Enter your new password to reset your old password
          </p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  endContent={
                    <button type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <Icon
                          className="pointer-events-none text-2xl text-default-400"
                          icon="solar:eye-bold"
                        />
                      ) : (
                        <Icon
                          className="pointer-events-none text-2xl text-default-400"
                          icon="solar:eye-closed-linear"
                        />
                      )}
                    </button>
                  }
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                />
              );
            }}
          />

          <Button
            isLoading={resetPasswordMutation.isPending}
            fullWidth
            color="primary"
            type="submit">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};
