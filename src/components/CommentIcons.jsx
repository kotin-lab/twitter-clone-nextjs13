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
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";
import { useRouter } from "next/navigation";
import { db } from "../../firebase";

export default function CommentIcons({commentId, originalPostId, uid}) {
  console.log('commentId: ', commentId);
  console.log('originalPostId: ', originalPostId);
  // Component states
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  // Recoil states
  const [postId, setPostId] = useRecoilState(postIdState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  const {data: session, status} = useSession();
  const router = useRouter();

  // Effects
  useEffect(() => {
    const likesRef = collection(db, 'posts', originalPostId, 'comments', commentId, 'likes');
    const unsubscribe = onSnapshot(likesRef, querySnapshot => {
      setLikes(querySnapshot.docs);
    });

    return unsubscribe;
  }, [commentId, originalPostId]);

  useEffect(() => {
    if (!session) return;

    const liked = likes.findIndex(like => like.id === session.user.uid) !== -1;
    setHasLiked(liked);
  }, [likes, session]);

  // Handlers
  async function likeComment(e) {   
    e.preventDefault();

    if (status === 'loading') return;

    if (!session) {
      signIn();
    } else {
      const docRef = doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session.user.uid);
      
      if (hasLiked) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          username: session.user.username
        });
      }
    }
  }

  // Delete post handler
  async function deleteComment(e) {    
    e.preventDefault();
            
    if (confirm('Are you sure you want to delete this comment?')) {
      const postRef = doc(db, 'posts', originalPostId, 'comments', commentId);
      await deleteDoc(postRef);
    }
  }

  return (
    <div className="flex justify-between items-center p-2 text-gray-500">
      <div className="inline-flex items-center">
        <ChatBubbleOvalLeftEllipsisIcon
          onClick={(e) => {
            e.preventDefault();

            if (status === 'loading') return;

            if (!session) {
              signIn();
            } else {
              setPostId(originalPostId);
              setModalOpen(!modalOpen);
            }
          }}
          className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" 
        />
      </div>
      {status !== 'loading' && session?.user.uid === uid && (
        <TrashIcon onClick={deleteComment} className="w-9 h-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100" />
      )}
      <div className="inline-flex items-center">
        {hasLiked ? (
          <HeartIconFilled onClick={likeComment} className="w-9 h-9 hoverEffect p-2 text-red-500 hover:bg-red-100" />
        ) : (
          <HeartIcon onClick={likeComment} className="w-9 h-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100" />
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