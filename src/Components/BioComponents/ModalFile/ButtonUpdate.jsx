"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Switch,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, Mail, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import clsx from "clsx";

export default function ButtonUpdate({ sendDataParent , Info }) {
  const session = [{ name: "All Sessions Page" }, { name: "A specific Session" }];

  const [data, setData] = useState({
    showContactDetails: false,
    bookingEnabled: false,
    showEmail: false,
    showPhone: false,
    email: "",
    phone: "",
    sessionSelected: "All Sessions Page",
  });

  useEffect(() => {
    setData({
      showContactDetails: Info.showContactDetails || false,
      bookingEnabled: Info.bookingEnabled || false,
      showEmail: Info.showEmail || false,
      showPhone: Info.showPhone || false,
      email: Info.email || "",
      phone: Info.phone || "",
      sessionSelected: Info.sessionSelected || "All Sessions Page",
    });
  }, [Info]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
    setData(updatedData);
    sendDataParent(updatedData);
  };

  const handleCheckboxChange = (name, checked) => {
    const updatedData = { ...data, [name]: checked };
    setData(updatedData);
    sendDataParent(updatedData);
  };

  const handlePhoneChange = (phone) => {
    if (data.showPhone) {
      const updatedData = { ...data, phone };
      setData(updatedData);
      sendDataParent(updatedData);
    }
  };

  const handleSessionSelect = (value) => {
    const updatedData = { ...data, sessionSelected: value };
    setData(updatedData);
    sendDataParent(updatedData);
  };

  return (
    <div className="space-y-4">
      {/* Contact Section */}
      <div className="bg-black/10 rounded-lg">
        <Disclosure as="div" className="p-3">
          {({ open }) => (
            <>
              <div className="flex w-full items-center justify-between">
                <DisclosureButton className="flex items-center gap-4 text-left flex-grow">
                  <img
                    src="/Social Media Images/Draggable.87024dbf.png"
                    className="w-3 h-6 opacity-40"
                    alt="drag"
                  />
                  <div className="flex items-center bg-pink-500 w-9 h-10 justify-center rounded-md">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-md font-semibold text-white">Contact</p>
                    <span className="text-sm text-white/60">Provide an email or phone number</span>
                  </div>
                </DisclosureButton>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={data.showContactDetails}
                    onChange={(value) => handleCheckboxChange("showContactDetails", value)}
                    aria-label="Enable Contact Details"
                    className={`${data.showContactDetails ? "bg-green-600" : "bg-gray-400"
                      } relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-300`}
                  >
                    <span
                      className={`${data.showContactDetails ? "translate-x-5" : "translate-x-1"
                        } inline-block h-2 w-2 transform rounded-full bg-white transition-transform duration-300`}
                    />
                  </Switch>
                  <ChevronDownIcon
                    className={`w-5 h-5 fill-white/60 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </div>
              </div>

              <DisclosurePanel className="mt-4 text-sm text-white/70">
                <div className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={data.showEmail}
                        onChange={(e) => handleCheckboxChange("showEmail", e.target.checked)}
                      />
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      disabled={!data.showEmail}
                      className="w-full mt-2 p-2 bg-gray-800 rounded-md text-white placeholder-gray-500 disabled:opacity-50"
                      placeholder="Enter your email"
                      value={data.email}
                      name="email"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={data.showPhone}
                        onChange={(e) => handleCheckboxChange("showPhone", e.target.checked)}
                      />
                      <span>Phone</span>
                    </label>

                    <PhoneInput
                      country="in"
                      value={data.phone}
                      onChange={handlePhoneChange}
                      placeholder="Enter your phone number"
                      containerStyle={{ marginTop: "0.5rem" }}
                      inputStyle={{
                        backgroundColor: data.showPhone ? "#1f2937" : "#4b5563",
                        color: "white",
                        border: "none",
                        borderRadius: "0.375rem",
                        width: "100%",
                        height: "38px",
                        opacity: data.showPhone ? 1 : 0.5,
                      }}
                      buttonStyle={{
                        backgroundColor: data.showPhone ? "#1f2937" : "#4b5563",
                        border: "none",
                      }}
                      disableDropdown={!data.showPhone}
                      disabled={!data.showPhone}
                    />
                  </div>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>

      {/* Booking Section */}
      <div className="bg-black/10 rounded-lg">
        <Disclosure as="div" className="p-3 h-full">
          {({ open }) => (
            <>
              <div className="flex w-full items-center justify-between">
                <DisclosureButton className="flex items-center gap-4 text-left flex-grow">
                  <img
                    src="/Social Media Images/Draggable.87024dbf.png"
                    className="w-3 h-6 opacity-40"
                    alt="drag"
                  />
                  <div className="flex items-center bg-blue-400 w-9 h-10 justify-center rounded-md">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-md font-semibold text-white">Book 1:1 Session</p>
                    <span className="text-sm text-white/60">Add booking buttons to your account</span>
                  </div>
                </DisclosureButton>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={data.bookingEnabled}
                    onChange={(value) => handleCheckboxChange("bookingEnabled", value)}
                    aria-label="Enable Booking"
                    className={`${data.bookingEnabled ? "bg-green-600" : "bg-gray-400"
                      } relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-300`}
                  >
                    <span
                      className={`${data.bookingEnabled ? "translate-x-5" : "translate-x-1"
                        } inline-block h-2 w-2 transform rounded-full bg-white transition-transform duration-300`}
                    />
                  </Switch>
                  <ChevronDownIcon
                    className={`w-5 h-5 fill-white/60 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </div>
              </div>

              <DisclosurePanel className="mt-4 text-sm text-white/70">
                <div className="mx-auto max-w-xs">
                  <Listbox value={data.sessionSelected} onChange={handleSessionSelect}>
                    <div className="relative">
                      <ListboxButton
                        className={clsx(
                          "w-full rounded-md bg-white/5 py-2 pl-3 pr-10 text-left text-white text-sm",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                        )}
                      >
                        {data.sessionSelected}
                        <ChevronDownIcon
                          className="absolute right-2 top-2.5 w-4 h-4 fill-white/60"
                          aria-hidden="true"
                        />
                      </ListboxButton>
                      <ListboxOptions className="absolute z-10 mt-1 w-full rounded-md bg-white/10 py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
                        {session.map((option) => (
                          <ListboxOption
                            key={option.name}
                            value={option.name}
                            className={({ active, selected }) =>
                              clsx(
                                "cursor-default select-none px-4 py-2",
                                active ? "bg-white/20 text-white" : "text-white/80",
                                selected && "font-semibold"
                              )
                            }
                          >
                            {({ selected }) => (
                              <div className="flex items-center gap-2">
                                <CheckIcon
                                  className={clsx("w-4 h-4", selected ? "visible" : "invisible")}
                                />
                                <span>{option.name}</span>
                              </div>
                            )}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>

                  {/* Optional Specific Session Field */}
                  {data.sessionSelected === "A specific Session" && (
                    <div className="mt-4">
                      <Listbox placeholder="A specific Session">
                        <div className="relative">
                          <ListboxButton
                            className={clsx(
                              "w-full rounded-md bg-white/5 py-2 pl-3 pr-10 text-left text-white text-sm",
                              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                            )}
                          >
                            A specific Session
                            <ChevronDownIcon
                              className="absolute right-2 top-2.5 w-4 h-4 fill-white/60"
                              aria-hidden="true"
                            />
                          </ListboxButton>
                        </div>
                      </Listbox>
                    </div>
                  )}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
