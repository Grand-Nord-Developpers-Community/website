"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/brand/logo.png";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

const Links = [
  {
    name: "Nos activités",
    link: "/events",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Forum",
    link: "/forum",
  },
  {
    name: "Formation",
    link: "/formation",
  },
];
function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackScrollProgress = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollProgress(scrolled);
  };
  useEffect(() => {
    window.addEventListener("scroll", trackScrollProgress);
    return () => {
      window.removeEventListener("scroll", trackScrollProgress);
    };
  }, []);
  return !pathname.includes("login") ? (
    <header className="sticky z-40 top-0 w-full py-3  bg-white/90 backdrop-blur dark:border-gray-700/30 dark:bg-gray-900/80">
      <div className="flex items-center justify-between screen-wrapper">
        <div>
          <span className="sr-only">GNDC</span>
          <Link href={"/"}>
            <Image src={Logo} alt="logo GNDC" width={115} />
          </Link>
        </div>
        <div className="flex items-center gap-5 max-lg:hidden">
          <nav className="flex items-center gap-8 text-black">
            {Links.map((l, i) => (
              <Link key={i} href={l.link}>
                {l.name}
              </Link>
            ))}
          </nav>
          <Button
            className="ml-5 border border-primary text-primary hover:bg-primary hover:text-white"
            variant={"outline"}
            asChild
          >
            <Link href="/sign-in">Créer un compte</Link>
          </Button>
          <Button className="text-white" asChild>
            <Link href="/login">Se connecter</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden border" variant={"outline"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white pt-5 mt-0 max-sm:w-[70%] w-[540px] max-sm:px-3 px-5">
            <SheetHeader>
              <SheetTitle>
                <Image src={Logo} alt="logo GNDC" width={115} />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 text-primary my-4">
              {Links.map((l, i) => (
                <Link key={i} href={l.link}>
                  {l.name}
                </Link>
              ))}
            </nav>
            <Separator className="my-4 bg-gray-400" />
            <SheetFooter className="gap-3">
              <SheetClose asChild>
                <Button
                  className="grow border border-primary text-primary hover:bg-primary hover:text-white"
                  variant={"outline"}
                  asChild
                >
                  <Link href="/sign-in">Créer un compte</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button className="text-white" asChild>
                  <Link href="/login">Se connecter</Link>
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="absolute bottom-0 z-[41] left-0 w-full h-1 max-sm:h-[1px] bg-gray-200">
        <div
          className="h-1 max-sm:h-[1px] bg-secondary transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </header>
  ) : (
    <></>
  );
}

export default Header;
