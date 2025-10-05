'use client';

import React, { useEffect, useState } from 'react';
import Profile from './comp/Profile';
import MagForm from './comp/MagForm';
import WhatsAppDm from './comp/WhatsAppDm';

export default function BlogPage() {
  const [data, setData] = useState(null); // 🔹 Start with null to check loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUrl = window.location.href;
    const segments = currentUrl.split('/');
    const lastSegment = segments[segments.length - 1]; // blog/name-id

    const dashIndex = lastSegment.lastIndexOf('-');
    const idPart = lastSegment.substring(dashIndex + 1); // Extract user ID

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/userBio?Id=${idPart}`);
        const result = await response.json();

        if (response.ok) {
          setData(result);
        } else {
          console.error("API Error:", result.error);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Show loading state until data is fetched
  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-semibold">Loading user profile...</h1>
      </div>
    );
  }

  // 🔹 Render only after data is fully fetched
  return (
    <div>
      <Profile data={data} />
      <MagForm Id={data.Id} />
      <WhatsAppDm Id={data.Id} />
    </div>
  );
}
