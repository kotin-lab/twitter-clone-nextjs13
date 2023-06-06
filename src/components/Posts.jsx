'use client';

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { db } from "../../firebase";

// Components
import Post from "./Post";
import Link from "next/link";

export default function Posts() {
  const [posts, setPosts] = useState([]);

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
    <AnimatePresence>
      {posts.map(post => (
        <motion.div
          key={post.id}
          initial={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.5}}
        >
          <Link href={`/posts/${post.id}`}>
            <Post post={post} />
          </Link>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
