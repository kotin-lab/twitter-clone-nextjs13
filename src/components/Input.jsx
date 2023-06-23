'use client';

import { FaceSmileIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import { useRef, useState } from "react";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useAuthStatus from "@/hooks/useAuthStatus";
import { useRouter } from "next/navigation";

export default function Input({successCallback}) {
  const auth = getAuth();
  const {currentUser, status} = useAuthStatus();
  const [input, setInput] = useState('');
  const filePickerRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileDataUrl, setFileDataUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Handlers 
  async function sendPost() {
    if (loading) return;

    setLoading(true);

    try {
      /** save post to firestore */
      
      const docRef = await addDoc(
        collection(db, 'posts'),
        {
          owner: auth.currentUser.uid,
          id: currentUser.uid,
          text: input.trim(),
          userImg: currentUser.userImg,
          timestamp: serverTimestamp(),
          name: currentUser.name,
          username: currentUser.username
        }
      );
  
      /** upload file to firebase cloud storage */
  
      if (file) {  
        // file metadata
        const metadata = {
          customMetadata: {
            owner: auth.currentUser.uid
          },
          contentType: file.type
        };
    
        // upload image
        const imageSnap = await uploadBytes(
          ref(storage, `posts/${docRef.id}/image`), 
          file, 
          metadata
        );
  
        // get image url and update the post
        const downloadUrl = await getDownloadURL(imageSnap.ref);
        await updateDoc(
          doc(db, 'posts', docRef.id), 
          {
            image: downloadUrl
          }
        );
      }
  
      // clear fields
      setInput('');
      setFile(null);
      setFileDataUrl(null);
      setLoading(false);
  
      // Call the callback function
      if (successCallback && typeof successCallback === 'function') 
        successCallback();

      // redirect to the post page
      router.push(`/posts/${docRef.id}`);
    } catch (error) {
      setLoading(false);
      console.log('Post upload error: ', error);
    }
  }

  // file input onChange handler
  async function handleFileInputChange(e) {
    const image = e.target.files[0];
    
    if (image) {
      setFile(image);

      // get image data_url
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.addEventListener('load', onLoad);

      // filereader onload event handler
      function onLoad(e) {
        setFileDataUrl(e.target.result);
        reader.removeEventListener('load', onLoad);
      }
    } else {
      setFile(null);
      setFileDataUrl(null);
    }
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
        {fileDataUrl && (
          <div className="relative">
            <XMarkIcon
              onClick={() => {
                setFile(null);
                setFileDataUrl(null);
                filePickerRef.current.value = null;
              }}
              className="h-7 w-7 absolute top-3 right-3 text-gray-700 bg-gray-100 cursor-pointer " 
            />
            <img 
              src={fileDataUrl}
              className={`${loading && 'animate-pulse'} object-contain w-full max-h-[50vh]`}
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
                    onChange={handleFileInputChange}
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
