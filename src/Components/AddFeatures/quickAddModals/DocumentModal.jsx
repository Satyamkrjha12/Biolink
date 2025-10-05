"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function DocumentModal({ name, img, url }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [document, setDocument] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) setDocument(file);
    };

    return (
        <>
            {/* Trigger Card */}
            <div
                onClick={() => setIsOpen(true)}
                className="flex flex-col items-center justify-center gap-3 w-45  p-5 bg-black hover:bg-[#1a1a1a] dark:hover:bg-zinc-800 transition-all duration-300 rounded-xl cursor-pointer shadow-md hover:shadow-lg"
            >
                <div className="flex items-center justify-center w-16 h-16 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full shadow hover:bg-zinc-100 dark:hover:bg-zinc-700 transition">
                    <span className="text-3xl">📄</span>
                </div>
                <span className="text-sm font-medium text-white">Document</span>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-zinc-900 text-black dark:text-white p-6 shadow-2xl animate-fade-in">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-4 mb-4">
                            <h2 className="text-lg font-semibold">Upload Document Block</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-bold text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Upload Panel */}
                        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-600 p-4 mb-6 transition-all">
                            {!document ? (
                                <label
                                    htmlFor="document-upload"
                                    className="cursor-pointer w-full flex flex-col items-center justify-center px-4 py-6 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-center transition"
                                >
                                    <div className="text-4xl mb-2">📁</div>
                                    <p className="text-sm font-medium">Click to upload your PDF</p>
                                    <input
                                        id="document-upload"
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            ) : (
                                <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md shadow-inner">
                                    <div className="w-12 h-12 bg-red-500 text-white font-bold flex items-center justify-center rounded">
                                        PDF
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium truncate">{document.name}</h3>
                                        <p className="text-xs text-zinc-500">
                                            {(document.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-5">
                            <input
                                type="text"
                                placeholder="Block Title *"
                                className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <div>
                                <textarea
                                    placeholder="Description (optional)"
                                    className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    maxLength={180}
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <p className="text-xs text-right text-gray-500 mt-1">
                                    {description.length}/180
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className={`mt-6 w-full px-4 py-3 rounded-full text-white font-semibold transition-all ${title.trim()
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-zinc-400 cursor-not-allowed"
                                }`}
                            disabled={!title.trim()}
                        >
                            ➕ Add Document Block
                        </button>
                    </div>
                </div>
            )}
        </>

    );
}
