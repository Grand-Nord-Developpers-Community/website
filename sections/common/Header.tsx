"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Button as ButtonX } from "@/components/ui/button-more";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/brand/logo.png";
import { usePathname } from "next/navigation";
import {
  MenuIcon,
  User,
  LayoutDashboard,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
const Links = [
  { name: "Nos activités", link: "/events" },
  { name: "Blog", link: "/blog" },
  { name: "Forum", link: "/forum" },
  { name: "Formation", link: "/formation" },
];
import LogoutButton from "@/components/logout-button"
function Header({session}:{session:any}) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  //const [session, setSession] = useState(null);

  /*useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch("/api/auth/user");
      const data = await response.json();
      setSession(data);
    };

    fetchSession();
  }, []);*/
  useEffect(() => {
    setIsLoggedIn(false); //changer la valeur à true pour user connecté
  }, []);

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

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const UserMenu = () => (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full border border-solid border-primary p-0"
        >
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              Connecté en tant que
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              isaac_touza@outlook.fr
            </p>
          </div>
        </DropdownMenuLabel>
        <Separator className="my-1 bg-gray-400" />
        <DropdownMenuItem>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <Link href="/user/dashboard">Tableau de bord</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserCircle className="mr-2 h-4 w-4" />
          <Link href="/user/profile">Mon profil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <Link href="/user/settings">Paramètres</Link>
        </DropdownMenuItem>
        <Separator className="my-1" />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="lg:hidden border" variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white pt-5 mt-0 max-sm:w-[70%] w-[540px] max-sm:px-3 px-5">
        <SheetHeader>
          <SheetTitle>
            <Image loading="lazy" src={Logo} alt="logo GNDC" width={115} />
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
        {/*isLoggedIn ? (
          <div className="flex flex-col gap-2">
            <User className="h-5 w-5 self-center" />
            <SheetClose asChild>
              <Button className="w-full" asChild>
                <Link href="/user/dashboard">Tableau de bord</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button className="w-full" asChild>
                <Link href="/profile">Mon profil</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button className="w-full" asChild>
                <Link href="/settings">Paramètres</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleLogout}
              >
                Se déconnecter
              </Button>
            </SheetClose>
          </div>
        ) : (
          <SheetFooter className="gap-3">
            <SheetClose asChild>
              <Button
                className="grow border border-primary text-primary hover:bg-primary hover:text-white"
                variant="outline"
                asChild
              >
                <Link href="/sign-up">Créer un compte</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button className="text-white grow" asChild>
                <Link href="/login">Se connecter</Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        )*/}
      </SheetContent>
    </Sheet>
  );

  return !pathname.includes("login") && !pathname.includes("sign-up") ? (
    <header className="sticky z-40 top-0 w-full py-3 bg-white/90 backdrop-blur dark:border-gray-700/30 dark:bg-gray-900/80">
      <div className="flex items-center justify-between screen-wrapper">
        <div>
          <span className="sr-only">GNDC</span>
          <Link href="/">
            <Image loading="lazy" src={Logo} alt="logo GNDC" width={120} />
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
	  {session ? (
        <>
 <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-11 w-11">
              <AvatarImage src={""} alt="@shadcn" />
              <AvatarFallback>SZ</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          align="end"
          forceMount
          sideOffset={10}
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                Samiratou Zilli
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                samiratouzlili13@gmail.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Abonnements
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Parametre
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem >
              Parrainer
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Se deconnecter
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
          
        </>
      ) : (
            <>
              <Button className="text-white ml-5" asChild>
                <Link href="/login">Se connecter</Link>
              </Button>
              <ButtonX className="" variant="ringHover" asChild>
                <Link href="/sign-up">Créer un compte</Link>
              </ButtonX>
            </>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden border" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white pt-5 mt-0 max-sm:w-[70%] w-[540px] max-sm:px-3 px-5">
            <SheetHeader>
              <SheetTitle>
                <Image loading="lazy" src={Logo} alt="logo GNDC" width={120} />
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
              {isLoggedIn ? (
                <>
                  <SheetClose asChild>
                    <Button className="grow" asChild>
                      <Link href="/user/dashboard">Tableau de bord</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      Se déconnecter
                    </Button>
                  </SheetClose>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button
                      className="grow border border-primary text-primary hover:bg-primary hover:text-white"
                      variant="outline"
                      asChild
                    >
                      <Link href="/sign-up">Créer un compte</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className="text-white" asChild>
                      <Link href="/login">Se connecter</Link>
                    </Button>
                  </SheetClose>
                </>
              )}
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
  ) : null;
}

export default Header;
