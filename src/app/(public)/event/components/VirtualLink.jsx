import React from 'react';

export default function VirtualLink() {
    const [data, setData] = React.useState({    
        VirtualLink: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="mt-6 text-white">
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Provide a Google/Outlook/Teams Meeting Link <span className="text-red-400">*</span>
                    </label>
                    <div className="bg-gradient-to-tr from-indigo-800 to-purple-800 p-[1px] rounded-xl shadow-md">
                        <input
                            type="text"
                            name="VirtualLink"
                            value={data.VirtualLink}
                            onChange={handleChange}
                            placeholder="e.g. https://teams.microsoft.com/..."
                            className="w-full px-4 py-2 rounded-xl bg-[#1f1f1f] text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
