"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/brand/logo.png";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  return !pathname.includes("login") ? (
    <header className="sticky z-40 top-0 w-full px-3 py-3 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur dark:border-gray-700/30 dark:bg-gray-900/80">
      <div>
        <span className="sr-only">GNDC</span>
        <Link href={"/"}>
          <Image src={Logo} alt="logo GNDC" width={115} />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <nav className="flex items-center gap-8 text-secondary">
          <Link href={"#"}>Nos activités</Link>
          <Link href={"#"}>Blog</Link>
          <Link href={"#"}>Forum</Link>
          <Link href={"#"}>Formation</Link>
        </nav>
        <Button
          className="ml-5 border border-primary text-secondary"
          variant={"outline"}
          asChild
        >
          <Link href="/sign-in">Créer un compte</Link>
        </Button>
        <Button className="text-white" asChild>
          <Link href="/login">Se connecter</Link>
        </Button>
      </div>
    </header>
  ) : (
    <></>
  );
}

export default Header;
