import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

// Components
import PostIcons from "./PostIcons";
import Date from "./Date";
import CommentIcons from "./CommentIcons";

export default function Comment({commentId, originalPostId, comment}) {
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 space-x-3 pl-14">
      {/* user image */}
      <div className="">
        <Image 
          src={comment.userImg}
          alt="user image"
          width={50}
          height={50}
          className="h-10 w-10 object-cover rounded-full cursor-pointer hover:brightness-95"
        />
      </div>

      {/* Right side */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="inline-flex items-center space-x-1 whitespace-nowrap">
            <h4 className="flex-1 font-bold text-[15px] sm:text-[16px] hover:underline">{comment.name}</h4>
            <span className="text-sm sm:text-[15px] ">@{comment.username} -</span>
            {comment.timestamp && (
              <span className="text-sm sm:text-[15px] hover:underline">
                <Date date={comment.timestamp.toDate()} />
              </span>
            )}
          </div>
          {/* Ellipsis icon */}
          <EllipsisHorizontalIcon className="h-10 w-10 hoverEffect p-2 hover:bg-sky-100 hover:text-sky-500" />
        </div>

        {/* post text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{comment.comment}</p>

        {/* icons */}
        <CommentIcons 
          commentId={commentId} 
          originalPostId={originalPostId}
          uid={comment.uid}
        />
      </div>
    </div>
  )
}
