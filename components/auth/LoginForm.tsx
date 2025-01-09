"use client";

import { loginWithMagicLink, loginWithPassword } from "@/lib/api/auth/login";
import { LoginValitor, loginValidator } from "@/lib/validators/auth-validator";
import { PinInput } from "@ark-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Button, Divider, Input, Link, Tooltip, cn } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useStep } from "usehooks-ts";
import { ProviderForm } from "./ProviderForm";

const variants = {
  enter: (direction: number) => ({
    x: direction > 1 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 1 ? 20 : -20,
    opacity: 0,
  }),
};

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, helpers] = useStep(3);
  const { goToNextStep, goToPrevStep } = helpers;
  const router = useRouter();
  const toggleVisibility = () => setIsVisible(!isVisible);

  const methods = useForm<LoginValitor>({
    resolver: zodResolver(loginValidator),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    trigger,
  } = methods;

  const magicLinkMutation = useMutation({
    mutationFn: async (input: LoginValitor) => {
      const { data, serverError } = await loginWithMagicLink(input);
      if (serverError) {
        throw new Error(serverError);
      }
      if (data?.redirectUrl) {
        router.push(data.redirectUrl);
      }
    },
    onError: (error) => {
      toast.error(error.message ?? "An error occurred");
    },
  });
  const passwordMutation = useMutation({
    mutationFn: async (input: LoginValitor) => {
      const { data, serverError } = await loginWithPassword(input);
      if (serverError) {
        throw new Error(serverError);
      }
      if (data?.isTwoFactor) {
        goToNextStep();
      }
      if (data?.redirectUrl) {
        router.push(data.redirectUrl);
      }
    },
    onError: (error) => {
      toast.error(error.message ?? "An error occurred");
    },
  });

  const onSubmit = (data: LoginValitor) => {
    if (data.withPassword) {
      passwordMutation.mutate(data);
    } else {
      magicLinkMutation.mutate(data);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex min-h-[40px] items-center gap-2 pb-2">
          {currentStep > 1 && (
            <Tooltip content="Go back" delay={3000}>
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                onPress={() => {
                  goToPrevStep();
                  setValue("withPassword", false);
                }}>
                <Icon
                  className="text-default-500"
                  icon="solar:alt-arrow-left-linear"
                  width={16}
                />
              </Button>
            </Tooltip>
          )}
          <p className="text-xl font-medium">Log In</p>
        </div>
        <AnimatePresence custom={currentStep} initial={false} mode="wait">
          <motion.form
            key={currentStep}
            animate="center"
            className="flex flex-col gap-3"
            custom={currentStep}
            exit="exit"
            initial="enter"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            variants={variants}
            onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 1 ? (
              <>
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
                  isLoading={magicLinkMutation.isPending}
                  color="primary"
                  type="submit"
                  onPress={() => {
                    setValue("withPassword", false);
                  }}>
                  Log In with Email
                </Button>

                <Button
                  onPress={async () => {
                    setValue("withPassword", true);
                    const isValid = await trigger("email");
                    isValid && goToNextStep();
                  }}
                  fullWidth
                  color="default"
                  variant="flat">
                  continue with password
                </Button>
              </>
            ) : currentStep === 2 ? (
              <>
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
                <Link
                  className="text-default-500"
                  href="/auth/forgot-password"
                  size="sm">
                  Forgot password?
                </Link>
                <Button
                  isLoading={passwordMutation.isPending}
                  fullWidth
                  color="primary"
                  type="submit">
                  Log In
                </Button>
              </>
            ) : (
              <>
                <Controller
                  control={control}
                  name="code"
                  render={({ field }) => {
                    return (
                      <div className="">
                        <PinInput.Root
                          value={field.value}
                          onValueChange={(value) => field.onChange(value.value)}
                          className="space-y-3 group data-[invalid]:border-red-300 "
                          otp
                          form="verify-email-form"
                          id="code"
                          invalid={!!errors.code}
                          type="numeric"
                          disabled={passwordMutation.isPending}
                          blurOnComplete
                          onValueComplete={(e) => {
                            console.log(e);
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
                        </PinInput.Root>
                      </div>
                    );
                  }}
                />

                <Button
                  type="submit"
                  isLoading={passwordMutation.isPending}
                  fullWidth
                  color="primary">
                  Verify
                </Button>
              </>
            )}
          </motion.form>
        </AnimatePresence>

        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <ProviderForm />
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href="/auth/register" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
