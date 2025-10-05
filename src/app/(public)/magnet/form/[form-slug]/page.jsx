"use client";

import {
    ArrowLeft,
    ChevronDown,
    ChevronUp,
    Mail,
    Phone,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";



export default function Page() {
    const router = useRouter();
    const inputFileRef = useRef(null);
    const [heading, setHeading] = useState("");

    const maxTitle = 50;
    const maxDescription = 80;
    const maxCTA = 25;
    const [isOpen, setIsOpen] = useState(false);

    const [data, setData] = useState({
        userId: globalThis.Id || "",
        FormId: "",
        FormSlug: "Basic",
        Title: "Get the 30 day Deep-dive E-Book",
        Description: "Unlock insights with this 30-day deep-dive e-book",
        CTA: "Get it now",
        Image: "/formbasicgift/basicForm.png",
        status: true,
        collectEmail: true,
        collectPhone: false,
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newData = { ...data, Image: reader.result };
                setData(newData);         // ✅ safe: inside FileReader callback
            };
            reader.readAsDataURL(file);    // 🔄 start reading
        } else {
            alert("Please select a valid image file");
        }
    };

    useEffect(() => {
        if (typeof window === "undefined") return;

        const pathname = window.location.pathname;
        const formSlug = pathname.split("/").pop();

        if (formSlug === "basic") {
            setHeading("Edit Basic Form");
        } else if (formSlug === "gift") {
            setData((prev) => ({
                ...prev,
                FormSlug: "Gift",
                Title: "Share the 30-day Deep-dive E-Book",
                Description: "Share this 30-day deep-dive e-book with a friend",
                CTA: "Send as Gift",
                Image: "/formbasicgift/giveaway.png",
            }));
            setHeading("");
        } else {
            router.push("/magnet");
        }
    }, []);


    const handleSave = async () => {
        try {
            const payload = {
                userId: globalThis.Id, // ✅ Send userId
                formId: data.FormId || "",
                formStatus: data.status || true, // ⬅️ Use data.status
                formSlug: data.FormSlug,
                formTitle: data.Title,
                formDescription: data.Description,
                formCTA: data.CTA,
                formImage: data.Image,
                collectEmail: data.collectEmail,
                collectPhone: data.collectPhone,
            };

            const response = await fetch("/api/form", {
                method: "PUT", // your backend uses PUT
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to save form data");
            }

            const result = await response.json();
            console.log("Form saved successfully:", result);
            router.push("/magnet");
        } catch (error) {
            console.error("Error saving form:", error.message);
        }
    };



    return (
        <div className="w-full min-h-screen overflow-y-auto flex items-center justify-center bg-black text-white p-10">
            <div className="max-w-md w-full bg-zinc-900 rounded-2xl shadow-xl p-6 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <ArrowLeft
                        className="cursor-pointer text-white hover:text-zinc-400 transition"
                        onClick={() => router.push("/magnet")}
                    />
                    <h1 className="text-lg font-semibold text-center w-full text-white">
                        {heading}
                    </h1>
                </div>

                {/* Preview Card */}
                <div className="bg-zinc-800 rounded-2xl p-6 text-center shadow border border-zinc-700">
                    {data.Image && (
                        <img
                            src={
                                data.Image && data.Image !== ""
                                    ? data.Image
                                    : data.FormSlug === "Gift"
                                        ? "/formbasicgift/giveaway.png"
                                        : "/formbasicgift/basicForm.png"
                            }
                            alt="Ebook Thumbnail"
                            className="w-24 mx-auto mb-4 rounded-md shadow-md"
                        />
                    )}
                    <div className="bg-zinc-900 p-4 rounded-xl shadow-md inline-block border border-zinc-700">
                        <h2 className="font-semibold text-sm text-white">{data.Title}</h2>
                        <p className="text-xs text-zinc-400 mt-1">{data.Description}</p>
                        <button className="mt-3 bg-white text-black px-4 py-1.5 rounded-full text-sm hover:bg-zinc-300 transition">
                            {data.CTA}
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    {/* Thumbnail Upload */}
                    <div>
                        <label className="font-medium text-sm mb-2 block text-white">
                            Thumbnail
                        </label>
                        <div className="flex items-center gap-4">
                            {data.Image && (
                                <img
                                    src={data.Image}
                                    alt="Thumbnail"
                                    className="w-14 h-14 rounded-md object-cover shadow-sm"
                                />
                            )}
                            <input
                                ref={inputFileRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => inputFileRef.current.click()}
                                    className="border border-zinc-600 text-white rounded-full px-4 py-1 text-sm hover:bg-zinc-800 transition"
                                >
                                    Change
                                </button>
                                <button
                                    onClick={() =>
                                        setData((prev) => ({ ...prev, Image: "" }))
                                    }
                                    className="border border-zinc-600 text-white rounded-full px-4 py-1 text-sm hover:bg-zinc-800 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Input Fields */}
                    {[
                        {
                            label: "Title",
                            key: "Title",
                            max: maxTitle,
                        },
                        {
                            label: "Short-description",
                            key: "Description",
                            max: maxDescription,
                        },
                        {
                            label: "CTA Button",
                            key: "CTA",
                            max: maxCTA,
                        },
                    ].map(({ label, key, max }, idx) => (
                        <div key={idx}>
                            <label className="block font-medium mb-1 text-white">
                                {label}
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={data[key]}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            [key]: e.target.value.slice(0, max),
                                        }))
                                    }
                                    className="w-full bg-zinc-800 text-white border border-zinc-600 rounded-lg px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                                />
                                <span className="absolute right-3 top-2 text-sm text-zinc-400">
                                    {data[key].length} / {max}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Disclosure */}
                    <div className="w-full max-w-sm mx-auto">
                        {/* Header */}
                        <div
                            className="flex justify-between items-center cursor-pointer py-2"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <p className="text-sm text-gray-200 font-medium">Developers Contact</p>
                            {isOpen ? (
                                <ChevronUp className="w-4 h-4 text-blue-200" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-blue-200" />
                            )}
                        </div>

                        {/* Dropdown content */}
                        {isOpen && (
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 text-pink-400 inline-block mr-2" />
                                        <span className="text-sm text-gray-300">Collect Email Address</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.collectEmail}
                                            onChange={() => setData((prev) => ({ ...prev, collectEmail: !prev.collectEmail }))}
                                            className="sr-only peer"
                                        />
                                        <div className="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-pink-400 transition-colors"></div>
                                        <div className="absolute left-1 top-1 bg-white w-2 h-2 rounded-full transition-transform peer-checked:translate-x-4"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 text-blue-300 inline-block mr-2" />
                                        <span className="text-sm text-gray-300">Collect Phone Number</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.collectPhone}
                                            onChange={() => setData((prev) => ({ ...prev, collectPhone: !prev.collectPhone }))}
                                            className="sr-only peer"
                                        />
                                        <div className="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-300 transition-colors"></div>
                                        <div className="absolute left-1 top-1 bg-white w-2 h-2 rounded-full transition-transform peer-checked:translate-x-4"></div>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>



                    {/* Submit Button */}
                    <div>
                        <button onClick={handleSave} className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
