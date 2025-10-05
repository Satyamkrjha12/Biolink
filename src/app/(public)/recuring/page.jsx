"use client";

import { Button } from "@headlessui/react";
import { ArrowLeft } from "lucide-react";
import React from "react";

const item = [
  {
    id: 1,
    title: "Telegram",
    description: "Offer a subscription service to your Telegram channel",
    img: "./Social Media Images/telegram.svg",
  },
  {
    id: 2,
    title: "Discord",
    description: "Turn your Discord Server into paid only access",
    img: "./Social Media Images/discord.svg",
  },
  {
    id: 3,
    title: "Whatsapp",
    description: "Give access to your WhatsApp channel only on payment",
    img: "./Social Media Images/whatsapp.svg",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Back Button */}
      <ArrowLeft
        className="absolute top-4 left-4 text-gray-400 hover:text-white cursor-pointer"
        onClick={() => (window.location.href = "/store")}
        size={28}
      />

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Let's Build a New Community
      </h1>

      {/* Card Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {item.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900/60 border border-zinc-700 p-6 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-md flex flex-col items-center justify-between gap-4 transition-transform hover:scale-[1.02]"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-14 h-14 mb-2 drop-shadow-lg"
            />
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
            <Button className="mt-4 rounded-xl bg-white text-black px-4 py-2 font-medium hover:bg-gray-200 transition-colors">
              Create New
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
