import React, { useState } from "react";

export default function OfflineLocation() {
  const [data, setData] = useState({
    Location: "",
    Address: "",
    City: "",
    State: "",
    Country: "",
    PinCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="mt-5 bg-zinc-900 p-6 rounded-2xl shadow-lg">
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Location & Landmark */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Location & Landmark <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Location"
            value={data.Location}
            placeholder="e.g. Near City Mall, MG Road"
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Address"
            value={data.Address}
            placeholder="Enter full address"
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="City"
            value={data.City}
            placeholder="City name"
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            State <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="State"
            value={data.State}
            placeholder="State name"
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Country"
            value={data.Country}
            placeholder="Country name"
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Pin Code */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Pin Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="PinCode"
            value={data.PinCode}
            placeholder="Enter pin/postal code"
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
