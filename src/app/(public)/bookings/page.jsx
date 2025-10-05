'use client';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineVideoCall } from 'react-icons/md';
import { SiZoom, SiGooglecalendar } from 'react-icons/si';

export default function ConnectGoogleAccount() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-12">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-4 mb-10 text-gray-600 text-sm font-medium">
        <span className="text-blue-600 font-semibold">● Google account</span>
        <span className="text-gray-400">›</span>
        <span>Availability</span>
        <span className="text-gray-400">›</span>
        <span>Customize</span>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl w-full">
        {/* Left Side */}
        <div className="max-w-md text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connect your Google account</h2>
          <p className="text-gray-600 mb-6">
            By connecting your Google account we can sync your GMeet and Google Calendar and ensure you have a seamless booking experience.
          </p>
          <button className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition">
            <FcGoogle className="text-lg" />
            Connect Google account
          </button>
        </div>

        {/* Right Side */}
        <div className="relative bg-blue-50 rounded-xl p-10 w-80 h-64 flex items-center justify-center">
          <div className="absolute top-6 left-6 bg-white p-2 rounded shadow">
            <SiZoom className="text-blue-600 text-2xl" />
          </div>
          <div className="absolute top-6 right-6 bg-white p-2 rounded shadow">
            <SiGooglecalendar className="text-yellow-500 text-2xl" />
          </div>
          <div className="absolute bottom-6 right-6 bg-white p-2 rounded shadow">
            <MdOutlineVideoCall className="text-green-500 text-2xl" />
          </div>
          <div className="bg-white rounded-full p-6 shadow-lg">
            <FcGoogle className="text-4xl" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-400 mt-12">
        Don’t worry, You can customise all of this later in the settings page.
      </p>
    </div>
  );
}
