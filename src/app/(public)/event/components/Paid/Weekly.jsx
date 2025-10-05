"use client";
import React, { useState } from "react";
import { CalendarDays, Clock } from "lucide-react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Weekly() {
  const [selectedDays, setSelectedDays] = useState(["Wed"]);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="space-y-6 text-white">
      {/* Select Days */}
      <div>
        <p className="font-semibold mb-2">On these days</p>
        <div className="flex gap-2 flex-wrap">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-3 py-1 rounded-full text-sm border transition-all ${
                selectedDays.includes(day)
                  ? "bg-blue-600 text-white border-blue-500"
                  : "bg-zinc-700 text-zinc-200 border-zinc-600"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Timings */}
      <div>
        <p className="font-semibold mb-2">Session timings</p>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Clock className="absolute left-2 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="time"
              defaultValue="21:45"
              className="bg-zinc-700 text-white pl-8 pr-3 py-2 border border-zinc-600 rounded-md"
            />
          </div>
          <span className="mx-1 text-zinc-400">-</span>
          <div className="relative">
            <Clock className="absolute left-2 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="time"
              defaultValue="22:15"
              className="bg-zinc-700 text-white pl-8 pr-3 py-2 border border-zinc-600 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Start & End Dates */}
      {["Start Date", "End Date"].map((label, idx) => (
        <div key={label}>
          <p className="font-semibold mb-2">{label}</p>
          <div className="relative">
            <CalendarDays className="absolute left-2 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="date"
              defaultValue={idx === 0 ? "2025-07-30" : "2025-08-05"}
              className="bg-zinc-700 text-white pl-8 pr-3 py-2 border border-zinc-600 rounded-md w-full"
            />
          </div>
        </div>
      ))}

      {/* Info Box */}
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 text-sm rounded-md p-3">
        1 session will be added occurring weekly on{" "}
        <b>{selectedDays.join(", ")}</b> from{" "}
        <b>Wed, Jul 30, 2025</b> to <b>Tue, Aug 05, 2025</b>
      </div>
    </div>
  );
}
