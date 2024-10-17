"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/brand/logo.png";
import { Button } from "@/components/ui/button";
import ContactSection from "@/components/ui/contact-session";
import { Input } from "@/components/ui/input";
import facebookIcon from "@/assets/images/social-icons/facebook.svg";
import githubIcon from "@/assets/images/social-icons/github.svg";
import xIcon from "@/assets/images/social-icons/x.svg";
import linkedinIcon from "@/assets/images/social-icons/linkedIn.svg";
import youtubeIcon from "@/assets/images/social-icons/youtube.svg";
import WhatsAppButton from "@/components/social-button/whatsAppbutton";
import TelegramButton from "@/components/social-button/telegramButton";
import DiscordButton from "@/components/social-button/discordButton";
import TermsModal from "@/components/legal/CodeOfConductModal";
import PrivacyModal from "@/components/legal/PrivacyModal";
import CodeOfConductModal from "@/components/legal/TermsModal";
import { usePathname } from "next/navigation";
import { Lock, Users } from "lucide-react";

function Footer() {
  const pathname = usePathname();
  return !pathname.includes("login") ? (
    <footer className="bg-white py-10 border-t border-gray-200">
      <div className="screen-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <Image src={Logo} alt="GNDC Logo" width={130} height={70} />
            <p className="mt-4 text-sm">
              Innover ensemble pour transformer le futur technologique du Grand
              Nord Cameroun.
            </p>
            <div className="mt-4">
              <ContactSection />
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-4 text-primary">RESOURCES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm">
                  A Propos
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-sm">
                  Forum
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className="text-sm">
                  Sponsors
                </Link>
              </li>
              <li>
                <Link href="/opportunity" className="text-sm">
                  Opportunités
                </Link>
              </li>
              <li>
                <Link href="/branding" className="text-sm">
                  Branding
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4 text-primary">LEGAL</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacypolicy"
                  className="text-sm hover:underline flex items-center"
                >
                  {/* <Lock className="w-4 h-4 mr-1" /> */}
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/codeofconduct"
                  className="text-sm hover:underline flex items-center"
                >
                  {/* <Users className="w-4 h-4 mr-1" /> */}
                  Code de conduite
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm">
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Nous Rejoindre */}
          <div>
            <h3 className="font-bold mb-4 text-primary">NOUS REJOINDRE</h3>
            <p className="text-sm mb-4">
              Inscrivez-vous avec votre email pour recevoir les dernières
              actualités et opportunités de la Grand Nord Developers Community.
            </p>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Saisir votre adresse email"
                className="flex-grow"
              />
              <Button className="text-white" asChild>
                <Link href="#">S&apos;inscrire</Link>
              </Button>
            </div>
            <p className="text-sm mb-4">
              ou suivez-nous sur nos réseaux sociaux pour rester connecté avec
              la Grand Nord Developers Community et ne rien manquer de nos
              événements, formations, et innovations!
            </p>
            <div className="w-full max-w-4xl mx-auto ">
              <div className="flex gap-4 justify-between max-sm:justify-start max-sm:gap-2">
                <Link href="#">
                  <TelegramButton />
                </Link>

                <Link href="#">
                  <WhatsAppButton />
                </Link>

                <Link href="#">
                  <DiscordButton />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Social Icons */}
        <div className="mt-8 pt-8 max-sm:pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © Grand Nord Developers Community - 2024. Tous droits réservés
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0 max-sm:gap-2">
            <Link href="#" className="text-gray-600">
              <Image
                src={youtubeIcon}
                alt="youtube"
                className="size-8 p-2 bg-gray-200"
              />
            </Link>
            <Link href="#" className="text-gray-600">
              <Image src={xIcon} alt="x" className="size-8 p-2 bg-gray-200" />
            </Link>
            <Link href="#" className="text-gray-600">
              <Image
                src={facebookIcon}
                alt="Facebook"
                className="size-8 p-2 bg-gray-200"
              />
            </Link>
            <Link href="#" className="text-gray-600">
              <Image
                src={linkedinIcon}
                alt="LinkedIn"
                className="size-8 p-2 bg-gray-200"
              />
            </Link>
            <Link href="#" className="text-gray-600">
              <Image
                src={githubIcon}
                alt="GitHub"
                className="size-8 p-2 bg-gray-200"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  ) : (
    <></>
  );
}
export default Footer;
