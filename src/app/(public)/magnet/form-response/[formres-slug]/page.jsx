"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ResponseTable from "./components/ResponseTable";

export default function Page() {
    const userId = globalThis.Id || "1"; // Prevent undefined errors
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const pathname = window.location.pathname;
        const formId = pathname.split("/").pop();
        console.log(formId);
        console.log(userId);

        if (!userId || !formId) {
            console.error("Missing userId or formId");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/formFill?userId=${userId}&formId=${formId}`);
                const result = await response.json();
                console.log(result);

                if (result.success) {
                    setData(result.data || []);
                } else {
                    setData([]);
                }
            } catch (err) {
                console.error("Failed to fetch form data:", err);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    return (
        <div>
            <Header title={data.length > 0 ? data[0].formTitle : "Form Detail"} />

            <ResponseTable info={data} />
        </div>
    );
}
