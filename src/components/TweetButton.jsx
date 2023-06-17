'use client';

import useAuthStatus from "@/hooks/useAuthStatus";

export default function TweetButton() {
  const {currentUser, status} = useAuthStatus();

  return !!currentUser && status !== 'loading' && status !== 'un-authenticated' && (
    <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md text-lg hover:brightness-95 hidden xl:inline">
      Tweet
    </button>
  )
}
