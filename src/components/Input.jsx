'use client';

import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
// import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Input() {
  const { data: session } = useSession();

  return session && (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <div className="">
        <Image 
            src={session?.user.image}
            alt="user image"
            width={50}
            height={50}
            onClick={() => {
              if (confirm('Are you sign out?')) {
                signOut();
              }
            }}  
            className="h-11 w-11 object-cover rounded-full cursor-pointer hover:brightness-95"
        />
      </div>
      <div className="flex-1 divide-y divide-gray-200">
        <div className="">
          <textarea 
            rows="2" 
            placeholder="What's happening?" 
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
          />
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="inline-flex items-center">
            <PhotoIcon className="w-10 h-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
            <FaceSmileIcon className="w-10 h-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"  />
          </div>
          <button
            className="bg-blue-400 px-4 py-1.5 text-white rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
