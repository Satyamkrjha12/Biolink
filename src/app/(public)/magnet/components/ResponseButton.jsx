"use client";
import { ArrowUpRight, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ResponseButton({ userId, formId }) {
    const [data, setData] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/formFill?userId=${userId}&formId=${formId}`);
                const result = await response.json();

                if (result.success) {
                    setData(result.data || []);
                } else {
                    setData([]);
                }

            } catch (err) {
                console.error("Failed to fetch form data:", err);
                setData([]);
            }
        };

        fetchData();
    }, [userId, formId]);

    return (
        <div className='flex cursor-pointer' onClick={() => router.push(`/magnet/form-response/${formId}`)} >
            <div
                className="flex gap-1.5 items-center px-1 rounded-full
             bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700
             border border-gray-500 shadow-sm
             hover:from-gray-800 hover:via-gray-700 hover:to-gray-800
             hover:shadow-md hover:-translate-y-0.5
             transition-all duration-300 cursor-pointer select-none group"
            >
                <Users className="text-white w-4 h-4 transition-transform duration-300 group-hover:scale-110" />

                <p className="text-sm text-white font-medium tracking-wide">
                    {data.length > 0 && data[0]?.ResponseNumber ? data[0].ResponseNumber : "0"}
                </p>

                <ArrowUpRight className="text-white w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>


        </div>

    );
}
