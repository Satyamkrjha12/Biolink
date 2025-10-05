"use client";

import { Button } from '@headlessui/react';
import { Link } from 'lucide-react';
import React, { useState } from 'react';
import QuickAdds from './QuickAdds';
import CreateSell from './CreateSell';

export default function AddfeatureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState('');
  const [links, setLinks] = useState([]);

  const handleAddLink = () => {
    if (link.trim() !== '') {
      setLinks([...links, link]);
      setLink('');
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-4/5 items-center gap-2 rounded-3xl bg-zinc-800 px-3 py-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-zinc-700"
      >
        + Add Features
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-4xl h-[80vh] overflow-y-auto rounded-2xl bg-zinc-900 p-6 shadow-xl transition-all flex flex-col justify-start text-white">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="relative w-4/5">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddLink();
                      setIsOpen(false);
                    }
                  }}
                  placeholder="Add a Link to Your Store"
                  className="w-full pl-10 p-2 bg-zinc-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <button
                onClick={() => {
                  handleAddLink();
                  setIsOpen(false);
                }}
                className="text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto pr-1 space-y-6">
              <QuickAdds />
              <CreateSell />
            </div>
          </div>
        </div>
      )}
    </>


  );
}
