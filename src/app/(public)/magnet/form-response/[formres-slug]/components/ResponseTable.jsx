"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function ResponseTable({ info }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(info || []);

  useEffect(() => {
    if (!info) return;
    const lowerSearch = searchTerm.toLowerCase();
    if (searchTerm.trim() === "") {
      setFilteredData(info);
    } else {
      setFilteredData(
        info.filter((item) =>
          (item.ResponseNumber &&
            String(item.ResponseNumber).toLowerCase().includes(lowerSearch)) ||
          (item.Name && item.Name.toLowerCase().includes(lowerSearch)) ||
          (item.Email && item.Email.toLowerCase().includes(lowerSearch)) ||
          (item.Phone && item.Phone.toLowerCase().includes(lowerSearch)) ||
          (item.Message && item.Message.toLowerCase().includes(lowerSearch)) ||
          (item.Date && item.Date.toLowerCase().includes(lowerSearch))
        )
      );
    }
  }, [searchTerm, info]);

  return (
    <div className="p-6 mt-20 max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search responses..."
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-800">
        <table className="w-full border-collapse bg-gray-900 text-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
              {["ID", "Name", "Email", "Phone", "Message", "Date"].map((header) => (
                <th
                  key={header}
                  className="px-5 py-3 text-left font-semibold border-b border-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr
                  key={row.ResponseNumber || index}
                  className={`hover:bg-gray-800 transition ${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-850"
                  }`}
                >
                  <td className="px-5 py-3 border-b border-gray-800">{row.ResponseNumber}</td>
                  <td className="px-5 py-3 border-b border-gray-800">{row.Name}</td>
                  <td className="px-5 py-3 border-b border-gray-800">{row.Email}</td>
                  <td className="px-5 py-3 border-b border-gray-800">{row.Phone}</td>
                  <td className="px-5 py-3 border-b border-gray-800">{row.Message}</td>
                  <td className="px-5 py-3 border-b border-gray-800">{row.Date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-6 text-center text-gray-400 border-b border-gray-800"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
