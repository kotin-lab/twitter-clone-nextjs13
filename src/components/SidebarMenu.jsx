'use client';

import { HomeIcon, HashtagIcon } from '@heroicons/react/24/solid';
import { 
  BellIcon, 
  EllipsisHorizontalCircleIcon, 
  UserIcon, 
  InboxIcon, 
  BookmarkIcon, 
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';
import useAuthStatus from '@/hooks/useAuthStatus';

// Components
import SidebarMenuItem from "./SidebarMenuItem";

export default function SidebarMenu() {
  const {currentUser, status} = useAuthStatus();

  return (
    <div className="mt-4 mb-2.5 flex flex-col xl:items-start">
      <SidebarMenuItem text={'Home'} Icon={HomeIcon} />
      <SidebarMenuItem text={'Explore'} Icon={HashtagIcon} />
      {currentUser && status !== 'loading' && (
        <>
          <SidebarMenuItem text={'Notifications'} Icon={BellIcon} />
          <SidebarMenuItem text={'Messages'} Icon={InboxIcon} />
          <SidebarMenuItem text={'Bookmarks'} Icon={BookmarkIcon} />
          <SidebarMenuItem text={'Lists'} Icon={ClipboardDocumentCheckIcon} />
          <SidebarMenuItem text={'Profile'} Icon={UserIcon} />
          <SidebarMenuItem action={() => {console.log('More clicked')}} text={'More'} Icon={EllipsisHorizontalCircleIcon} />
        </>
      )}
    </div>
  )
}
