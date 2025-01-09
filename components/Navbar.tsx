"use client";

import type { NavbarProps } from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import {
  Button,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NavbarUi
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { useSession } from "./auth/SessionProvider";


export default function Navbar(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { session,user } = useSession();

  return (
    <NavbarUi
      {...props}
      classNames={{
        base: cn("border-default-100 z-[1] ", {
          "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
        }),
        wrapper: "w-full justify-center",
        item: "hidden md:flex",
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}>
      {/* Left Content */}
      <NavbarBrand as={Link} href={"/"}>
        <div className="">
          <Image
            src="/images/logo-white.webp"
            alt="acme"
            width={100}
            height={50}
          />
        </div>
        <span className="sr-only">ACME</span>
      </NavbarBrand>

      {/* Right Content */}
      <NavbarContent className="hidden md:flex" justify="end">
        {session ? (
          <><NavbarItem className="ml-2 !flex gap-2">
            <Button
              as={Link}
              href={`/protected`}
              className="bg-foreground font-medium text-background"
              color="secondary"
              endContent={<Icon icon="solar:alt-arrow-right-linear" />}
              variant="flat">
              Dashboard
            </Button>
          </NavbarItem>
          <img src={user.image??""}/>
          </>
        ) : (
          <NavbarItem className="ml-2 !flex gap-2">
            <Button
              as={Link}
              href={`/auth/login`}
              className="text-default-500"
              variant="light">
              Login
            </Button>
            <Button
              as={Link}
              href={`/auth/register`}
              className="bg-foreground font-medium text-background"
              color="secondary"
              endContent={<Icon icon="solar:alt-arrow-right-linear" />}
              variant="flat">
              Get Started
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu
        className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        motionProps={{
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: {
            ease: "easeInOut",
            duration: 0.2,
          },
        }}>
        {session ? (
          <NavbarMenuItem className="">
            <Button
              fullWidth
              as={Link}
              href={`/protected`}
              className="bg-foreground font-medium text-background"
              color="secondary"
              endContent={<Icon icon="solar:alt-arrow-right-linear" />}
              variant="flat">
              Dashboard
            </Button>
          </NavbarMenuItem>
        ) : (
          <>
            <NavbarMenuItem className="">
              <Button
                fullWidth
                as={Link}
                href={`/auth/login`}
                className="text-default-500"
                variant="light">
                Login
              </Button>
            </NavbarMenuItem>
            <NavbarMenuItem className="">
              <Button
                fullWidth
                as={Link}
                href={`/auth/register`}
                className="bg-foreground font-medium text-background"
                color="secondary"
                endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                variant="flat">
                Get Started
              </Button>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </NavbarUi>
  );
}
