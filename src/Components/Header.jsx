// Header.jsx
"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = ["Store", "Appearance", "Analytics", "Settings"];

  return (
        <nav className="bg-gray-900 shadow-inner  text-white px-6 py-4 shadow-blue-950">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">BioLink</div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link}
                            href    ={`${link.toLowerCase()}`}
                            className={clsx(
                                "text-white font-medium hover:text-blue-500",
                                link === "Home" && "text-blue-500"
                            )}
                        >
                            {link}
                        </Link>
                    ))}
                    <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">
                        Visit Bio
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-4 space-y-2 px-2">
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className={clsx(
                                "block px-3 py-2 rounded text-white hover:bg-gray-700",
                                link === "Home" && "text-blue-500"
                            )}
                        >
                            {link}
                        </a>
                    ))}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold mt-2">
                        Get started
                    </button>
                </div>
            )}
        </nav>
    );
}
