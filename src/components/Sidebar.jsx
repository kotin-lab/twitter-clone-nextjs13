import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon, HashtagIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { 
  BellIcon, 
  EllipsisHorizontalCircleIcon, 
  UserIcon, 
  InboxIcon, 
  BookmarkIcon, 
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInButton from "./SignInButton";
import SidebarMiniProfile from "./SidebarMiniProfile";

export default async function Sidebar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="hidden sm:flex sm:flex-col p-2 xl:items-start fixed h-full xl:ml-[41px]">
      {/* Twitter logo */}
      <div className="hoverEffect p-0 hover:bg-blue-100 w-12 h-12 flex items-center justify-center">
        <Image 
          src={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/292px-Logo_of_Twitter.svg.png'}
          width={50}
          height={50}
          alt="twitter"
          className="object-cover w-8 h-8"
        />
      </div>

      {/* Menu */}
      <div className="mt-4 mb-2.5 flex flex-col xl:items-start">
        <SidebarMenuItem text={'Home'} Icon={HomeIcon} />
        <SidebarMenuItem text={'Explore'} Icon={HashtagIcon} />
        {session && (
          <>
            <SidebarMenuItem text={'Notifications'} Icon={BellIcon} />
            <SidebarMenuItem text={'Messages'} Icon={InboxIcon} />
            <SidebarMenuItem text={'Bookmarks'} Icon={BookmarkIcon} />
            <SidebarMenuItem text={'Lists'} Icon={ClipboardDocumentCheckIcon} />
            <SidebarMenuItem text={'Profile'} Icon={UserIcon} />
            <SidebarMenuItem text={'More'} Icon={EllipsisHorizontalCircleIcon} />
          </>
        )}
      </div>

      {/* Button */}
      {session ? (
        <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md text-lg hover:brightness-95 hidden xl:inline">
          Tweet
        </button>
      ) : (
        <SignInButton />
      )}

      {/* Mini profile */}
      {session && (
        <div className="mt-auto">
          <SidebarMiniProfile />
        </div>
      )}
    </div>
  )
}
