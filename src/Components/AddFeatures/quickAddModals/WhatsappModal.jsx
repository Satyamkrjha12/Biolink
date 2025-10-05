"use client";

import { useEffect, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

export default function WhatsappModal() {
    const [isOpen, setIsOpen] = useState(false);

    const [data, setData] = useState({
        userId: "",
        Phone: "",
        Message: "",
        WhatappStatus: false, // ✅ consistent everywhere
    });

    const maxLength = 116;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.Phone || data.Phone.length < 10) {
            alert("Please enter a valid phone number.");
            return;
        }

        if (!data.Message || data.Message.trim() === "") {
            alert("Please enter a message.");
            return;
        }

        const payload = {
            userId: globalThis.Id,
            Phone: data.Phone,
            Message: data.Message,
            WhatappStatus: !Boolean(data.WhatappStatus), // ✅ fixed typo
        };

        try {
            const response = await fetch("/api/WhatAppQuick", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.success) {
                alert("Message sent successfully!");
                setData({ Phone: "", Message: "", WhatappStatus: false }); // ✅ reset
                setIsOpen(false);
            } else {
                alert("Failed to send message: " + result.error);
            }
        } catch (err) {
            console.error("Error sending WhatsApp message:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/WhatAppQuick?userId=${globalThis.Id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();

                if (result.success && result.data) {
                    setData({
                        userId: result.data.userId || "",
                        Phone: result.data.Phone || "",
                        Message: result.data.Message || "",
                        WhatappStatus: result.data.WhatappStatus ?? false,
                    });
                }
            } catch (error) {
                console.error("Error fetching WhatsApp data:", error);
            }
        };

        fetchData();
    }, []);



    return (
        <>
            {/* Trigger Card */}
            <div
                onClick={() => setIsOpen(true)}
                className="flex flex-col items-center justify-center gap-3 w-45 p-5 bg-black hover:bg-[#1a1a1a] dark:hover:bg-zinc-800 transition-all duration-300 rounded-xl cursor-pointer shadow-md hover:shadow-lg"
            >
                <div className="flex items-center justify-center w-16 h-16 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full shadow hover:bg-zinc-100 dark:hover:bg-zinc-700 transition">
                    <img src="./WhatsappBlock.47279229.svg" className="w-11 h-10" alt="WhatsApp Icon" />
                </div>
                <span className="text-sm font-medium text-white">WhatsApp Link</span>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg h-[85vh] overflow-y-auto bg-white dark:bg-zinc-900 text-black dark:text-white rounded-3xl p-6 shadow-2xl animate-fade-in">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-700 pb-4">
                            <h2 className="text-lg font-semibold">Add a WhatsApp Chat Link</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-bold text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Header Image */}
                        <div className="mt-4 rounded-xl overflow-hidden">
                            <img
                                src="/WhatsappModalBackgroundimg.png"
                                alt="WhatsApp Modal Background"
                                className="w-full h-auto object-cover rounded-xl shadow-lg"
                            />
                        </div>

                        {/* Learn More Panel */}
                        <div className="mt-6">
                            <Disclosure as="div" className="p-4 bg-green-200 dark:bg-green-600 rounded-2xl">
                                <DisclosureButton className="group flex w-full items-center justify-between">
                                    <span className="text-sm font-medium">⚡️ Learn more about this.</span>
                                    <ChevronDownIcon className="size-5 text-black dark:text-white group-data-open:rotate-180 transition-transform duration-300" />
                                </DisclosureButton>
                                <DisclosurePanel className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                                    Create a WhatsApp chat link with your number and a custom message that users can send directly to you—no need for them to save your number.
                                </DisclosurePanel>
                            </Disclosure>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-medium mb-1">WhatsApp number *</label>
                                <PhoneInput
                                    country="in"
                                    value={data.Phone}
                                    onChange={(value) => setData({ ...data, Phone: value })}
                                    inputClass="!w-full !border !rounded-md !px-3 !py-2 !text-black"
                                    buttonClass="!border !border-r-0"
                                    containerClass="!w-full"
                                    inputProps={{ required: true }}
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Default message *</label>
                                <textarea
                                    required
                                    value={data.Message}
                                    maxLength={maxLength}
                                    onChange={(e) => setData({ ...data, Message: e.target.value })}
                                    placeholder="Type a default message users will send you..."
                                    className="w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
                                    rows={3}
                                />
                                <p className="text-right text-xs text-gray-500 mt-1">
                                    {data.Message.length}/{maxLength}
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-md transition-all"
                            >
                                ➕ Add WhatsApp Chat Link
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
