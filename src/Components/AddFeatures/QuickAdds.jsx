import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'
import WhatsappModal from './quickAddModals/WhatsappModal';
import DocumentModal from './quickAddModals/DocumentModal';

const data = [
    {
        id: 1,
        name: "Existing Products",
        img: "📦",
        url: "/store"
    },
    {
        id: 2,
        name: "Lead Magnet",
        img: "🧲",
        url: "/magnet"
    },

]

const QuickAdd = ({ name, img, url }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(url)}
            className="flex flex-col items-center justify-center gap-3 w-45  p-5 bg-black hover:bg-[#1a1a1a] dark:hover:bg-zinc-800 transition-all duration-300 rounded-xl cursor-pointer shadow-md hover:shadow-lg"
        >
            <div className="flex items-center justify-center w-16 h-16 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full shadow-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-3xl">
                {img}
            </div>
            <span className="text-sm font-semibold text-white dark:text-zinc-100">{name}</span>
        </div>
    );
};
export { QuickAdd }

export default function QuickAdds() {
    const WhatsappModalRef = useRef < HTMLButtonElement | null > (null);

    return (
        <div>
            <h1 className='text-2xl mx-4 p-4 font-semibold '>Quick Adds</h1>
            <div className='flex flex-wrap gap-6 items-center justify-center md:p-0 sm:p-2 '>
                {data.map(item => (
                    <QuickAdd key={item.id} name={item.name} img={item.img} url={item.url} />
                ))}
                <WhatsappModal />
                <DocumentModal />
            </div>
        </div>

    )
}