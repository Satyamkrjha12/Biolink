"use client";
import React, { useEffect, useState } from 'react'

export default function WhatsAppDm({Id}) {

    const [data, setData] = useState({
        userId: "",
        Phone: "",
        Message: "",
        WhatappStatus: false, // ✅ consistent everywhere
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/WhatAppQuick?userId=${Id}`);
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

    const openWhatsApp = (num, text) => {
        const formattedNum = num.replace(/\D/g, "");
        const link = `https://wa.me/${num}?text=${text}`;
        window.open(
            link ,
            "_blank"
        );
    };



    return (
        <div onClick={() => openWhatsApp(`${data.Phone}`, `${data.Message}`)}
            className="w-full mt-10 mx-10 max-w-sm bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                    <img
                        src="/Social Media Images/whatsapp.svg"
                        alt="WhatsApp"
                        className="w-12 h-12 rounded-full shadow-sm border border-green-300"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        WhatsApp
                        <span className="text-green-500 text-sm font-medium">● Active</span>
                    </h1>
                    <p className="text-sm text-gray-600">DM me anytime 🚀</p>
                </div>
            </div>
        </div>

    )
}
