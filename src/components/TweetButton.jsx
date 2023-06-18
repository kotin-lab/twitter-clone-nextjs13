'use client';

import { tweetModalState } from "@/atom/modalAtom";
import useAuthStatus from "@/hooks/useAuthStatus";
import { useRecoilState } from "recoil";

export default function TweetButton() {
  const {currentUser, status} = useAuthStatus();
  const [modalOpen, setModalOpen] = useRecoilState(tweetModalState);

  // Handlers
  function sendTweet() {
    setModalOpen(true);
  }

  return !!currentUser && status !== 'loading' && status !== 'un-authenticated' && (
    <button onClick={sendTweet} className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md text-lg hover:brightness-95 hidden xl:inline">
      Tweet
    </button>
  )
}
