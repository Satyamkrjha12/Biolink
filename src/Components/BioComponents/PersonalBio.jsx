"use client";

import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import EditBioModal from "./ModalFile/MyModal";

export default function PersonalBio() {
  const [data, setData] = useState({
    Image: "/default img/default-profimg.jpg",
    Name: "User Name",
    Bio: "Creator and Influencer",
  });

  const [socialPlatforms, setSocialPlatforms] = useState([
    { id: 1, name: "AppStore", pic: "./Social Media Images/app-store.svg", Value: "" },
    { id: 2, name: "AppMusic", pic: "./Social Media Images/apple-music.svg", Value: "" },
    { id: 3, name: "AppPodcast", pic: "./Social Media Images/apple-podcast.svg", Value: "" },
    { id: 4, name: "Behance", pic: "./Social Media Images/behance.svg", Value: "" },
    { id: 5, name: "Clubhouse", pic: "./Social Media Images/clubhouse.svg", Value: "" },
    { id: 6, name: "Discord", pic: "./Social Media Images/discord.svg", Value: "" },
    { id: 7, name: "Email", pic: "./Social Media Images/email.svg", Value: "" },
    { id: 8, name: "GitHub", pic: "./Social Media Images/github.svg", Value: "" },
    { id: 9, name: "LinkedIn", pic: "./Social Media Images/linkedin.svg", Value: "" },
    { id: 10, name: "Patreon", pic: "./Social Media Images/patreon.svg", Value: "" },
    { id: 11, name: "Pinterest", pic: "./Social Media Images/pinterest.svg", Value: "" },
    { id: 12, name: "PlayStore", pic: "./Social Media Images/playstore.svg", Value: "" },
    { id: 13, name: "Snapchat", pic: "./Social Media Images/snapchat.svg", Value: "" },
    { id: 14, name: "Spotify", pic: "./Social Media Images/spotify.svg", Value: "" },
    { id: 15, name: "Substack", pic: "./Social Media Images/substack.svg", Value: "" },
    { id: 16, name: "Threads", pic: "./Social Media Images/thread.svg", Value: "" },
    { id: 17, name: "TikTok", pic: "./Social Media Images/tiktok.svg", Value: "" },
    { id: 18, name: "Twitch", pic: "./Social Media Images/twitch.svg", Value: "" },
    { id: 19, name: "Twitter", pic: "./Social Media Images/twitter.svg", Value: "" },
    { id: 20, name: "WhatsApp", pic: "./Social Media Images/whatsapp.svg", Value: "" },
    { id: 21, name: "YouTube", pic: "./Social Media Images/youtube.svg", Value: "" },
    { id: 22, name: "Instagram", pic: "./Social Media Images/instagram.svg", Value: "" },
    { id: 23, name: "Facebook", pic: "./Social Media Images/facebook.svg", Value: "" },
  ]);

  const handleBioData = ({ Img, Name, Bio }) => {
    setData({ Image: Img, Name, Bio });
  };

  const handleSocialData = (soc) => {
    setSocialPlatforms((prev) =>
      prev.map((platform) => ({
        ...platform,
        Value: soc[platform.name] || "",
      }))
    );
  };

  return (
    <div className="w-full">
      {/* Card */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-xl px-6 py-6 max-w-xl mx-auto transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">

        {/* Profile Image */}
        <div className="w-full overflow-hidden rounded-2xl shadow-md mb-4">
          <img
            src={data.Image}
            alt="Profile"
            className="w-full sm:h-[500px] h-[300px]  object-cover object-center transition-transform duration-300 "
          />
        </div>

        {/* Info Section */}
        <div className="text-center space-y-2">
          {/* Name + Verified */}
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl font-semibold text-white">{data.Name}</h2>
            <div className="group relative">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                Verified User
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-400 text-sm">{data.Bio}</p>

          {/* Social Media */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            {socialPlatforms
              .filter((platform) => platform.Value !== "")
              .map((platform) => (
                <a
                  key={platform.id}
                  href={platform.Value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <img
                    src={platform.pic}
                    alt={platform.name}
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-sm text-white">{platform.name}</span>
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="mt-6 flex justify-end max-w-xl mx-auto">
        <EditBioModal
          sendParentBioData={handleBioData}
          sendDataSocialParent={handleSocialData}
        />
      </div>
    </div>
  );
}
