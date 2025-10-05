"use client";
import { Phone } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function MagForm({ Id }) {
    const [formData, setFormData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formFields, setFormFields] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (!selectedItem?.formId) return;

        setFormFields((prev) => ({
            ...prev,
            [selectedItem.formId]: {
                ...prev[selectedItem.formId],
                [name]: value,
                formId: selectedItem.formId,
                userId: selectedItem.userId,
            },
        }));
    };

    const openForm = (item) => {
        setSelectedItem(item);

        setFormFields((prev) => ({
            ...prev,
            [item.formId]: prev[item.formId] || {
                formId: item.formId,
                userId: item.userId,
                Name: "",
                Email: "",
                Phone: "",
                Message: "",
                ResponseNumber: "",
            },
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/form?userId=${Id}`);
                const result = await response.json();

                if (!Array.isArray(result)) {
                    console.error("Expected an array but got:", result);
                    setFormData([]);
                    return;
                }

                const cleaned = result.map((item) => ({
                    ...item,
                    formImage: item.formImage || null,
                }));

                setFormData(cleaned);

                if (result.length === 0) {
                    console.warn("No form data found for userId:", Id);
                }
            } catch (err) {
                console.error("Failed to fetch form data:", err);
                setFormData([]);
            }
        };

        fetchData();
    }, [Id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedItem?.formId) return;

        const formDataToSubmit = {
            ...formFields[selectedItem.formId],
            userId: selectedItem.userId,
            formId: selectedItem.formId,
            formTitle: selectedItem.formTitle
        };

        try {
            const response = await fetch("/api/formFill", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataToSubmit),
            });

            const result = await response.json();

            if (result.success) {
                console.log("Form submitted successfully:", result.data);

                // ✅ Reset form fields
                setFormFields((prev) => ({
                    ...prev,
                    [selectedItem.formId]: {
                        ...prev[selectedItem.formId],
                        Name: "",
                        Email: "",
                        Phone: "",
                        Message: "",
                    },
                }));

                // ✅ Close modal
                setSelectedItem(null);
            } else {
                console.error("Form submission failed:", result.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {formData.map((item) =>
                    item.formStatus === true ? (
                        <div
                            key={item._id || item.id}
                            onClick={() => openForm(item)}
                            className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200"
                        >
                            <img
                                src={item.formImage || "/default-img/form-placeholder.jpg"}
                                alt={item.name || "Form"}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white">
                                    {item.formTitle}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    {item.name || "Untitled"}
                                </p>
                            </div>
                        </div>
                    ) : null
                )}
            </div>


            {/* Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-lg h-[80vh] overflow-y-auto rounded-2xl bg-[#16161a] p-6 shadow-2xl border border-zinc-800">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-zinc-700 pb-4 mb-6">
                            <h2 className="text-xl font-semibold text-white">
                                Fill The Form
                            </h2>
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="text-2xl font-bold text-zinc-400 hover:text-white transition"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Form Details */}
                        <div className="text-gray-300">
                            <div className="flex gap-4 items-center bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 mb-6">
                                <img
                                    src={selectedItem.formImage || "/default-img/form-placeholder.jpg"}
                                    alt={selectedItem.formTitle}
                                    className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-500/40 shadow-md"
                                />
                                <div>
                                    <p className="text-white font-medium text-lg leading-tight">
                                        {selectedItem.formTitle}
                                    </p>
                                    <p className="text-sm text-gray-400 line-clamp-1">
                                        {selectedItem.formDescription}
                                    </p>
                                </div>
                            </div>

                            {/* ✅ Fixed Form Submit */}
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {["Name", "Email", "Phone", "Message"]
                                    .filter((field) => {
                                        if (field === "Email" && selectedItem.collectEmail === false) {
                                            return false;
                                        }
                                        if (field === "Phone" && selectedItem.collectPhone === false) {
                                            return false;
                                        }
                                        return true;
                                    })
                                    .map((field) => (
                                        <div key={field}>
                                            <label
                                                htmlFor={field}
                                                className="block text-sm font-medium text-gray-300 mb-1"
                                            >
                                                {field === "Email"
                                                    ? "Email Address"
                                                    : field === "Phone"
                                                        ? "Phone Number"
                                                        : field}
                                            </label>

                                            {field === "Message" ? (
                                                <textarea
                                                    id={field}
                                                    name={field}
                                                    value={formFields[selectedItem.formId]?.[field] || ""}
                                                    onChange={handleInputChange}
                                                    rows="4"
                                                    className="block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md 
                                                    focus:outline-none focus:ring-2 focus:ring-purple-500 
                                                    focus:border-purple-500 placeholder-gray-500 text-white"
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    id={field}
                                                    name={field}
                                                    value={formFields[selectedItem.formId]?.[field] || ""}
                                                    onChange={handleInputChange}
                                                    className="block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md 
                                                    focus:outline-none focus:ring-2 focus:ring-purple-500 
                                                    focus:border-purple-500 placeholder-gray-500 text-white"
                                                />
                                            )}
                                        </div>
                                    ))}

                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-medium 
                                    hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
