'use client';

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function PostPageFeedNavbar() {
  const router = useRouter();

  return (
    <div className="flex items-center space-x-2 py-2 px-3 bg-white border-b border-gray-200">
      <div 
        onClick={() => {
          router.push('/');
        }}
        className="hoverEffect p-2.5"
      >
        <ArrowLeftIcon className="h-5 w-5" />
      </div>
      <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Tweet</h2>
    </div>
  )
}
