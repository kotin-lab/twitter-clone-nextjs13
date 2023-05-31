import { 
  ChartBarIcon, 
  ChatBubbleOvalLeftEllipsisIcon, 
  ShareIcon, 
  TrashIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import Image from "next/image";
import Moment from "react-moment";
import { db, storage } from "../../firebase";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";

export default function Post({post}) {
  const {data: session} = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  // Effects
  useEffect(() => {
    const likesRef = collection(db, 'posts', post.id, 'likes');
    const unsubscribe = onSnapshot(likesRef, querySnapshot => {
      setLikes(querySnapshot.docs);
    });

    return unsubscribe;
  }, [post.id]);

  useEffect(() => {
    if (!session) return;

    const liked = likes.findIndex(like => like.id === session.user.uid) !== -1;
    setHasLiked(liked);
  }, [likes, session]);

  // Handlers 
  async function likePost() {
    if (!session) {
      signIn();
      return;
    }
    const docRef = doc(db, 'posts', post.id, 'likes', session.user.uid);
    
    if (hasLiked) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, {
        username: session.user.username
      });
    }
  }

  async function deletePost() {
    const postRef = doc(db, 'posts', post.id);
    await deleteDoc(postRef);

    if (post.data().image) {
      const imageRef = ref(storage, `posts/${post.id}/image`);
      await deleteObject(imageRef);
    }
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 space-x-3">
      {/* user image */}
      <div className="">
        <Image 
          src={post.data().userImg}
          alt="user image"
          width={50}
          height={50}
          className="h-11 w-11 object-cover rounded-full cursor-pointer hover:brightness-95"
        />
      </div>

      {/* Right side */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="inline-flex items-center space-x-1 whitespace-nowrap">
            <h4 className="flex-1 font-bold text-[15px] sm:text-[16px] hover:underline">{post.data().name}</h4>
            <span className="text-sm sm:text-[15px] ">@{post.data().username} -</span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post.data().timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* Ellipsis icon */}
          <EllipsisHorizontalIcon className="h-10 w-10 hoverEffect p-2 hover:bg-sky-100 hover:text-sky-500" />
        </div>

        {/* post text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{post.data().text}</p>

        {/* post image */}
        {post.data().image && (
          <Image 
            src={post.data().image}
            alt="post image"
            width={500}
            height={300}
            className="rounded-2xl mr-2"
          />
        )}

        {/* icons */}
        <div className="flex justify-between items-center p-2 text-gray-500">
          <ChatBubbleOvalLeftEllipsisIcon className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          {session?.user.uid === post.data().id && (
            <TrashIcon onClick={() => {
                if (confirm('Are you sure you want to delete this post?')) {
                  deletePost();
                }
              }} 
              className="w-9 h-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100" 
            />
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
      </div>
    </div>
  )
}
