"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Switch,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Field,
  Label,
  Input,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Eye, EyeOff, Mail, Phone, ShieldCheck } from "lucide-react";

const ObjectVerification = ({ children, value, onChange }) => (
  <div className="flex gap-4 p-4 justify-between items-center bg-gray-800 rounded-lg">
    <div>{children}</div>
    <div className="flex justify-between border rounded p-1 items-center gap-2">
      <ShieldCheck className="w-4 h-4" />
      <p className="text-sm">OTP Verification</p>
      <Switch
        checked={value}
        onChange={onChange}
        aria-label="Enable Verification"
        className={`${
          value ? "bg-green-600" : "bg-gray-400"
        } relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-300`}
      >
        <span
          className={`${
            value ? "translate-x-5" : "translate-x-1"
          } inline-block h-2 w-2 transform rounded-full bg-white transition-transform duration-300`}
        />
      </Switch>
    </div>
  </div>
);

export default function FollowUpdate({ sendDataParent , Info }) {
  const [data, setData] = useState({
    enableFollowButton: false,
    enableGiftButton: false,
    thankTitle: "Thank You For Following me",
    titleDescription: "I am super excited to send you exciting updates",
    emailVerification: false,
    phoneVerification: false,
    giftTitle: "",
    gift: "",
  });

  const giftRef = useRef();

  useEffect(() => {
    if (Info) {
      setData({
        enableFollowButton: Info.enableFollowButton || false,
        emailVerification: Info.emailVerification || false,
        phoneVerification: Info.phoneVerification || false,
        thankTitle: Info.thankTitle || "",
        titleDescription: Info.titleDescription || "",
        enableGiftButton: Info.enableGiftButton || false,
        giftTitle: Info.giftTitle || "",
        gift: Info.gift || "",
      });
    }
  }, [Info]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    const updatedData = { ...data, [name]: newValue };
    setData(updatedData);
    sendDataParent(updatedData);
  };

  const handleSwitchChange = (name, value) => {
    const updatedData = { ...data, [name]: value };
    setData(updatedData);
    sendDataParent(updatedData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedData = { ...data, gift: file.name };
      setData(updatedData);
      sendDataParent(updatedData);
    }
  };

  return (
    <div className="p-4">
      {/* Follow toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-white">Let visitors follow you</h2>
          <p className="text-sm text-white/60">
            Show the follow me button on your SuperProfile
          </p>
        </div>
        <Switch
          checked={data.enableFollowButton}
          onChange={(val) => handleSwitchChange("enableFollowButton", val)}
          aria-label="Enable Follow Button"
          className={`${
            data.enableFollowButton ? "bg-green-600" : "bg-gray-400"
          } relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300`}
        >
          <span
            className={`${
              data.enableFollowButton ? "translate-x-6" : "translate-x-1"
            } inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300`}
          />
        </Switch>
      </div>

      <hr className="border-white/10" />

      {/* Verification Section */}
      <div className="bg-black/10 rounded-lg mt-4">
        <Disclosure as="div" className="p-3">
          {({ open }) => (
            <>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm font-medium text-white group-hover:text-white/80">
                  Select Mode Of Verification
                </span>
                <ChevronDownIcon
                  className={`size-5 fill-white/60 group-hover:fill-white/50 transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-sm text-white/50">
                <ObjectVerification
                  value={data.emailVerification}
                  onChange={(val) =>
                    handleSwitchChange("emailVerification", val)
                  }
                >
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 opacity-25" />
                    <div className="bg-pink-500 w-6 h-5 flex items-center justify-center rounded-lg">
                      <Mail className="w-4 h-4" />
                    </div>
                    <p className="text-md text-white/50 font-bold">Email</p>
                  </div>
                </ObjectVerification>

                <ObjectVerification
                  value={data.phoneVerification}
                  onChange={(val) =>
                    handleSwitchChange("phoneVerification", val)
                  }
                >
                  <div className="flex items-center gap-1">
                    <EyeOff className="w-4 h-4 opacity-25" />
                    <div className="bg-gray-500 w-6 h-5 flex items-center justify-center rounded-lg">
                      <Phone className="w-4 h-4" />
                    </div>
                    <p className="text-md text-white/50 font-bold">Phone</p>
                  </div>
                </ObjectVerification>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>

      {/* Thank You Message */}
      <div className="bg-black/10 rounded-lg mt-4">
        <Disclosure as="div" className="p-3">
          {({ open }) => (
            <>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm font-medium text-white group-hover:text-white/80">
                  Show a thank you message
                </span>
                <ChevronDownIcon
                  className={`size-5 fill-white/60 group-hover:fill-white/50 transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-sm text-white/50">
                <Field>
                  <Label className="text-sm/6 font-medium text-white">
                    Title
                  </Label>
                  <Input
                    name="thankTitle"
                    value={data.thankTitle}
                    onChange={handleChange}
                    className="mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white focus:outline-white/25"
                  />
                </Field>
                <Field className="mt-2">
                  <Label className="text-sm/6 font-medium text-white">
                    Description
                  </Label>
                  <Input
                    name="titleDescription"
                    value={data.titleDescription}
                    onChange={handleChange}
                    className="mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white focus:outline-white/25"
                  />
                </Field>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>

      {/* Gift Section */}
      <div className="bg-black/10 rounded-lg mt-4">
        <div className="flex items-center justify-between p-3">
          <span className="text-sm font-medium text-white group-hover:text-white/80">
            They get a gift after successful follow
          </span>
          <Switch
            checked={data.enableGiftButton}
            onChange={(val) => handleSwitchChange("enableGiftButton", val)}
            aria-label="Enable Gift Option"
            className={`${
              data.enableGiftButton ? "bg-green-600" : "bg-gray-400"
            } relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-300`}
          >
            <span
              className={`${
                data.enableGiftButton ? "translate-x-5" : "translate-x-1"
              } inline-block h-2 w-2 transform rounded-full bg-white transition-transform duration-300`}
            />
          </Switch>
        </div>

        {data.enableGiftButton && (
          <Disclosure as="div" className="p-3">
            {({ open }) => (
              <>
                <DisclosureButton className="group flex w-full items-center justify-between">
                  <span className="text-sm font-medium text-white group-hover:text-white/80">
                    Configure gift
                  </span>
                  <ChevronDownIcon
                    className={`size-5 fill-white/60 group-hover:fill-white/50 transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 text-sm text-white/50">
                  <Field className="mt-2">
                    <Label className="text-sm/6 font-medium text-white">
                      Gift Title
                    </Label>
                    <Input
                      name="giftTitle"
                      value={data.giftTitle}
                      onChange={handleChange}
                      className="mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white focus:outline-white/25"
                    />
                  </Field>

                  <Field className="mt-2">
                    <Label className="text-sm/6 font-medium text-white">
                      Upload Digital File
                    </Label>
                    <input
                      type="file"
                      ref={giftRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div
                      onClick={() => giftRef.current.click()}
                      className="flex flex-col justify-center items-center gap-2 mt-3 bg-gray-800 border-dotted border-b-red-600 rounded-2xl h-25 cursor-pointer"
                    >
                      <div className="flex w-4/5 justify-center items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 text-white shadow-inner shadow-white/10 hover:bg-gray-600">
                        Upload Digital File
                      </div>
                      <p>Max Size - 50MB</p>
                    </div>
                  </Field>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        )}
      </div>
    </div>
  );
}
