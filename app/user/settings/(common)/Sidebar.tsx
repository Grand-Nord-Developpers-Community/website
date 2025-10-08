"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { User, Lock, Palette, Bell, CreditCard, Menu, X } from "lucide-react";

const tabs = [
  { href: "/user/settings", label: "Mon profil", icon: User },
  { href: "/user/settings/password", label: "Mot de passe", icon: Lock },
  //   { href: "/user/settings/appearance", label: "Apparence", icon: Palette },
  { href: "/user/settings/notification", label: "Notifications", icon: Bell },
  //   {
  //     href: "/user/settings/subscription",
  //     label: "Abonnement",
  //     icon: CreditCard,
  //   },
];
type Props = {
  onClose?: () => void;
};
export default function SideBar({ onClose }: Props) {
  const pathname = usePathname();
  const [isMobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="space-y-4">
      {tabs.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            href={href}
            //className="mb-2"
            key={href}
            onClick={onClose}
          >
            <div
              className={`flex items-center space-x-2 mb-2 w-full p-2 rounded transition ${
                isActive
                  ? "bg-[#F6EAD7] text-[#C38D3D]"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
