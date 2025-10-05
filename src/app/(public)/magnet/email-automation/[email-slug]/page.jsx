"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import BodyWriter from "./components/BodyWriter";

export default function Page() {
  const [data, setData] = useState({
    subject: "",
    preview: "",
    body: "",
    emailStatus: false,
    formId: "",
    formTitle: "",
    formDescription: "",
    formImage: "",
  });

  // 🔹 Update any field dynamically
  const updateField = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
    console.log("After update Field :- ", data);
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    const EmailSlug = pathname.split("/").pop();

    updateField("formId", EmailSlug);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/EmailForm?userId=${globalThis.Id}&formId=${EmailSlug}`
        );
        const result = await response.json();
        console.log("get Api Data : ", result);

        if (!result.success || !Array.isArray(result.data) || result.data.length === 0) return;

        const item = result.data[0];
        console.log("Fetched:", item);

        setData((prev) => ({
          ...prev,
          subject: item.subject || "",
          preview: item.preview || "",
          body: item.body || "",
          emailStatus: item.EmailStatus || "",
          formTitle: item.formTitle || "",
          formDescription: item.formDescription || "",
          formImage: item.formImage || "",
        }));
      } catch (err) {
        console.error("Failed to fetch form data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100">
      <Header
        data={data}
        updateField={updateField}
        userId={globalThis.Id}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 pt-24 max-w-7xl mx-auto">
        {/* Left Side - Editor */}
        <div className="space-y-8 bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800">
          <div className="bg-indigo-900/40 border border-indigo-700 text-indigo-300 text-sm p-3 rounded-lg">
            ✉️ You can design the email which will be sent when someone submits the lead form.
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Subject line <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.subject}
              required
              onChange={(e) => updateField("subject", e.target.value)}
              placeholder="This is a subject line"
              maxLength={255}
              className="w-full border border-gray-700 rounded-lg px-3 py-2 text-sm bg-gray-800 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <p className="text-xs text-gray-500 mt-1">
              {data.subject.length}/255
            </p>
          </div>

          {/* Preview Line */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Preview line (optional)
            </label>
            <input
              type="text"
              value={data.preview}
              onChange={(e) => updateField("preview", e.target.value)}
              placeholder="This is a preview line"
              maxLength={75}
              className="w-full border border-gray-700 rounded-lg px-3 py-2 text-sm bg-gray-800 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <p className="text-xs text-gray-500 mt-1">
              {data.preview.length}/75
            </p>
          </div>

          {/* Email Body */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email body <span className="text-red-500">*</span>
            </label>
            <BodyWriter content={data.body} updateField={updateField} />
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="bg-gradient-to-br from-gray-950 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-800">
          <h2 className="text-gray-100 font-medium mb-4 text-lg">📩 Preview</h2>
          <div className="bg-gray-800 rounded-2xl p-6 max-w-lg mx-auto shadow-md border border-gray-700">
            <div className="text-center font-medium text-gray-200 mb-4">{data.formTitle}</div>
            <div className="bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-800">
              <div className="flex flex-col items-center justify-center text-center mb-4">
                {data.formImage && (
                  <img
                    src={data.formImage}
                    width={60}
                    height={60}
                    alt="Profile"
                    className="rounded-full shadow-md border border-gray-700 mb-2"
                  />
                )}
                <p className="text-gray-200 text-sm leading-snug">
                  {data.formDescription}
                </p>
              </div>


              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                {data.subject || "Subject goes here..."}
              </h3>
              {data.preview && <p className="text-sm text-gray-400 mb-4">{data.preview}</p>}

              <div
                className="text-gray-300 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: data.body || "<p>Start typing your email...</p>",
                }}
              />
              <hr className="my-4 border-gray-700" />
              <p className="text-xs text-gray-500 text-center">
                To no longer receive these emails, unsubscribe{" "}
                <a href="#" className="text-indigo-400 underline">here</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
