"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Button as ButtonX } from "@/components/ui/button-more";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/brand/logo.png";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/api/auth/logout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MenuIcon } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IRole, SessionUser } from "@/lib/db/schema";
import { shouldHideHeaderAndFooter } from "@/lib/utils";
import { useIs404Store } from "@/components/stores/useIs404";
import clsx from "clsx";
import Avatar from "@/components/avatar";
const Links = [
  { name: "Nos activités", link: "/events" },
  { name: "Blog", link: "/blog" },
  { name: "Forum", link: "/forum" },
  { name: "Leaderboard", link: "/leaderboard" },
  { name: "Contact", link: "/contact" },
];

const onLogoutClick = async () => {
  try {
    await logout();
  } catch (e) {
    toast.error(e as string);
  }
};
function AvatarMenuDropDown({
  user,
  role,
}: {
  user: SessionUser | null;
  role: IRole["name"] | undefined;
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relczative h-8 w-8 rounded-full">
          <Avatar asLink={false} className="bg-gray-50 h-11 w-11" {...user!} />
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
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/user/dashboard">Tableau de bord</Link>
            {/*<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>*/}
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/blog/new">Publier un Blog</Link>
            {/*<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>*/}
          </DropdownMenuItem>
          {role !== "user" && (
            <DropdownMenuItem asChild>
              <Link href="/admin/overview">Administration</Link>
              {/*<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>*/}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/user/profile">Profil</Link>
            {/*<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>*/}
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/user/settings">Paramètre</Link>
            {/*<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>*/}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogoutClick}>
          Se deconnecter
          {/*<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>*/}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
//import { SessionUser } from "@/lib/db/schema/user";
function Header({
  user,
  role,
}: {
  user: string | null;
  role: IRole["name"] | undefined;
}) {
  const userObj = user ? JSON.parse(user) : null;
  //const { user } = useSession();
  const pathname = usePathname();
  const { is404 } = useIs404Store();

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
    const handleScroll = () => {
      trackScrollProgress();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return !shouldHideHeaderAndFooter(pathname) || is404 ? (
    <header
      className={clsx(
        "sticky z-40 top-0 w-full py-3 bg-white/90 backdrop-blur dark:border-gray-700/30 dark:bg-gray-900/80"
      )}
    >
      <div className="flex items-center justify-between screen-wrapper">
        <div>
          <span className="sr-only">GNDC</span>
          <Link href="/">
            <Image loading="lazy" src={Logo} alt="logo GNDC" width={120} />
          </Link>
        </div>
        <div className="flex items-center gap-5 max-lg:hidden">
          <nav className="flex items-center gap-8 text-black">
            {Links.map((l, i) => {
              const isActive = pathname === l.link;
              return (
                <Link
                  href={l.link}
                  key={i}
                  className={`${!isActive ? "text-black" : "text-secondary"}`}
                >
                  {l.name}
                </Link>
              );
            })}
          </nav>
          {userObj && userObj.isCompletedProfile && (
            <>
              <Button variant="secondary" className="ml-5 text-white" asChild>
                <Link
                  href={role === "user" ? "/user/dashboard" : "/admin/overview"}
                >
                  {role === "user" ? "Tableau de bord" : "Administration"}
                </Link>
              </Button>
              <AvatarMenuDropDown user={userObj} role={role} />
            </>
          )}
          {userObj && !userObj.isCompletedProfile && (
            <>
              <ButtonX className="" variant="ringHover" asChild>
                <Link href="/account/complete">Completer</Link>
              </ButtonX>
            </>
          )}
          {!userObj && (
            <>
              <Button className="text-white ml-5" asChild variant="secondary">
                <Link href="/login">Se connecter</Link>
              </Button>
              <ButtonX className="" variant="ringHover" asChild>
                <Link href="/sign-up">Créer un compte</Link>
              </ButtonX>
            </>
          )}
        </div>
        <Sheet>
          <div className="flex items-center gap-3 lg:hidden">
            <SheetTrigger asChild>
              <Button className=" border" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            {userObj && userObj.isCompletedProfile && (
              <AvatarMenuDropDown user={userObj} role={role} />
            )}
          </div>
          <SheetContent className="bg-white pt-5 mt-0 max-sm:w-[70%] w-[540px] max-sm:px-3 px-5">
            <SheetHeader>
              <SheetTitle>
                <Image loading="lazy" src={Logo} alt="logo GNDC" width={120} />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 text-primary my-4">
              {Links.map((l, i) => {
                const isActive = pathname === l.link;
                return (
                  <SheetClose key={i} asChild>
                    <Link
                      href={l.link}
                      className={`${!isActive ? "text-black" : "text-secondary"}`}
                    >
                      {l.name}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>
            <Separator className="my-4 bg-gray-400" />
            <SheetFooter className="gap-3 max-sm:flex-col">
              {userObj && userObj.name && (
                <>
                  <SheetClose asChild>
                    <Button className="grow" variant="secondary" asChild>
                      <Link href="/user/dashboard">Tableau de bord</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={onLogoutClick}
                    >
                      Se déconnecter
                    </Button>
                  </SheetClose>
                </>
              )}
              {userObj && !userObj.isCompletedProfile && (
                <>
                  <SheetClose asChild>
                    <ButtonX className="" variant="ringHover" asChild>
                      <Link href="/account/complete">Completer</Link>
                    </ButtonX>
                  </SheetClose>
                </>
              )}
              {!user && (
                <>
                  <SheetClose asChild>
                    <Button className="text-white" variant="secondary" asChild>
                      <Link href="/login">Se connecter</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <ButtonX className="grow" variant="ringHover" asChild>
                      <Link href="/sign-up">Créer un compte</Link>
                    </ButtonX>
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
