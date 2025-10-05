import React from 'react'
import { Clock, Calendar } from "lucide-react";

export default function Daily() {
    return (
        <div className="space-y-6 text-white">
            {/* Session Timings */}
            <div className="space-y-2">
                <h2 className="text-sm font-medium">Session timings</h2>
                <div className="flex items-center gap-2">
                    <div className="relative w-full">
                        <Clock className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            value="09:00 PM"
                            readOnly
                            className="bg-zinc-700 text-white pl-9 pr-4 py-2 rounded-md border border-zinc-600 w-full focus:outline-none"
                        />
                    </div>
                    <span className="text-zinc-400">-</span>
                    <div className="relative w-full">
                        <Clock className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            value="09:30 PM"
                            readOnly
                            className="bg-zinc-700 text-white pl-9 pr-4 py-2 rounded-md border border-zinc-600 w-full focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
                <h2 className="text-sm font-medium">Start Date</h2>
                <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                    <input
                        type="text"
                        value="Wed, Jul 30, 2025"
                        readOnly
                        className="bg-zinc-700 text-white pl-9 pr-4 py-2 rounded-md border border-zinc-600 w-full focus:outline-none"
                    />
                </div>
            </div>

            {/* End Date */}
            <div className="space-y-2">
                <h2 className="text-sm font-medium">End Date</h2>
                <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                    <input
                        type="text"
                        value="Fri, Aug 01, 2025"
                        readOnly
                        className="bg-zinc-700 text-white pl-9 pr-4 py-2 rounded-md border border-zinc-600 w-full focus:outline-none"
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="bg-amber-100 text-amber-900 text-sm p-3 rounded-md">
                <strong>3 sessions</strong> will be added occurring daily from <strong>Wed, Jul 30, 2025</strong> to <strong>Fri, Aug 01, 2025</strong>
            </div>
        </div>
    )
}
