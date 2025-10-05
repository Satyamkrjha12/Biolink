import { Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function EmailAutomationButton({ formId }) {
    const router = useRouter();

    return (
        <div className='flex'>
            <div
                onClick={() => router.push(`/magnet/email-automation/${formId}`)}
                className="flex items-center gap-3 px-2 py-1 rounded-2xl 
                 border border-amber-300 bg-white/90 shadow-md 
                 hover:shadow-xl hover:bg-amber-50 
                 transition-all duration-300 cursor-pointer group"
            >
                <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 
                      shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-5 h-5 text-white" />
                </div>

                <div className="flex flex-col">
                    <p className="font-semibold text-amber-700 group-hover:text-amber-600">
                        Automate
                    </p>
                    <span className="text-xs text-gray-500 group-hover:text-gray-600">
                        Setup your email automation
                    </span>
                </div>
            </div>
        </div>
    )
}
