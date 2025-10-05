"use client";

import { FaWpforms, FaGift } from "react-icons/fa"; // npm install react-icons
import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/navigation"; // ✅ App Router compatible

export default function MagnetModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const forms = [
    {
      title: "Basic Form",
      description:
        "Great for collecting basic information - Ask your visitors to fill a basic form and submit.",
      icon: <FaWpforms className="text-green-600 w-6 h-6" />,
      iconBg: "bg-green-100",
      click: () => {
        router.push("/magnet/form/basic");
        setIsOpen(false);
      },
    },
    {
      title: "Giveaway Form",
      description:
        "Offer a free resource when a visitor successfully submits the form.",
      icon: <FaGift className="text-blue-600 w-6 h-6" />,
      iconBg: "bg-blue-100",
      click: () => {
        router.push("/magnet/form/gift");
        setIsOpen(false);
      },
    },
  ];

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-zinc-900 text-white px-5 py-2 rounded-xl hover:bg-zinc-800 transition-colors shadow-md"
      >
        New Form
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg h-[80vh] overflow-y-auto rounded-2xl bg-[#16161a] p-6 shadow-2xl transition-all flex flex-col justify-start border border-zinc-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-700 pb-4 mb-6">
              <h2 className="text-xl font-semibold text-white">
                Edit Sections
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-zinc-400 hover:text-white transition"
              >
                &times;
              </button>
            </div>

            {/* Tab Section */}
            <Tab.Group>
              <div className="flex flex-col gap-10">
                <div className="space-y-6">
                  {forms.map(({ title, description, icon, iconBg, click }, idx) => (
                    <div
                      key={idx}
                      onClick={click}
                      className="cursor-pointer flex items-center gap-4 rounded-xl border border-zinc-700 hover:border-white/20 p-4 bg-zinc-800/40 hover:bg-zinc-700/50 transition-all duration-200 shadow hover:shadow-lg"
                    >
                      <div className={`p-3 rounded-full text-white ${iconBg}`}>
                        {icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-md">{title}</h3>
                        <p className="text-sm text-zinc-400 mt-1">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Group>
          </div>
        </div>
      )}
    </>

  );
}
