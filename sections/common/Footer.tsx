import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/brand/logo.png";
import { Button } from "@/components/ui/button";
import ContactSection from  "@/components/ui/contact-session";
import { Input } from "@/components/ui/input";
import  facebookIcon from "@/assets/images/social-icons/facebook.svg";
import  githubIcon from "@/assets/images/social-icons/github.svg";
import  xIcon from "@/assets/images/social-icons/x.svg";
import linkedinIcon from  "@/assets/images/social-icons/linkedIn.svg";
import youtubeIcon from  "@/assets/images/social-icons/youtube.svg";
import whatsAppIcon from  "@/assets/images/social-icons/whatsApp-icon.webp";
import discordIcon from  "@/assets/images/social-icons/discord-icon.png";
import telegramIcon from  "@/assets/images/social-icons/telegram-icon.webp";
import WhatsAppButton from"@/components/social-button/whatsAppbutton"
import TelegramButton from"@/components/social-button/telegramButton"
import DiscordButton from"@/components/social-button/discordButton"



import { MessageCircle, Phone, Hash, Twitter, Facebook, Linkedin, Github } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white py-4 border-t border-gray-200">
    <div className="screen-wrapper">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div className="col-span-1">
          <Image src={Logo} alt="GNDC Logo" width={130} height={70} />
          <p className="mt-4 text-sm">
            Innover ensemble pour transformer le futur technologique du Grand Nord Cameroun.
          </p>
          <div className="mt-4">
           <ContactSection />
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-bold mb-4">RESOURCES</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="text-sm">A Propos</Link></li>
            <li><Link href="#" className="text-sm">Forum</Link></li>
            <li><Link href="#" className="text-sm">Blog</Link></li>
            <li><Link href="#" className="text-sm">Sponsors</Link></li>
            <li><Link href="#" className="text-sm">Opportunités</Link></li>
            <li><Link href="#" className="text-sm">Branding</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold mb-4">LEGAL</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="text-sm">Conditions d&apos;utilisation</Link></li>
            <li><Link href="#" className="text-sm">Confidentialité</Link></li>
            <li><Link href="#" className="text-sm">Code de conduite</Link></li>
            <li><Link href="#" className="text-sm">FAQ</Link></li>
          </ul>
        </div>

        {/* Nous Rejoindre */}
        <div>
          <h3 className="font-bold mb-4">NOUS REJOINDRE</h3>
          <p className="text-sm mb-4">
            Inscrivez-vous avec votre email pour recevoir les dernières actualités et opportunités de la Grand Nord Developers Community.
          </p>
          <div className="flex gap-2 mb-4">
            <Input placeholder="Saisir votre adresse email" className="flex-grow" />
            <Button className="text-white" asChild>
                <Link href="">S&apos;inscrire</Link>
             </Button>
          </div>
          <p className="text-sm mb-4">
            ou suivez-nous sur nos réseaux sociaux pour rester connecté avec la Grand Nord Developers Community et ne rien manquer de nos événements, formations, et innovations!
          </p>
            <div className="w-full max-w-4xl mx-auto ">
                <div className="flex flex-row sm:flex-row gap-4 justify-between">
                    <Link 
                    href="#" 
                    className="flex-1 min-w-0"
                    >
                    <div className="w-full">
                        <TelegramButton />
                    </div>
                    </Link>
                    
                    <Link 
                    href="#" 
                    className="flex-1 min-w-0"
                    >
                    <div className="w-full">
                        <WhatsAppButton />
                    </div>
                    </Link>
                    
                    <Link 
                    href="#" 
                    className="flex-1 min-w-0"
                    >
                    <div className="w-full">
                        <DiscordButton />
                    </div>
                    </Link>
                </div>
            </div>
        </div>
      </div>

      {/* Copyright and Social Icons */}
      <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600">
          © Grand Nord Developers Community - 2024. Tous droits réservés
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
         <Link href="#" className="text-gray-600">
            <Image src={youtubeIcon} alt="youtube" width={25} height={25} />
          </Link>
          <Link href="#" className="text-gray-600">
            <Image src={xIcon} alt="x" width={20} height={20} />
          </Link>
          <Link href="#" className="text-gray-600">
            <Image src={facebookIcon} alt="Facebook" width={14} height={14} />
          </Link>
          <Link href="#" className="text-gray-600">
            <Image src={linkedinIcon} alt="LinkedIn" width={20} height={20} />
          </Link>
          <Link href="#" className="text-gray-600">
            <Image src={githubIcon} alt="GitHub" width={20} height={20} />
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
}
export default Footer;