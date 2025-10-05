"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Header({ title }) {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black via-gray-900 to-black text-white px-6 py-4 shadow-md border-b border-gray-800">
      {/* Back Button */}
      <button
        onClick={() => router.push("/magnet")}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-200 shadow-md"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Title */}
      <h1 className="text-lg sm:text-xl font-semibold text-center tracking-wide">
        {title}
      </h1>
    </header>
  );
}
