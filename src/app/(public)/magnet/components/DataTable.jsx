"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import ResponseButton from "./ResponseButton";
import EmailAutomationButton from "./EmailAutomationButton";

export default function DataTable() {
  const router = useRouter();
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/form?userId=" + globalThis.Id);
        const result = await response.json();

        if (!Array.isArray(result)) {
          setFormData([]);
          return;
        }

        // Optional cleanup here too (just in case)
        const cleaned = result.map((item) => ({
          ...item,
          formImage: item.formImage || null,
        }));

        setFormData(cleaned);

      } catch (err) {
        console.error("Failed to fetch form data:", err);
        setFormData([]);
      }
    };

    fetchData();
  }, []);


  const handleSave = async (p) => {
    try {
      const payload = {
        userId: globalThis.Id,
        formId: p.formId,
        formSlug: p.formSlug,
        formStatus: !p.formStatus,
        formTitle: p.formTitle,
        formDescription: p.formDescription,
        formCTA: p.formCTA,
        formImage: p.formImage,
      };


      const response = await fetch("/api/form", {
        method: "PUT",
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

      // Option 1: Re-fetch updated data
      const updated = await fetch("/api/form?userId=" + globalThis.Id);
      const updatedData = await updated.json();
      setFormData(Array.isArray(updatedData) ? updatedData : []);
    } catch (error) {
      console.error("Error saving form:", error.message);
    }
  };

  const HandleDelete = async (p) => {
    try {
      const res = await fetch(`/api/form?formId=${p.formId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Form deleted successfully");
        // Optionally refresh the list
        setFormData((prev) => {
          const safePrev = Array.isArray(prev) ? prev : [];
          return safePrev.filter((item) => item.formId !== p.formId);
        });

      } else {
        alert(data.error || "Failed to delete form");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong");
    }
  };


  return (
    <div className="min-h-screen bg-[#0d0d0d] p-8 text-white font-sans">
      <div className="overflow-x-auto rounded-2xl backdrop-blur-md bg-white/5 shadow-2xl border border-zinc-800">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-900/60 border-b border-zinc-800">
            <tr className="text-left text-gray-300 uppercase tracking-wider text-xs">
              <th className="px-5 py-4">Image</th>
              <th className="px-5 py-4">Form Title</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Automation</th>
              <th className="px-5 py-4">Responses</th>
              <th className="px-5 py-4">Publish</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(formData) &&
              formData.map((p, index) => (
                <tr
                  key={index}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 hover:shadow-[0_0_20px_rgba(0,255,200,0.2)] transition-all duration-300"
                >
                  {/* Image Column */}
                  <td className="px-5 py-4">
                    {p.formImage && (
                      <div className="p-[2px] rounded-full ">
                        <img
                          src={p.formImage}
                          alt="Form"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>
                    )}
                  </td>

                  {/* Title Column */}
                  <td className="px-5 py-4">
                    <span className="font-semibold text-lg text-white">
                      {p.formTitle}
                    </span>
                  </td>

                  {/* Current Status Column */}
                  <td className="px-5 py-4 flex items-center"> {p.formStatus === true ? (<span className="flex items-center gap-2 text-green-400 font-medium"> <span className="w-2 h-2 rounded-full bg-green-400" /> Done </span>) : (<span className="flex items-center gap-2 text-yellow-400 font-medium"> <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" > <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /> </svg> In Process </span>)} </td>


                  {/* Previous Status Column */}
                  <td className="px-5 py-4">
                    <EmailAutomationButton formId={p.formId} />
                  </td>

                  {/* Responses Column */}
                  <td className="px-5 py-4">
                    <ResponseButton userId={p.userId} formId={p.formId} />
                  </td>

                  {/* Publish Button Column */}
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleSave(p)}
                      className={`px-4 py-2 rounded-lg font-medium text-white shadow-md transition-all duration-300 ${p.formStatus
                        ? "bg-gradient-to-r from-red-500 to-red-700 hover:shadow-lg hover:scale-105"
                        : "bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-lg hover:scale-105"
                        }`}
                    >
                      {p.formStatus ? "Unpublish" : "Publish"}
                    </button>
                  </td>

                  {/* Delete Icon Column */}
                  <td className="px-5 py-4">
                    <Trash
                      onClick={() => HandleDelete(p)}
                      className="text-red-400 hover:text-red-500 hover:scale-110 transition-transform duration-200 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>


  );
}
