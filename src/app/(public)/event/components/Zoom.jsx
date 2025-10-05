import { Video } from "lucide-react";
import React from "react";

export default function Zoom() {
  const [data, setData] = React.useState({
    ZoomUrl: "",
    ZoomId: "",
    ZoomPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Video className="w-6 h-6 text-blue-400" />
        <p className="text-sm text-zinc-300">
          Connect with Zoom to automatically generate Zoom meetings
        </p>
      </div>

      {/* Connect Button */}
      <button className="w-full mt-2 mb-6 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-200 px-4 py-2 rounded-lg">
        Connect Zoom
      </button>

      {/* Manual Entry Title */}
      <p className="text-sm text-zinc-400 mb-4">Or enter meeting information manually:</p>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Zoom URL */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Zoom Meeting URL *</label>
          <input
            type="text"
            name="ZoomUrl"
            value={data.ZoomUrl}
            placeholder="Enter Zoom meeting URL"
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Zoom ID */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Zoom Meeting ID *</label>
          <input
            type="text"
            name="ZoomId"
            value={data.ZoomId}
            placeholder="Enter Zoom meeting ID"
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Zoom Password */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Zoom Meeting Password *</label>
          <input
            type="text"
            name="ZoomPassword"
            value={data.ZoomPassword}
            placeholder="Enter Zoom meeting password"
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
