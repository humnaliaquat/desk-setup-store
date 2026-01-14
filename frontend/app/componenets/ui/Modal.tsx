// components/Modal.tsx
"use client";
import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose} // close when clicking overlay
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal
      >
        {title && (
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
        )}

        <div className="mb-4">{children}</div>

        {footer && <div className="flex gap-3">{footer}</div>}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
