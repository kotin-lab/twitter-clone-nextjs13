'use client';

import { FaceSmileIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useRef, useState } from "react";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useAuthStatus from "@/hooks/useAuthStatus";

export default function Input({successCallback}) {
  const {currentUser, status} = useAuthStatus();
  const [input, setInput] = useState('');
  const filePickerRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handlers 
  async function sendPost() {
    if (loading) return;

    setLoading(true);
    const docRef = await addDoc(
      collection(db, 'posts'),
      {
        id: currentUser.uid,
        text: input.trim(),
        userImg: currentUser.userImg,
        timestamp: serverTimestamp(),
        name: currentUser.name,
        username: currentUser.username
      }
    );

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (file) {
      await uploadString(imageRef, file, 'data_url').then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);

        await updateDoc(
          doc(db, 'posts', docRef.id), 
          {
            image: downloadUrl
          }
        );
      });
    }

    setInput('');
    setFile(null);
    setLoading(false);

    // Call the callback function
    if (successCallback && typeof successCallback === 'function') successCallback();
  }

  async function addImageToPost(e) {
    const reader = new FileReader();
    const image = e.target.files[0];
    
    if (image) {
      reader.readAsDataURL(image);
    }

    reader.onload = readerEvent => {
      setFile(readerEvent.target.result);
    };
  }

  return currentUser && status !== 'loading' && (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <div className="">
        <Image 
            src={currentUser.userImg}
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
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
          />
        </div>
        {file && (
          <div className="relative">
            <XMarkIcon
              onClick={() => setFile(null)}
              className="h-7 w-7 absolute top-3 right-3 text-gray-700 bg-gray-100 cursor-pointer " 
            />
            <img 
              src={file}
              className={`${loading && 'animate-pulse'}`}
            />
          </div>
        )}
        {!loading && (
          <>
            <div className="flex items-center justify-between pt-2.5">
              <div className="inline-flex items-center">
                <div className="">
                  <PhotoIcon              
                    onClick={() => filePickerRef.current.click()}
                  className="w-10 h-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" 
                  />
                  <input 
                    type="file" 
                    hidden 
                    ref={filePickerRef} 
                    onChange={addImageToPost}
                  />
                </div>
                <FaceSmileIcon className="w-10 h-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"  />
              </div>
              <button
                disabled={!input.trim()}
                onClick={sendPost}
                className="bg-blue-400 px-4 py-1.5 text-white rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
              >
                Tweet
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
