"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyEmail } from "@/lib/api/auth/verify-email";
import { loginWithMagicLink } from "@/lib/api/auth/login";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const VerifyEmailForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const result = await verifyEmail({ code: data.pin });
      if (result && result.serverError) {
        throw new Error(result.serverError);
      }
      toast.success("Email verified successfully");
    } catch (error: any) {
      toast.error(error.message);
      form.setError("pin", { type: "manual", message: error.message });
    }
  }

  const handleResendCode = async () => {
    const email = new URLSearchParams(window.location.search).get("email");
    if (!email) {
      return toast.error("Email not found");
    }

    try {
      const result = await loginWithMagicLink({ email, withoutRedirect: true });
      if (result && result.serverError) {
        throw new Error(result.serverError);
      }
      toast.success("Verification code sent successfully");
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Verify
        </Button>

        <Button
          type="button"
          onClick={handleResendCode}
          className="w-full"
          variant="outline"
        >
          Resend Code
        </Button>
      </form>
    </Form>
  );
};
