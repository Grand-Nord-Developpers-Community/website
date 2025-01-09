"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  disableTwoFactorAuth,
  enableTwoFactorAuth,
} from "@/lib/api/auth/two-factor-authentication";
import { createOtpCode } from "@/lib/auth/utils";
import {
  twoFactorAuthValidator,
  TwoFactorAuthValidator,
} from "@/lib/validators/auth-validator";
import { PinInput } from "@ark-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, cn } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {};
export const TwoFactorAuthForm = ({}: Props) => {
  const { user } = useCurrentUser();
  const [values, setValues] = useState(createOtpCode(user?.email!));
  //user?.setupTwoFactor||
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const { secret, uri } = values;

  const methods = useForm<TwoFactorAuthValidator>({
    resolver: zodResolver(twoFactorAuthValidator),
    values: {
      code: [],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: TwoFactorAuthValidator) => {
    console.log(data);
    enableTwoFactorAuthMutation.mutate(data);
  };

  const enableTwoFactorAuthMutation = useMutation({
    mutationFn: async (input: TwoFactorAuthValidator) => {
      const { data, serverError } = await enableTwoFactorAuth({
        code: input.code.join(""),
        secret,
      });
      if (serverError) {
        throw new Error(serverError);
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success("2FA enabled");
      setIs2faEnabled(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const remove2faMutation = useMutation({
    mutationFn: async () => {
      await disableTwoFactorAuth();
    },
    onSuccess: () => {
      toast.success("2FA disabled");
      setIs2faEnabled(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      {is2faEnabled ? (
        <div className="">
          <p>2FA is enabled</p>
          <Button
            variant="bordered"
            fullWidth
            isLoading={remove2faMutation.isPending}
            color="primary"
            onClick={() => remove2faMutation.mutate()}>
            Disable 2FA
          </Button>
        </div>
      ) : (
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
          <div className="flex flex-col min-h-[40px]  gap-2 pb-2">
            <p className="text-xl font-medium">Set up two factor auth (2FA)</p>
            <p className="text-sm">
              to authorize transaction scan the QR code with your authenticator
            </p>
          </div>
          <div className="flex justify-center">
            <QRCodeSVG
              value={uri}
              bgColor={"#ffffff"}
              fgColor={"#383838"}
              level={"L"}
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8">
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
                      disabled={enableTwoFactorAuthMutation.isPending}
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

            <div className="flex items-center gap-6">
              <Button
                variant="bordered"
                isDisabled={enableTwoFactorAuthMutation.isPending}
                fullWidth
                color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={enableTwoFactorAuthMutation.isPending}
                fullWidth
                color="primary">
                Verify
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
