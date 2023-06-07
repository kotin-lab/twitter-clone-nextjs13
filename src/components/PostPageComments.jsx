'use client';

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Comment from "./Comment";

export default function PostPageComments({postId}) {
  const [comments, setComments] = useState([]);
  
  // Effects
  useEffect(() => {
    const commentsRef = collection(db, 'posts', postId, 'comments');
    const q = query(commentsRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setComments(querySnapshot.docs);
    });

    return unsubscribe;
  }, [postId]);

  return comments.length > 0 && (
    <AnimatePresence>
      {comments.map(comment => (
        <motion.div
          key={comment.id} 
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.5}}
        >
          <Comment 
            commentId={comment.id} 
            originalPostId={postId} 
            comment={comment.data()} 
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
