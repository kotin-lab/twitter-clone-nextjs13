'use client';

import { useRecoilState } from "recoil"
import { commentModalState, postIdState } from "@/atom/modalAtom";
import ReactModal from "react-modal";
import { FaceSmileIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Date from "./Date";
import useAuthStatus from "@/hooks/useAuthStatus";

ReactModal.defaultStyles.overlay.backgroundColor = 'rgb(0 0 0 /0.5)';
ReactModal.defaultStyles.overlay.zIndex = '100';

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(commentModalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const { currentUser } = useAuthStatus();
  const [post, setPost] = useState(null);
  const [input, setInput] = useState('');
  const router = useRouter();

  // Effects
  useEffect(() => {
    if (!postId) return;

    const postRef = doc(db, 'posts', postId);
    const unsubscribe = onSnapshot(postRef, querySnapshot => {
      setPost(querySnapshot);
    });

    return unsubscribe;
  }, [postId]);

  // Handlers
  async function sendComment() {
    const {name, username, userImg, uid} = currentUser;
    const postsRef = collection(db, 'posts', postId, 'comments');
    
    await addDoc(postsRef, {
      uid,
      comment: input,
      name,
      username,
      userImg,
      timestamp: serverTimestamp()
    });

    setOpen(false);
    setInput('');
    router.push(`/posts/${postId}`);
  }

  function closeModal() {
    setOpen(false);
    setPostId(null);
  }

  return (
    <div>
      {open && post && (
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
            <div className="relative">
              <span className="absolute w-0.5 h-full bg-gray-300 z-[-1] left-[38px] top-11" />
              <div className="flex items-center px-4 space-x-1 relative">
                <Image 
                  src={post.data().userImg}
                  alt="user image"
                  width={50}
                  height={50}
                  className="h-11 w-11 object-cover rounded-full cursor-pointer hover:brightness-95"
                />              
                <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post.data().name}</h4>
                <span className="text-sm sm:text-[15px] ">@{post.data().username} -</span>
                {post.data().timestamp && (
                  <span className="text-sm sm:text-[15px] hover:underline">
                    <Date date={post.data().timestamp.toDate()} />
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-[15px] sm:text-base ml-16 mb-2">{post.data().text}</p>
            </div>
            {/* input box */}
            <div className="flex py-3 px-4 space-x-3">
              <div className="">
                <Image 
                    src={currentUser.userImg}
                    alt="user image"
                    width={50}
                    height={50}
                    className="h-11 w-11 object-cover rounded-full cursor-pointer hover:brightness-95"
                />
              </div>
              <div className="flex-1 divide-y divide-gray-200">
                <div className="">
                  <textarea 
                    rows="2" 
                    placeholder="Tweet your reply" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-500 tracking-wide min-h-[50px] text-gray-600"
                  />
                </div>
                <div className="flex items-center justify-between pt-2.5">
                  <div className="inline-flex items-center">
                    <div className="">
                      <PhotoIcon              
                        // onClick={() => filePickerRef.current.click()}
                      className="w-10 h-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" 
                      />
                      {/* <input 
                        type="file" 
                        hidden 
                        ref={filePickerRef} 
                        onChange={addImageToPost}
                      /> */}
                    </div>
                    <FaceSmileIcon className="w-10 h-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"  />
                  </div>
                  <button
                    disabled={!input.trim()}
                    onClick={sendComment}
                    className="bg-blue-400 px-4 py-1.5 text-white rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ReactModal>
      )}
    </div>
  )
}
