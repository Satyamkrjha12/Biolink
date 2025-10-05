"use client";

import React, { useState } from "react";
import { CalendarDays, Clock, X } from "lucide-react";
import Zoom from "./Zoom";
import OfflineLocation from "./OfflineLocation";
import VirtualLink from "./VirtualLink";
import PaidModal from "./Paid/PaidModal";

export default function EventTimeDetailsForm() {
  const [form, setForm] = useState({
    url: "",
    id: "",
    password: "",
    ticketType: "",
  });

  const [EventLocation, setEventLocation] = useState("Zoom");
  const [errors, setErrors] = useState({
    url: true,
    id: true,
    password: true,
    ticketType: true,
  });

  const [sessions, setSessions] = useState([
    { date: "2025-07-28", startTime: "13:00", endTime: "13:30" },
  ]);

  const handleInputChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: !value }));
  };

  const handleSessionChange = (index, field, value) => {
    const updated = [...sessions];
    updated[index][field] = value;
    setSessions(updated);
  };

  const addSession = () => {
    setSessions((prev) => [...prev, { date: "", startTime: "", endTime: "" }]);
  };

  const removeSession = (index) => {
    setSessions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="overflow-y-auto mt-[72px] mb-[72px] px-6 py-6 w-full max-w-3xl mx-auto bg-black text-white">
      <div className="space-y-10">

        {/* === Event Time === */}
        <section className="bg-[#111111] p-6 rounded-2xl shadow-xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            📅 When is your event happening?
          </h2>

          <div className="flex flex-col gap-4">
            {sessions.map((session, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center gap-4 border border-gray-800 bg-[#1a1a1a] p-4 rounded-xl relative"
              >
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={session.date}
                    onChange={(e) => handleSessionChange(index, "date", e.target.value)}
                    className="bg-[#0f0f0f] border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    value={session.startTime}
                    onChange={(e) => handleSessionChange(index, "startTime", e.target.value)}
                    className="bg-[#0f0f0f] border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    value={session.endTime}
                    onChange={(e) => handleSessionChange(index, "endTime", e.target.value)}
                    className="bg-[#0f0f0f] border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {sessions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSession(index)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={addSession}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              + New Session
            </button>
            <button
              type="button"
              className="border border-blue-600 text-blue-500 hover:bg-blue-800/20 px-4 py-2 rounded-lg text-sm transition"
            >
              + Recurring Series
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            🕒 Timezone: GMT+5:30 Asia/Calcutta
          </p>
        </section>

        {/* === Event Location === */}
        <section className="bg-[#111111] p-6 rounded-2xl shadow-xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">📍 Event Location</h2>

          <label className="block mb-2 text-sm font-medium text-gray-300">Select Location *</label>
          <select
            className="w-full bg-[#1a1a1a] border border-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={EventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          >
            <option value="Zoom">Zoom</option>
            <option value="Offline Location">Offline Location</option>
            <option value="Virtual Link">Virtual Link</option>
          </select>

          <div className="mt-4">
            {EventLocation === "Zoom" && <Zoom />}
            {EventLocation === "Offline Location" && <OfflineLocation />}
            {EventLocation === "Virtual Link" && <VirtualLink />}
          </div>
        </section>

        {/* === Ticket Type === */}
        <section className="bg-[#111111] p-6 rounded-2xl shadow-xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">🎟️ Ticket Type</h2>

          <div className="flex gap-4">
            <PaidModal />
            <button
              className="flex-1 px-4 py-2 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition"
            >
              Free
            </button>
          </div>

          {errors.ticketType && (
            <p className="text-xs text-red-500 mt-2">
              ⚠️ Create at least one ticket to proceed
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
