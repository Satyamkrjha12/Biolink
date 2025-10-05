"use client";

import React from "react";
import AddfeatureModal from "@/Components/AddFeatures/AddfeatureModal.jsx";
import PersonalBio from "@/Components/BioComponents/PersonalBio";
import Header from "@/Components/Header";

export default function Store() {
  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-md bg-[#0b0f1a]/90 backdrop-blur">
        <Header />
      </div>

      {/* Main Content */}
      <div className="pt-24 min-h-screen pb-20 bg-gradient-to-br from-[#0a0e1a] via-[#11182e] to-black text-white px-4">
        <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
          {/* Left Panel */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="bg-[#121c30] p-6 rounded-2xl shadow-md border border-[#1c2b4a]">
              <PersonalBio />
            </div>
            <div className="flex justify-center">
              <AddfeatureModal />
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-1/2">
            <div className="bg-gradient-to-br from-[#11182e] to-[#0b0f1a] p-8 rounded-2xl shadow-lg border border-[#1c2b4a] h-full min-h-[300px]">
              <h2 className="text-xl font-semibold mb-4">Right Side Content</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                This section can include stats, feature previews, or anything else you want to show. You can replace this text with your actual content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
