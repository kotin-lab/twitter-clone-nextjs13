'use client';

import { 
  ChartBarIcon, 
  ChatBubbleOvalLeftEllipsisIcon, 
  HeartIcon, 
  ShareIcon, 
  TrashIcon 
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { collection, deleteDoc, doc, getCountFromServer, onSnapshot, setDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { commentModalState, postIdState } from "@/atom/modalAtom";
import { db, storage } from "../../firebase";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useAuthStatus from "@/hooks/useAuthStatus";

export default function PostIcons({id, uid, image}) {  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Component states
  const [commentsCount, setCommentsCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  // Recoil states
  const [postId, setPostId] = useRecoilState(postIdState);
  const [modalOpen, setModalOpen] = useRecoilState(commentModalState);
  const { currentUser } = useAuthStatus();

  const router = useRouter();

  // Effects
  useEffect(() => {
    const likesRef = collection(db, 'posts', id, 'likes');
    const unsubscribe = onSnapshot(likesRef, querySnapshot => {
      setLikes(querySnapshot.docs);
    });

    return unsubscribe;
  }, [id]);

  useEffect(() => {
    if (!currentUser) return;

    const liked = likes.findIndex(like => like.id === currentUser.uid) !== -1;
    setHasLiked(liked);
  }, [likes, currentUser]);

  useEffect(() => {
    async function getCommentsCount() {
      const commentsRef = collection(db, 'posts', id, 'comments');
      const snapshot = await getCountFromServer(commentsRef);
      
      setCommentsCount(snapshot.data().count);
    }
    getCommentsCount();
  }, [id]);

  // Handlers
  async function likePost(e) {   
    e.preventDefault();

    // if (status === 'loading') return;

    if (!currentUser) {
      signIn();
    } else {
      const docRef = doc(db, 'posts', id, 'likes', currentUser.uid);
      
      if (hasLiked) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          username: currentUser.username
        });
      }
    }
  }

  // Delete post handler
  async function deletePost(e) {    
    e.preventDefault();
            
    if (confirm('Are you sure you want to delete this post?')) {
      const postRef = doc(db, 'posts', id);
      await deleteDoc(postRef);
  
      if (image) {
        const imageRef = ref(storage, `posts/${id}/image`);
        await deleteObject(imageRef);
      }

      router.push('/');
    }
  }

  // Functions  
  function signIn() {
    const searchParamsStr = searchParams.toString();
    let callbackUrl = `${window.location.origin}${pathname}${searchParamsStr ? '/?' + searchParamsStr : ''}`;
    callbackUrl = encodeURIComponent(callbackUrl);
    
    router.push(`/auth/signin?callbackUrl=${callbackUrl}`);
  }

  return (
    <div className="flex justify-between items-center p-2 text-gray-500">
      <div className="inline-flex items-center">
        <ChatBubbleOvalLeftEllipsisIcon
          onClick={(e) => {
            e.preventDefault();

            // if (status === 'loading') return;

            if (!currentUser) {
              signIn();
            } else {
              setPostId(id);
              setModalOpen(!modalOpen);
            }
          }}
          className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" 
        />
        {commentsCount > 0 && (
          <span className="text-sm select-none">{commentsCount}</span>
        )}
      </div>
      {currentUser?.uid === uid && (
        <TrashIcon onClick={deletePost} className="w-9 h-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100" />
      )}
      <div className="inline-flex items-center">
        {hasLiked ? (
          <HeartIconFilled onClick={likePost} className="w-9 h-9 hoverEffect p-2 text-red-500 hover:bg-red-100" />
        ) : (
          <HeartIcon onClick={likePost} className="w-9 h-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100" />
        )}
        {likes.length > 0 && (
          <span className={`${hasLiked && 'text-red-600'} text-sm select-none`}>{likes.length}</span>
        )}
      </div>
      <ShareIcon className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
      <ChartBarIcon className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
    </div>
  )
}