'use client';

import { useRouter } from "next/navigation";

export default function SidebarMenuItem({text, Icon, active, action}) {
  const router = useRouter();

  // Handlers 
  function handleClick(e) {
    if (typeof action === 'function') {
      action();
    } else if (typeof action === 'string') {
      router.push(action);
    }
  }

  return (
    <div onClick={handleClick} className="hoverEffect w-auto flex items-center xl:justify-start xl:space-x-4 justify-center text-lg text-gray-700">
      <Icon className="h-7 w-7" />
      <span className={`${active && 'font-bold'} hidden xl:inline`}>{text}</span>
    </div>
  )
}
