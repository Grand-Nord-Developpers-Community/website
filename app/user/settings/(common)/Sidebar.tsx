"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { User, Lock, Palette, Bell, CreditCard, Menu, X } from "lucide-react";

const tabs = [
  { href: "/user/settings/profile", label: "Mon profil", icon: User },
  { href: "/user/settings/password", label: "Mot de passe", icon: Lock },
  //   { href: "/user/settings/appearance", label: "Apparence", icon: Palette },
  { href: "/user/settings/notification", label: "Notifications", icon: Bell },
  //   {
  //     href: "/user/settings/subscription",
  //     label: "Abonnement",
  //     icon: CreditCard,
  //   },
];

export default function SideBar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setMobileOpen] = useState(false);

  const Sidebar = () => (
    <nav className="space-y-4">
      {tabs.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            href={href}
            //className="mb-2"
            key={href}
            onClick={() => setMobileOpen(false)}
          >
            <div
              className={`flex items-center space-x-2 mb-2 w-full p-2 rounded transition ${
                isActive
                  ? "bg-[#F6EAD7] text-[#C38D3D]"
                  : "text-gray-600 hover:bg-gray-100"
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

  return (
    <div className="relative screen-wrapper">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block md:w-1/4">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </aside>

        <main className="w-full md:w-3/4">{children}</main>
      </div>

      <button
        className="md:hidden fixed bottom-4 left-4 bg-[#C38D3D] text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={24} />
      </button>

      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-40">
          <div className="absolute top-0 left-0 bottom-0 w-64 bg-white p-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
}
