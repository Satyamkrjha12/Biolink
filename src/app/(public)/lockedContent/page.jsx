"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

export default function PublishContentPage() {
    const referimg = useRef(null);
    const refervideo = useRef(null);
    const referFile = useRef(null);

    const [Data, setData] = useState({
        image: null,
        video: null,
        file: null,
        title: "",
        category: "",
        price: "",
        message: "",
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const field = e.target.name; // name="image", "video", or "file"

        if (file) {
            setData((prev) => ({
                ...prev,
                [field]: file,
            }));
        }
    };
    const router = useRouter();

    return (
        < >
            <div className="bg-[#1e0034] text-white w-full p-4">
                <ArrowLeft onClick={() => { router.push("/store") }} className="cursor-pointer"/>
            </div>
            <div className="h-screen bg-[#1e0034] text-white p-6 flex justify-center items-center">
                <div className="w-full h-4/5 flex flex-col md:flex-row items-stretch">
                    {/* Left Content Upload Area */}
                    <div className="flex-1 bg-violet-600 p-6 rounded-l-2xl h-full flex flex-col justify-center shadow-xl">
                        <div className="w-full md:w-4/5 m-auto bg-gray-900 p-6 rounded-2xl">
                            <h2 className="text-xl font-semibold mb-4">
                                Write or Upload content you would like to sell
                            </h2>
                            <textarea
                                name="message"
                                rows={6}
                                placeholder="Type your hidden message here"
                                className="w-full p-4 bg-black text-white rounded-lg border border-gray-700 resize-none mb-4"
                                value={Data.message}
                                onChange={(e) =>
                                    setData({ ...Data, message: e.target.value })
                                }
                            />

                            <div className="flex justify-between space-x-4">
                                {/* Image Upload */}
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    ref={referimg}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => referimg.current.click()}
                                    className="flex-1 bg-transparent border border-blue-500 text-blue-400 rounded-lg px-4 py-2 hover:bg-blue-500 hover:text-white transition"
                                >
                                    📷 Image
                                </button>

                                {/* Video Upload */}
                                <input
                                    type="file"
                                    name="video"
                                    accept="video/*"
                                    onChange={handleFileChange}
                                    ref={refervideo}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => refervideo.current.click()}
                                    className="flex-1 bg-transparent border border-blue-500 text-blue-400 rounded-lg px-4 py-2 hover:bg-blue-500 hover:text-white transition"
                                >
                                    🎥 Video
                                </button>

                                {/* File Upload */}
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    ref={referFile}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => referFile.current.click()}
                                    className="flex-1 bg-transparent border border-blue-500 text-blue-400 rounded-lg px-4 py-2 hover:bg-blue-500 hover:text-white transition"
                                >
                                    📄 File
                                </button>
                            </div>

                            <p className="text-sm text-gray-400 mt-4">
                                Whatever content you add in this box will only be accessible by
                                visitors when they complete the payment.
                            </p>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="flex-1 bg-black/70 p-6 rounded-r-2xl flex flex-col justify-center shadow-xl">
                        <h2 className="text-2xl font-bold mb-4">Publish Content</h2>
                        <p className="text-gray-300 mb-4 text-sm">
                            Give your content a title and a price to unlock. You can then
                            publish and share it.
                        </p>

                        <div className="mb-4">
                            <label className="block text-sm mb-1 font-medium">
                                Give your content a Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Type your title here"
                                className="w-full px-4 py-2 bg-black border border-gray-600 rounded-lg text-white"
                                value={Data.title}
                                onChange={(e) =>
                                    setData({ ...Data, title: e.target.value })
                                }
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm mb-1 font-medium">
                                Select Category *
                            </label>
                            <select
                                className="w-full px-4 py-2 bg-black border border-gray-600 rounded-lg text-white"
                                name="category"
                                value={Data.category}
                                onChange={(e) =>
                                    setData({ ...Data, category: e.target.value })
                                }
                            >
                                <option value="">Select Category</option>
                                <option value="ebooks">eBooks</option>
                                <option value="templates">Templates</option>
                                <option value="videos">Videos</option>
                                <option value="art">Art</option>
                                <option value="courses">Courses</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm mb-1 font-medium">
                                Set an unlock price *
                            </label>
                            <div className="flex items-center space-x-2">
                                <span className="text-xl">₹</span>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Enter price"
                                    className="flex-1 px-4 py-2 bg-black border border-gray-600 rounded-lg text-white"
                                    value={Data.price}
                                    onChange={(e) =>
                                        setData({ ...Data, price: e.target.value })
                                    }
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                Set a price visitors would pay to view this content
                            </p>
                        </div>

                        <details className="mb-6">
                            <summary className="cursor-pointer text-sm text-blue-400">
                                ADVANCED SETTINGS
                            </summary>
                            <p className="text-xs text-gray-400 mt-2">
                                Additional options can be added here if needed.
                            </p>
                        </details>

                        <button className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 rounded-full font-semibold hover:opacity-90 transition">
                            Publish Content
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
