"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import {
  Bell,
  MessageCircleHeart,
  Pencil,
  StretchHorizontal,
  UserPen,
} from "lucide-react";
import { Tab } from "@headlessui/react";
import ProfileUpdate from "./ProfileUpdate";
import FollowUpdate from "./FollowUpdate";
import SocialUpdate from "./SocialUpdate";
import ButtonUpdate from "./ButtonUpdate";
import { send } from "process";


export default function EditBioModal({ sendParentBioData, sendDataSocialParent }) {
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState({
    Id: "1",
    Image: "",
    Name: "",
    Bio: "",
    enableFollowButton: false,
    emailVerification: false,
    phoneVerification: false,
    thankTitle: "",
    titleDescription: "", 
    enableGiftButton: false,
    giftTitle: "",
    gift: "",
    showContactDetails: false,
    bookingEnabled: false,
    showEmail: false,
    showPhone: false,
    email: "",
    phone: "",
    "App Store": "",
    "Apple Music": "",
    "Apple Podcasts": "",
    Behance: "",
    Clubhouse: "",
    Discord: "",
    Email: "",
    GitHub: "",
    LinkedIn: "",
    Patreon: "",
    Pinterest: "",
    "Play Store": "",
    Snapchat: "",
    Spotify: "",
    Substack: "",
    Threads: "",
    TikTok: "",
    Twitch: "",
    Twitter: "",
    WhatsApp: "",
    YouTube: "",
    Instagram: "",
    Facebook: "",
  });

  globalThis.Id; // Make data globally accessible for debugging

  // ✅ Profile handler
  const handleProfileUpdate = ({ Name, Bio, Img }) => {
    setData((prev) => ({ ...prev, Name, Bio, Image: Img }));
    sendParentBioData({ Img, Name, Bio });
  };



  // ✅ Follow handler (FIXED)
  const handleFllowUpdate = ({
    enableFollowButton,
    emailVerification,
    phoneVerification,
    thankTitle,
    titleDescription, // ✅ fixed spelling
    enableGiftButton,
    giftTitle,
    gift,
  }) => {
    setData((prev) => ({
      ...prev,
      enableFollowButton,
      emailVerification,
      phoneVerification,
      thankTitle,
      titleDescription, // ✅ fixed here too
      enableGiftButton,
      giftTitle,
      gift,
    }));
  };

  // ✅ Social handler
  const handleSocialUpdate = (socialData) => {
    const {
      AppStore,
      AppMusic,
      AppPodcast,
      Behance,
      Clubhouse,
      Discord,
      Email,
      GitHub,
      LinkedIn,
      Patreon,
      Pinterest,
      PlayStore,
      Snapchat,
      Spotify,
      Substack,
      Threads,
      TikTok,
      Twitch,
      Twitter,
      WhatsApp,
      YouTube,
      Instagram,
      Facebook,
    } = socialData;

    setData((prev) => ({
      ...prev,
      "App Store": AppStore,
      "Apple Music": AppMusic,
      "Apple Podcasts": AppPodcast,
      Behance,
      Clubhouse,
      Discord,
      Email,
      GitHub,
      LinkedIn,
      Patreon,
      Pinterest,
      "Play Store": PlayStore,
      Snapchat,
      Spotify,
      Substack,
      Threads,
      TikTok,
      Twitch,
      Twitter,
      WhatsApp,
      YouTube,
      Instagram,
      Facebook,
    }));


    // Send plain object (not nested!)
    sendDataSocialParent(socialData);
  };

  // ✅ Button handler
  const handleButtonUpdate = ({
    showContactDetails,
    bookingEnabled,
    showEmail,
    showPhone,
    email,
    phone,
  }) => {
    setData((prev) => ({
      ...prev,
      showContactDetails,
      bookingEnabled,
      showEmail,
      showPhone,
      email,
      phone,
    }));
  };

  // ✅ Tabs
  const categories = [
    {
      name: "Profile",
      component: data
        ? <ProfileUpdate sendDataParent={handleProfileUpdate} Info={{ Image: data.Image, Name: data.Name, Bio: data.Bio }} />
        : null,
      icon: <UserPen size={16} />,
      colorClass: "bg-green-200 text-black",
    },
    {
      name: "Follow",
      component:  data
        ? <FollowUpdate sendDataParent={handleFllowUpdate} Info={{ enableFollowButton: data.enableFollowButton, emailVerification: data.emailVerification, phoneVerification: data.phoneVerification, thankTitle: data.thankTitle, titleDescription: data.titleDescription, enableGiftButton: data.enableGiftButton, giftTitle: data.giftTitle, gift: data.gift }} />
        : null,
      icon: <Bell size={16} />,
      colorClass: "bg-yellow-200 text-black",
    },
    {
      name: "Socials",
      component:data
        ? <SocialUpdate sendDataParent={handleSocialUpdate} Info={{
            AppStore: data["App Store"],
            AppMusic: data["Apple Music"],
            AppPodcast: data["Apple Podcasts"],
            Behance: data.Behance,
            Clubhouse: data.Clubhouse,
            Discord: data.Discord,
            Email: data.Email,
            GitHub: data.GitHub,
            LinkedIn: data.LinkedIn,
            Patreon: data.Patreon,
            Pinterest: data.Pinterest,
            PlayStore: data["Play Store"],
            Snapchat: data.Snapchat,
            Spotify: data.Spotify,
            Substack: data.Substack,
            Threads: data.Threads,
            TikTok: data.TikTok,
            Twitch: data.Twitch,
            Twitter: data.Twitter,
            WhatsApp: data.WhatsApp,
            YouTube: data.YouTube,
            Instagram: data.Instagram,
            Facebook: data.Facebook,
          }}/>
        : null,
      icon: <MessageCircleHeart size={16} />,
      colorClass: "bg-red-200 text-black",
    },
    {
      name: "Buttons",
      component:data ? <ButtonUpdate sendDataParent={handleButtonUpdate} Info={{ showContactDetails: data.showContactDetails, bookingEnabled: data.bookingEnabled, showEmail: data.showEmail, showPhone: data.showPhone, email: data.email, phone: data.phone }} /> : null,
      icon: <StretchHorizontal size={16} />,
      colorClass: "bg-blue-200 text-black",
    },
  ];

  useEffect(() => {
    if (!data?.Id) return; // wait until data.Id is available

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/userBio?Id=${data.Id}`);
        const result = await response.json();

        if (response.ok) {
          setData(result);
          globalThis.Id = result.Id; // Update global variable
          sendParentBioData({ Img: result.Image, Name: result.Name, Bio: result.Bio }); // send updated data to parent
          sendDataSocialParent({
            AppStore: result["App Store"],
            AppMusic: result["Apple Music"],
            AppPodcast: result["Apple Podcasts"],
            Behance: result.Behance,
            Clubhouse: result.Clubhouse,
            Discord: result.Discord,
            Email: result.Email,
            GitHub: result.GitHub,
            LinkedIn: result.LinkedIn,
            Patreon: result.Patreon,
            Pinterest: result.Pinterest,
            PlayStore: result["Play Store"],
            Snapchat: result.Snapchat,
            Spotify: result.Spotify,
            Substack: result.Substack,
            Threads: result.Threads,
            TikTok: result.TikTok,
            Twitch: result.Twitch,
            Twitter: result.Twitter,
            WhatsApp: result.WhatsApp,
            YouTube: result.YouTube,
            Instagram: result.Instagram,
            Facebook: result.Facebook,
          });
          console.log("Fetched user data:", result);
        } else {
          console.error("Error:", result.error);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchData();
  }, [data?.Id]); // re-run when data.Id becomes available



  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/userBio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }), // Ensure `data` includes Name, Bio, etc.
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error:", result.error);
        return;
      }

      console.log("Success:", result);
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <>
      <Button
        className="flex w-full justify-center items-center gap-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-gray-600 hover:to-gray-700 transition-all duration-200"
        onClick={() => setIsOpen(true)}
      >
        <Pencil size={16} />
        Edit Header
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4">
          <div className="w-full max-w-2xl h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-2xl transition-all duration-300 ease-in-out flex flex-col border border-zinc-200 dark:border-zinc-700">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Sections</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold text-gray-500 hover:text-red-500 transition"
              >
                &times;
              </button>
            </div>

            {/* Tabs */}
            <Tab.Group>
              <Tab.List className="flex flex-wrap gap-2 mb-4">
                {categories.map(({ name, icon, colorClass }) => (
                  <Tab
                    key={name}
                    className={({ selected }) =>
                      `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
                  ${selected
                        ? `text-white ${colorClass}`
                        : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
                      }`
                    }
                  >
                    {icon}
                    {name}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels>
                {categories.map(({ name, component }) => (
                  <Tab.Panel
                    key={name}
                    className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4 shadow-inner transition"
                  >
                    {component}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Footer */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-black to-gray-900 text-white font-medium px-6 py-2 rounded-lg shadow hover:from-gray-800 hover:to-black transition-all"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>

  );
}
