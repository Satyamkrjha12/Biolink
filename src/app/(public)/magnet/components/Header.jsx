"use client";

import React from "react";
import MagnetModal from "./MagnetModal";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-zinc-900 text-white rounded-2xl shadow-md">
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-zinc-400 transition"
        onClick={() => router.push("/store")}
      >
        <ArrowLeft className="w-5 h-5" />
      </div>

      <h2 className="text-2xl font-semibold tracking-tight">Magnet</h2>

      <div className="flex-shrink-0">
        <MagnetModal />
      </div>
    </header>
  );
}
