import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { cache } from 'react';

// Components
import CommentModal from "@/components/CommentModal";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import PostPageFeedNavbar from "@/components/PostPageFeedNavbar";
import Post from "@/components/Post";
import PostPageComments from "@/components/PostPageComments";

const getPost = async id => {
  const postSnap = await getDoc(doc(db, 'posts', id));
  
  if (!postSnap.exists()) return undefined;

  return postSnap;
};

export async function generateMetadata({params: {id: postId}}) {
  let post = await getPost(postId);
  
  post = post?.data();

  return {
    title: `${post?.text ? `Post: "${post.text}"` : 'Post page'}`
  };
}

export default async function PostPage({params}) {
  const postId = params.id;

  // Fetch post
  const post = await getPost(postId);

  return (
    <main className="flex min-h-screen max-w-7xl mx-auto">
      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}      
      <div className="xl:ml-[313px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="sticky top-0 z-40">
          <PostPageFeedNavbar />
        </div>
        <Post post={post} />

        <div className="">
          <PostPageComments postId={postId} />
        </div>
      </div>
      
      {/* Widgets */}
      <Widgets />
      
      {/* Modal */}
      <CommentModal />
    </main>
  );
}

