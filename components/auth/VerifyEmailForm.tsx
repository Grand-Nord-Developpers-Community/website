"use client";
import { loginWithMagicLink } from "@/lib/api/auth/login";
import { verifyEmail } from "@/lib/api/auth/verify-email";
import {
  LoginValitor,
  VerifyEmailValidator,
  verifyEmailValidator,
} from "@/lib/validators/auth-validator";
import { PinInput } from "@ark-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, cn } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const VerifyEmailForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const methods = useForm<VerifyEmailValidator>({
    resolver: zodResolver(verifyEmailValidator),
    values: {
      code: [],
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    reset,
  } = methods;

  const onSubmit = (data: VerifyEmailValidator) => {
    verificationMutation.mutate(data.code.join(""));
  };

  const verificationMutation = useMutation({
    mutationFn: async (code: string) => {
      const data = await verifyEmail({ code });
      if (data && data.serverError) {
        throw new Error(data.serverError);
      }
    },
    onError: (error) => {
      toast.error(error.message);
      setError("code", {
        type: "manual",
        message: error.message,
      });
    },
    onSuccess: () => {
      toast.success("Email verified successfully");
    },
  });

  const magicLinkMutation = useMutation({
    mutationFn: async (input: LoginValitor) => {
      const data = await loginWithMagicLink(input);
      if (data && data.serverError) {
        throw new Error(data.serverError);
      }
    },
    onError: (error) => {
      toast.error(error.message ?? "An error occurred");
    },
  });

  const handleResendCode = () => {
    if (!email) return toast.error("Email not found");
    magicLinkMutation.mutate(
      {
        email: email,
        withoutRedirect: true,
      },
      {
        onSuccess: () => {
          toast.success("Verification code sent successfully");
          reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <form
      id="verify-email-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2">
      <div className="space-y-2">
        <Controller
          control={control}
          name="code"
          render={({ field }) => {
            return (
              <PinInput.Root
                value={field.value}
                onValueChange={(value) => field.onChange(value.value)}
                data-test={true}
                className="space-y-3 group data-[invalid]:border-red-300 "
                otp
                form="verify-email-form"
                id="code"
                invalid={!!errors.code}
                type="numeric"
                disabled={verificationMutation.isPending}
                blurOnComplete
                onValueComplete={(e) => {
                  console.log(e);
                  setTimeout(() => {
                    submitButtonRef.current?.click();
                  }, 10);
                }}>
                <PinInput.Label>Verification code</PinInput.Label>
                <PinInput.Control className="flex items-center gap-1.5">
                  {Array.from(Array(6)).map((id, index) => (
                    <PinInput.Input
                      key={index}
                      index={index}
                      className={cn(
                        "aspect-square h-11 w-11 text-center group-data-[invalid]:!border-danger group-data-[invalid]:text-danger",
                        "w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none rounded-medium",
                        [
                          "border-medium",
                          "border-default-200",
                          "data-[hover=true]:border-default-400",
                          "group-data-[focus=true]:border-default-foreground",
                        ]
                      )}></PinInput.Input>
                  ))}
                </PinInput.Control>
                <p className="text-danger">{errors.code?.message}</p>
              </PinInput.Root>
            );
          }}
        />
      </div>
      <Button
      color="primary"
        ref={submitButtonRef}
        type="submit"
        className="w-full"
        isLoading={verificationMutation.isPending}>
        Verify
      </Button>
      <Button
        onPress={handleResendCode}
        isDisabled={verificationMutation.isPending}
        isLoading={magicLinkMutation.isPending}
        className="w-full"
        variant="bordered">
        Resend code
      </Button>
    </form>
  );
};
