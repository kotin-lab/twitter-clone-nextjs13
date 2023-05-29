'use client';

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function SidebarMiniProfile() {
  const {data: session} = useSession();

  return session && (
    <div className="hoverEffect text-gray-700 flex justify-center items-center xl:justify-start mt-auto xl:max-w-[224px] space-x-2">
      <Image 
        src={session.user.image}
        alt="user image"
        width={50}
        height={50}
        onClick={() => {
          if (confirm('Are you sign out?')) {
            signOut();
          }
        }}
        className="h-10 w-10 object-cover rounded-full"
      />
      <div className="leading-5 hidden xl:inline flex-1">
        <h4 className="truncate font-bold">{session.user.name}</h4>
        <p className="truncate text-sm text-gray-500">@{session.user.username}</p>
      </div>
      <EllipsisHorizontalIcon className="h-5 w-5 hidden xl:block" />
    </div>
  );
}
