"use client";
import React from 'react';

export default function Profile({ data }) {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <img
        src={data.Image}
        alt={data.Name}
        className="w-32 h-32 rounded-full object-cover mx-auto"
      />
      <h1 className="text-3xl font-bold mt-4 text-center">{data.Name}</h1>
      <p className="text-gray-600 text-center mt-2">{data.Bio}</p>
    </div>
  );
}
