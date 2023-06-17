'use client';

import '@/../firebase';
import { userState } from "@/atom/authAtom";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import { useRecoilState } from "recoil";

export default function SidebarMiniProfile() {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  return currentUser && (
    <div className="hoverEffect text-gray-700 flex justify-center items-center xl:justify-start mt-auto xl:max-w-[224px] space-x-2">
      <Image 
        src={currentUser.userImg}
        alt="user image"
        width={50}
        height={50}
        onClick={() => {
          if (confirm('Are you sign out?')) {
            setCurrentUser(null);
            signOut(auth);
          }
        }}
        className="h-10 w-10 object-cover rounded-full"
      />
      <div className="leading-5 hidden xl:inline flex-1">
        <h4 className="truncate font-bold">{currentUser.name}</h4>
        <p className="truncate text-sm text-gray-500">@{currentUser.username}</p>
      </div>
      <EllipsisHorizontalIcon className="h-5 w-5 hidden xl:block" />
    </div>
  );
}
