"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Pencil, Trash2 } from "lucide-react";

export default function AddSocialMedia({ SocialMedia, sendDataParent, initialValues }) {
  const [account, setAccount] = useState({});
  const [editing, setEditing] = useState({});
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const initialState = Object.fromEntries(SocialMedia.map(p => [p.name, initialValues?.[p.name] || ""]));
    setAccount(initialState);
    setInputValues(initialState);
  }, [SocialMedia, initialValues]);

  const handleEdit = (platformName) => {
    setEditing((prev) => ({ ...prev, [platformName]: true }));
  };

  const handleSave = (platformName) => {
    const updated = { ...account, [platformName]: inputValues[platformName] };
    setAccount(updated);
    setEditing((prev) => ({ ...prev, [platformName]: false }));
    sendDataParent(updated);
  };

  const handleDelete = (platformName) => {
    const updated = { ...account, [platformName]: "" };
    setAccount(updated);
    setInputValues((prev) => ({ ...prev, [platformName]: "" }));
    setEditing((prev) => ({ ...prev, [platformName]: false }));
    sendDataParent(updated);
  };

  const handleInputChange = (platformName, value) => {
    setInputValues((prev) => ({ ...prev, [platformName]: value }));
  };

  return (
    <div className="space-y-3">
      {SocialMedia.map((p) => {
        const isEditing = editing[p.name] || !account[p.name];
        return (
          <div key={p.name} className="w-full">
            {isEditing ? (
              <div className="flex gap-3 items-center w-full">
                <img src={p.pic} alt={p.name} className="w-8 h-8" />
                <input
                  type="text"
                  value={inputValues[p.name] || ""}
                  onChange={(e) => handleInputChange(p.name, e.target.value)}
                  placeholder={`Enter your ${p.name} link`}
                  className="block w-full px-3 py-1.5 text-sm text-white bg-gray-800 rounded"
                />
                <button
                  onClick={() => handleSave(p.name)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2 rounded-md justify-between w-full bg-gray-100 dark:bg-gray-800">
                <div className="flex items-center gap-4">
                  <img src={p.pic} alt={p.name} className="w-8 h-8" />
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{p.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-blue-500 cursor-pointer" onClick={() => handleEdit(p.name)} />
                  <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => handleDelete(p.name)} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

AddSocialMedia.propTypes = {
  SocialMedia: PropTypes.array.isRequired,
  sendDataParent: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};
