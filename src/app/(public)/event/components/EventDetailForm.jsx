import React, { useRef, useState } from "react";

export default function EventDetailForm({ sendParentData }) {
  const [data, setData] = useState({
    eventTitle: "Your Event Title Here",
    description:
      "Describe your event to let attendees know what to expect. Include highlights like the purpose, key activities, or notable speakers. Make it engaging and informative to generate interest and excitement.",
    ctaText: "Register Now",
    EventCoverImg: "",
    videoUrl: "",
  });

  const [mediaPreview, setMediaPreview] = useState(null);
  const eventInput = useRef();

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isImage = file.type.startsWith("image");
      const preview = URL.createObjectURL(file);
      setData((prev) => ({
        ...prev,
        EventCoverImg: file,
        videoUrl: "",
      }));
      setMediaPreview(isImage ? preview : null);
      sendParentData({
        ...data,
        EventCoverImg: file,
        videoUrl: "",
        mediaPreview: isImage ? preview : null,
      });
    }
  };

  const handleVideoAdd = () => {
    setData((prev) => ({
      ...prev,
      videoUrl: prev.videoUrl,
      EventCoverImg: "",
    }));
    setMediaPreview(data.videoUrl);
    sendParentData({
      ...data,
      videoUrl: data.videoUrl,
      EventCoverImg: "",
      mediaPreview: data.videoUrl,
    });
  };

  const handleDataChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
    sendParentData({ ...data, [key]: value, mediaPreview });
  };

  return (
    <div className="overflow-y-auto mt-[72px] mb-[64px] px-8 py-6 w-full max-w-3xl mx-auto bg-[#111] text-white rounded-xl shadow-lg space-y-8">
      {/* Event Title */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Event Title *
        </label>
        <input
          value={data.eventTitle}
          onChange={(e) => handleDataChange("eventTitle", e.target.value)}
          maxLength={75}
          className="w-full rounded-md bg-zinc-900 border border-zinc-700 p-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Event Title Here"
        />
        <p className="text-xs text-gray-500 text-right mt-1">
          {data.eventTitle.length}/75
        </p>
      </div>

      {/* Cover Upload */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Cover Image/Video *
        </label>
        <input
          type="file"
          accept="image/*,video/*"
          ref={eventInput}
          className="hidden"
          onChange={handleMediaChange}
        />
        <div
          onClick={() => eventInput.current.click()}
          className="cursor-pointer border-2 border-dashed border-zinc-600 bg-zinc-900 hover:border-blue-500 rounded-md p-6 text-center transition"
        >
          <p className="text-sm text-gray-400 mb-1">Click or drag & drop</p>
          <p className="text-xs text-gray-500">
            1280 x 720 (16:9) recommended; Max 10 MB
          </p>
        </div>

        {mediaPreview && (
          <div className="mt-4">
            {data.videoUrl ? (
              <video
                src={mediaPreview}
                controls
                className="w-full rounded-md object-cover max-h-48 border border-zinc-600"
              />
            ) : (
              <img
                src={mediaPreview}
                alt="Preview"
                className="w-full rounded-md object-cover max-h-48 border border-zinc-600"
              />
            )}
          </div>
        )}

        <div className="my-4 text-center text-sm text-gray-500">OR</div>

        <div className="flex gap-2">
          <input
            placeholder="Enter video URL"
            value={data.videoUrl}
            onChange={(e) => handleDataChange("videoUrl", e.target.value)}
            className="flex-grow border border-zinc-700 bg-zinc-900 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleVideoAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Description *
        </label>
        <textarea
          rows={6}
          value={data.description}
          onChange={(e) => handleDataChange("description", e.target.value)}
          className="w-full rounded-md bg-zinc-900 border border-zinc-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* CTA Button */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          CTA Button *
        </label>
        <input
          value={data.ctaText}
          onChange={(e) => handleDataChange("ctaText", e.target.value)}
          maxLength={25}
          className="w-full rounded-md bg-zinc-900 border border-zinc-700 p-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Register Now"
        />
        <p className="text-xs text-gray-500 text-right mt-1">
          {data.ctaText.length}/25
        </p>
      </div>

      {/* Optional Sections */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Optional Sections
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["Gallery", "Testimonials", "FAQ", "About Me", "Showcase Products"].map(
            (opt) => (
              <button
                key={opt}
                className="border border-zinc-600 bg-zinc-800 hover:bg-zinc-700 text-sm px-4 py-2 rounded-md text-white transition"
              >
                {opt}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
