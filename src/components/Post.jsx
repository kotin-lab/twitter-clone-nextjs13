import { 
  ChartBarIcon, 
  ChatBubbleOvalLeftEllipsisIcon, 
  ShareIcon, 
  TrashIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Moment from "react-moment";

export default function Post({post}) {
  // const post = _post.data();
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
              <Moment fromNow>{post.data().timestamp.toDate()}</Moment>
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
          <TrashIcon className="w-9 h-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100" />
          <HeartIcon className="w-9 h-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-100" />
          <ShareIcon className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  )
}
