import { Tab } from '@headlessui/react';
import React, { useState } from 'react';
import Daily from './Daily';
import Weekly from './Weekly';
import Monthly from './Monthly';

export default function PaidModal() {
    const [isOpen, setIsOpen] = useState(false);

    const categories = [
        { name: 'Daily', component: <Daily /> },
        { name: 'Weekly', component: <Weekly /> },
        { name: 'Monthly', component: <Monthly /> },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`flex-1 px-4 py-2 rounded border text-center transition `}
            >
                Paid
            </button >

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-lg h-[80vh] overflow-y-auto rounded-2xl bg-[#16161a] p-6 shadow-2xl transition-all flex flex-col justify-start border border-zinc-800">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-zinc-700 pb-4 mb-6">
                            <h2 className="text-xl font-semibold text-white">
                                Add Recurring Series
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-bold text-zinc-400 hover:text-white transition"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Tabs */}
                        <Tab.Group>
                            <Tab.List className="flex bg-zinc-900 p-1 rounded-full w-full justify-around shadow-lg border border-zinc-700">
                                {categories.map(({ name }) => (
                                    <Tab
                                        key={name}
                                        className={({ selected }) =>
                                            `w-full max-w-[120px] text-sm font-medium py-2 rounded-full text-center transition-all duration-300 ease-in-out
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
                                            ${selected
                                                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md scale-105'
                                                : 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                                            }`
                                        }
                                    >
                                        {name}
                                    </Tab>
                                ))}
                            </Tab.List>

                            <Tab.Panels className="mt-4">
                                {categories.map(({ name, component }) => (
                                    <Tab.Panel
                                        key={name}
                                        className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4 shadow-inner transition"
                                    >
                                        {component}
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>

                        {/* footer Button */}
                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-gradient-to-r from-black to-gray-900 text-white font-medium px-6 py-2 rounded-lg shadow hover:from-gray-800 hover:to-black transition-all"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
}
