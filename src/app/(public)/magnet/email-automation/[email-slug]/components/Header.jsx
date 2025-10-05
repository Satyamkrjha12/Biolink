"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function Header({ data, updateField, userId }) {
    const router = useRouter();

    useEffect(()=>{
        console.log("header load :" , data);
    })

    const handleToggleStatus = async () => {
        try {
            const payload = {
                formId: data.formId,
                userId,
                EmailStatus: !data.emailStatus, // ✅ match backend (capital E)
                subject: data.subject,
                preview: data.preview,
                body: data.body,
            };
            console.log("from Header ", data);

            const res = await fetch("/api/EmailForm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const responseData = await res.json();

            if (res.ok) {
                updateField("EmailStatus", !data.emailStatus); // ✅ toggle correctly
                console.log("✅ Email saved:", responseData);
            } else {
                console.error("❌ Error:", responseData.message);
            }
        } catch (error) {
            console.error("⚠️ Server Error:", error);
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-900 via-black to-indigo-900 text-white px-6 py-4 shadow-lg border-b border-gray-800 flex items-center justify-between">
            <button
                onClick={() => router.push("/magnet")}
                className="p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-all duration-200 shadow-md"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>

            <h1 className="text-lg sm:text-xl font-semibold text-center tracking-wide drop-shadow-md">
                ✨ Automate Email Response
            </h1>

            <button
                onClick={handleToggleStatus}
                className={`px-4 py-2 rounded-lg transition-all duration-200 shadow-md font-medium text-sm ${data.emailStatus
                        ? "bg-red-600 hover:bg-red-500"
                        : "bg-emerald-600 hover:bg-emerald-500"
                    }`}
            >
                {data.emailStatus ? "Disable" : "Enable"}
            </button>

        </header>
    );
}
