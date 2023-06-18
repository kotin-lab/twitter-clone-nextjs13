'use client';

import { useRecoilState } from "recoil"
import { tweetModalState } from "@/atom/modalAtom";
import ReactModal from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Input from "./Input";

ReactModal.defaultStyles.overlay.backgroundColor = 'rgb(0 0 0 /0.5)';
ReactModal.defaultStyles.overlay.zIndex = '100';

export default function TweetModal() {
  const [open, setOpen] = useRecoilState(tweetModalState);

  // Handlers
  function closeModal() {
    setOpen(false);
  }

  return open && (
    <ReactModal
      isOpen={open}
      onRequestClose={closeModal}
      className='absolute w-11/12 max-w-lg right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 border-2 border-gray-400 rounded-xl shadow-lg bg-white outline-none'
    >
      <div className="p-1">
        <div className="border-b border-gray-200 px-4 py-2 mb-4">
          <div onClick={closeModal} className="w-9 h-9 p-1 hoverEffect inline-flex items-center justify-center">
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </div>
        </div>

        {/* Input */}
        <Input successCallback={() => setOpen(false)} />
      </div>
    </ReactModal>
  );
}
