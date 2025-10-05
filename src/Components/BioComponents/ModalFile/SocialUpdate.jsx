// SocialUpdate.js

"use client";
import React, { useEffect, useState } from "react";
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption, ComboboxButton } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import AddSocialMedia from "./AddSocialMedia";

const socialPlatforms = [
  { id: 1, name: "LinkedIn", pic: "./Social Media Images/linkedin.svg" },
  { id: 2, name: "Instagram", pic: "./Social Media Images/instagram.svg" },
  { id: 3, name: "GitHub", pic: "./Social Media Images/github.svg" },
  // Add remaining platforms here...
];

export default function SocialUpdate({ sendDataParent, Info }) {
  const socialPlatforms = [
    { id: 1, name: "App Store", pic: "./Social Media Images/app-store.svg" },
    { id: 2, name: "Apple Music", pic: "./Social Media Images/apple-music.svg" },
    { id: 3, name: "Apple Podcasts", pic: "./Social Media Images/apple-podcast.svg" },
    { id: 4, name: "Behance", pic: "./Social Media Images/behance.svg" },
    { id: 5, name: "Clubhouse", pic: "./Social Media Images/clubhouse.svg" },
    { id: 6, name: "Discord", pic: "./Social Media Images/discord.svg" },
    { id: 7, name: "Email", pic: "./Social Media Images/email.svg" },
    { id: 8, name: "GitHub", pic: "./Social Media Images/github.svg" },
    { id: 9, name: "LinkedIn", pic: "./Social Media Images/linkedin.svg" },
    { id: 10, name: "Patreon", pic: "./Social Media Images/patreon.svg" },
    { id: 11, name: "Pinterest", pic: "./Social Media Images/pinterest.svg" },
    { id: 12, name: "Play Store", pic: "./Social Media Images/playstore.svg" },
    { id: 13, name: "Snapchat", pic: "./Social Media Images/snapchat.svg" },
    { id: 14, name: "Spotify", pic: "./Social Media Images/spotify.svg" },
    { id: 15, name: "Substack", pic: "./Social Media Images/substack.svg" },
    { id: 16, name: "Threads", pic: "./Social Media Images/thread.svg" },
    { id: 17, name: "TikTok", pic: "./Social Media Images/tiktok.svg" },
    { id: 18, name: "Twitch", pic: "./Social Media Images/twitch.svg" },
    { id: 19, name: "Twitter", pic: "./Social Media Images/twitter.svg" },
    { id: 20, name: "WhatsApp", pic: "./Social Media Images/whatsapp.svg" },
    { id: 21, name: "YouTube", pic: "./Social Media Images/youtube.svg" },
    { id: 22, name: "Instagram", pic: "./Social Media Images/instagram.svg" },
    { id: 23, name: "Facebook", pic: "./Social Media Images/facebook.svg" },
  ];

  
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [data, setData] = useState({});


  useEffect(() => {
    const filled = socialPlatforms.filter(p => Info?.[p.name]);
    setSelected(filled);
    setData({ ...Info });
  }, [Info]);

  const addPlatform = (platform) => {
    if (!selected.find(p => p.name === platform.name)) {
      setSelected(prev => [...prev, platform]);
    }
  };

  const handleSocialUpdate = (updatedData) => {
    const newData = { ...data, ...updatedData };
    setData(newData);
    sendDataParent(newData);
  };

  const filtered = socialPlatforms
    .filter((platform) => !selected.find((p) => p.id === platform.id))
    .filter((platform) => platform.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full p-4">
      <Combobox value={selectedPlatform} onChange={(platform) => {
        setSelectedPlatform(platform);
        addPlatform(platform);
        setQuery("");
      }}>
        <div className="relative">
          <ComboboxInput
            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            displayValue={(platform) => platform?.name || ""}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Select a platform..."
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </ComboboxButton>
        </div>
        {filtered.length > 0 && (
          <ComboboxOptions className="mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
            {filtered.map((platform) => (
              <ComboboxOption
                key={platform.id}
                value={platform}
                className={({ active }) =>
                  clsx("relative cursor-default select-none py-2 pl-10 pr-4",
                    active ? "bg-blue-600 text-white" : "text-gray-900")
                }
              >
                {({ selected, active }) => (
                  <>
                    <span className={clsx("block truncate", selected ? "font-medium" : "font-normal")}>
                      <div className="flex gap-2 items-center">
                        <img src={platform.pic} alt={platform.name} className="w-5 h-5" />
                        {platform.name}
                      </div>
                    </span>
                    {selected && (
                      <span className={clsx("absolute inset-y-0 left-0 flex items-center pl-3",
                        active ? "text-white" : "text-blue-600")}>
                        <CheckIcon className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </Combobox>

      <div className="mt-4 space-y-2">
        <AddSocialMedia
          SocialMedia={selected}
          sendDataParent={handleSocialUpdate}
          initialValues={data}
        />
      </div>
    </div>
  );
}
