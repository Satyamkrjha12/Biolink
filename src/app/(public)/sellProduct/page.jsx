'use client';
import { Button } from '@headlessui/react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

const item = [
  {
    id: 1,
    title: 'Digital Products',
    description: 'Sell images, videos, music, docs, and more.',
    img: './SellProduct/digital-product.25d7c77f.svg',
  },
  {
    id: 2,
    title: 'List Multiple Products',
    description: 'Offer an e-commerce style experience.',
    img: './SellProduct/catalog-product.9c6de705.svg',
  },
  {
    id: 3,
    title: 'Existing Products',
    description: 'Give access to your existing Cosmofeed product.',
    img: './SellProduct/_back_forward_arrow.4382b4c1.svg',
  },
];

export default function Page() {
const [isSelected, setIsSelected] = useState(null);

  return (
    <div className="relative flex flex-col justify-between items-center h-screen w-full bg-black text-white px-4 py-6">
      {/* Back Arrow */}
      <ArrowLeft
        className="absolute top-6 left-6 text-gray-400 hover:text-white cursor-pointer transition"
        onClick={() => (window.location.href = '/store')}
        size={28}
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mt-12 mb-6 text-center">
        What Do You Want to Sell?
      </h1>

      {/* Option Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {item.map((item) => (
          <div
            key={item.id}
            onClick={() => setIsSelected(item.id)}
            className={`cursor-pointer bg-zinc-900 border-2 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-200 ${
              isSelected === item.id
                ? 'border-white shadow-xl'
                : 'border-zinc-700 hover:border-gray-500'
            }`}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-14 h-14 mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="w-full max-w-5xl flex justify-end mt-10">
        <Button
          className={`flex items-center gap-2 bg-white text-black px-5 py-3 rounded-lg font-semibold shadow-lg transition ${
            isSelected ? 'opacity-100' : 'opacity-40 cursor-not-allowed'
          }`}
          disabled={!isSelected}
        >
          Continue <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
}
