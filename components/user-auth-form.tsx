"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { GithubIcon, LoaderIcon } from "lucide-react";

interface UserAuthFormProps {
  className?: string;
  action: any;
  children: React.ReactNode;
  defaultEmail?: string;
  view: "sign-up" | "login";
}

export function UserAuthForm({
  className,
  view,
  action,
  children,
  defaultEmail,
}: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6 mt-3", className)}>
      <form action={action}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="votre@mail.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              required
              defaultValue={defaultEmail}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="mot de passe"
              required
            />
          </div>
          {view === "sign-up" && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Confirmation Mot de passe
              </Label>
              <Input
                id="confirm_password"
                type="password"
                placeholder="confirmer votre mot de passe"
                required
              />
            </div>
          )}
          {children}
        </div>
      </form>
      <div className="relative ">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Ou continuez avec
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        className="border border-black text-black hover:bg-black hover:text-white"
        type="button"
      >
        <GithubIcon className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}
