"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
      onClick={onClose}
    >
      <div
        className="bg-card p-6 rounded-lg shadow-xl max-w-2xl w-full relative max-sm:rounded-none max-sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-4 right-4 " onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Dialog;
