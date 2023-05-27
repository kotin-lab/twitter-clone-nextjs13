import { SparklesIcon } from "@heroicons/react/24/solid";
import Input from "./Input";
import Post from "./Post";

export default function Feed() {
  const posts = [
    {
      id: "1",
      name: "Ko Tin",
      username: "codewithkotin",
      userImg: "https://i.pravatar.cc/100",
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80",
      text: "nice view!",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      name: "John Smith",
      username: "codewithjohnsmith",
      userImg: "https://i.pravatar.cc/100",
      img: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80",
      text: "wow!",
      timestamp: "2 days ago",
    },
  ];

  return (
    <div className="xl:ml-[313px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex items-center justify-between py-2 px-3 sticky top-0 z-40 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center w-9 h-9 px-0">
          <SparklesIcon className="h-5 w-5" />
        </div>
      </div>
      <Input />
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
