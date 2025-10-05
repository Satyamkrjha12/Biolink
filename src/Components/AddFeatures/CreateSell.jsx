"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function FeatureList() {
  const router = useRouter();

  const features = [
    {
      icon: "📁",
      title: "Sell Digital Files",
      desc: "Sell E-books, PDF files, Images, videos, and more.",
      push: () => router.push("/sellProduct"),
    },
    {
      icon: "🚀",
      title: "Offer 1-on-1 Session",
      desc: "Set up private sessions with your audience.",
      push: () => router.push("/bookings"),
    },
    {
      icon: "💬",
      title: "Recurring Membership",
      desc: "Build paid communities on Telegram or Discord.",
      push: () => router.push("/recuring"),
    },
    {
      icon: "🗓️",
      title: "Host Event or Webinar",
      desc: "Sell live event tickets, coaching, or classes.",
      push: () => router.push("/event"),
    },
    {
      icon: "🏅",
      title: "Sell A Course",
      desc: "Monetize your video collection or lessons.",
      push: () => router.push("/sellProduct"),
    },
    {
      icon: "🔒",
      title: "Locked Content",
      desc: "Lock any file for a price. Unlock to access.",
      push: () => router.push("/lockedContent"),
    },
    {
      icon: "💸",
      title: "Sell Affiliate Products",
      desc: "Earn by promoting others’ products.",
      push: () => router.push("/affiliate"),
    },
  ];

  return (
    <div className="min-h-screen  px-6 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2  gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={feature.push}
            className="cursor-pointer group transition-all duration-300 bg-[#16161a] border border-zinc-800 hover:border-zinc-600 hover:shadow-lg p-6 rounded-2xl flex gap-4 items-start hover:scale-[1.02]"
          >
            <div className="text-3xl p-3 bg-zinc-900 text-white rounded-xl shadow-sm transition-transform duration-300 group-hover:rotate-6">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-zinc-100">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-400 mt-1">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
