'use client';

import { SparklesIcon } from "@heroicons/react/24/solid";
import Input from "./Input";
import Post from "./Post";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const {data: session} = useSession();

  // Effects
  useEffect(() => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setPosts(querySnapshot.docs);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="xl:ml-[313px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex items-center justify-between py-2 px-3 sticky top-0 z-40 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center w-9 h-9 px-0">
          <SparklesIcon className="h-5 w-5" />
        </div>
      </div>
      {session && <Input />}
      <AnimatePresence>
        {posts.map(post => (
          <motion.div
            key={post.id}
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
          >
            <Post post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
