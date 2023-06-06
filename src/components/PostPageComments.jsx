'use client';

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

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
    <>
      {comments.map(comment => (
        <Comment 
          key={comment.id} 
          commentId={comment.id} 
          originalPostId={postId} 
          comment={comment.data()} 
        />
      ))}
    </>
  );
}
