"use client";
import { Menu, X } from "lucide-react";
import SideBar from "./Sidebar";
import { useState } from "react";

export default function ButtonSidebar() {
  const [isMobileOpen, setMobileOpen] = useState(false);
  return (
    <>
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
            <SideBar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
