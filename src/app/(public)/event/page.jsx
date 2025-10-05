"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import EventTimeDetailsForm from "./components/EventTimeDetailsForm";
import EventDetailForm from "./components/EventDetailForm";

export default function EventBuilder() {
  const [data, setData] = useState({
    eventTitle: "Your Event Title Here",
    description:
      "Describe your event to let attendees know what to expect. Include highlights like the purpose, key activities, or notable speakers. Make it engaging and informative to generate interest and excitement.",
    ctaText: "Register Now",
    EventCoverImg: "",
    videoUrl: "",
    mediaPreview: null,
  });

  const [timeSection, setTimeSection] = useState(false);
  const router = useRouter();

  const handleDataFromChild = (childData) => {
    setData(childData);
  };

  const isVideo = (src) => {
    return (
      src &&
      (src.endsWith(".mp4") ||
        src.endsWith(".webm") ||
        src.endsWith(".ogg") ||
        src.includes("video"))
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      {/* Left: Form Section */}
      <div className="w-full lg:w-1/2 bg-white text-black relative">
        <div className="flex flex-col h-screen">

          {/* Fixed Header */}
          <div className="px-8 py-5 border-b fixed top-0 left-0 right-1/2 bg-gray-900 shadow-inner  text-white  shadow-blue-950 z-10">
            <div className="flex items-center gap-3">
              <ArrowLeft
                onClick={() => router.push("/store")}
                className="cursor-pointer hover:text-blue-600"
              />
              <h2 className="text-xl font-semibold">Tell us about your Event</h2>
            </div>
          </div>

          {/* Scrollable Form */}
          <div className="flex-1 overflow-y-auto bg-gray-950 text-white">
            {timeSection ? (
              <EventTimeDetailsForm />
            ) : (
              <EventDetailForm sendParentData={handleDataFromChild} />
            )}
          </div>

          {/* Fixed Footer */}
          <div className="px-8 py-4 border-t fixed bottom-0 left-0 right-1/2 bg-gray-900 shadow-inner  text-white shadow-blue-950 z-10 flex justify-end">
            <button
              onClick={() => setTimeSection(!timeSection)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="w-full lg:w-1/2 p-10 bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-full max-w-xl bg-[#16161a] rounded-2xl p-8 shadow-xl text-white space-y-6">
          {data.mediaPreview && (
            <div className="rounded-md overflow-hidden mb-4">
              {isVideo(data.mediaPreview) ? (
                <video
                  src={data.mediaPreview}
                  controls
                  className="w-full max-h-60 rounded-md"
                />
              ) : (
                <img
                  src={data.mediaPreview}
                  alt="Preview"
                  className="w-full object-cover max-h-60 rounded-md"
                />
              )}
            </div>
          )}
          <h1 className="text-3xl font-bold">{data.eventTitle}</h1>
          <p className="text-sm text-gray-400">{data.description}</p>

          <div className="bg-black p-4 rounded-lg flex flex-col gap-3">
            <p className="text-white text-sm">💬 Live Preview</p>
            <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
              {data.ctaText}
            </button>
            <button className="text-xs text-blue-400 hover:underline self-start mt-1">
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
