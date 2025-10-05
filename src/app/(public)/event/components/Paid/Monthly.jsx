"use client";

import React, { useState } from "react";
import { Clock, CalendarDays } from "lucide-react";

export default function Monthly() {
  const [startDate, setStartDate] = useState("2025-07-30");
  const [endDate, setEndDate] = useState("2025-08-29");

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-lg font-semibold">Session timings</h2>

      {/* Time Inputs */}
      <div className="flex gap-4">
        {["21:45", "22:15"].map((time, i) => (
          <div key={i} className="flex items-center gap-2 border border-zinc-600 bg-zinc-700 px-3 py-2 rounded w-full">
            <Clock className="w-4 h-4 text-zinc-400" />
            <input
              type="time"
              defaultValue={time}
              className="outline-none bg-transparent text-white w-full"
            />
          </div>
        ))}
      </div>

      {/* Start Date */}
      <div>
        <label className="block font-medium mb-1">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full bg-zinc-700 text-white border border-zinc-600 px-4 py-2 rounded"
        />
      </div>

      {/* On Every */}
      <div>
        <label className="block font-medium mb-1">On every</label>
        <select className="w-full bg-zinc-700 text-white border border-zinc-600 px-4 py-2 rounded">
          <option>On every 30th</option>
        </select>
      </div>

      {/* End Date */}
      <div>
        <label className="block font-medium mb-1">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full bg-zinc-700 text-white border border-zinc-600 px-4 py-2 rounded"
        />
      </div>

      {/* Footer */}
      <div className="text-sm bg-yellow-100 text-yellow-900 p-4 rounded">
        1 session will be added occurring monthly on every <strong>30th</strong> of the month from{" "}
        <strong>Wed, Jul 30, 2025</strong> to <strong>Fri, Aug 29, 2025</strong>
      </div>
    </div>
  );
}
