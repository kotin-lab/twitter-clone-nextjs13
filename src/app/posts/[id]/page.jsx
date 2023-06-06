import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

// Components
import CommentModal from "@/components/CommentModal";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import PostPageFeedNavbar from "@/components/PostPageFeedNavbar";
import Post from "@/components/Post";
import PostPageComments from "@/components/PostPageComments";

export default async function PostPage({params}) {
  let post;
  const postId = params.id;

  // Fetch post
  const postRef = doc(db, 'posts', postId);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    post = postSnap;
  }

  if (!post) {
    return <h1 className="text-center my-4 text-gray-700">No such post found!</h1>
  }

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

        <PostPageComments postId={postId} />
      </div>
      
      {/* Widgets */}
      <Widgets />
      
      {/* Modal */}
      <CommentModal />
    </main>
  );
}

