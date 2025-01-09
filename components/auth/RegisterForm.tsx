"use client";

import { register } from "@/lib/api/auth/register";
import {
  RegisterValidator,
  registerValidator,
} from "@/lib/validators/auth-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Button, Divider, Input, Link, Tooltip } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProviderForm } from "./ProviderForm";
import { useState } from "react";
import { useStep } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";

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

export default function RegisterForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, helpers] = useStep(2);
  const { goToNextStep, goToPrevStep } = helpers;

  const toggleVisibility = () => setIsVisible(!isVisible);

  const methods = useForm<RegisterValidator>({
    resolver: zodResolver(registerValidator),
    values: {
      email: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    setValue,
  } = methods;

  const registerMutation = useMutation({
    mutationFn: async (input: RegisterValidator) => {
      const data = await register({
        email: input.email,
        password: input.password,
      });
      if (data && data.serverError) {
        throw new Error(data.serverError);
      }
    },
    onSuccess: () => {
      toast.success(
        "you have been registered successfully, please check your email"
      );
    },
    onError: (error) => {
      toast.error(error.message ?? "An error occurred");
    },
  });

  const onSubmit = (data: RegisterValidator) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex min-h-[40px] items-center gap-2 pb-2">
          {currentStep === 2 && (
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
          <p className="text-xl font-medium">Sign Up</p>
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
                  color="primary"
                  type="submit"
                  isLoading={registerMutation.isPending}
                  onPress={() => {
                    setValue("withPassword", false);
                  }}>
                  Sign Up with Email
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
            ) : (
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

                <Button
                  isLoading={registerMutation.isPending}
                  fullWidth
                  color="primary"
                  type="submit">
                  Sign Up
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
          Already have an account?&nbsp;
          <Link href="/auth/login" size="sm">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
