'use client';

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Components
import News from "./News";

export default function Widgets({newsResults, randomUsers}) {
  const [articleNum, setArticleNum] = useState(3);
  const [randomUserNum, setRandomUserNum] = useState(3);

  return (
    <div className="flex-1 max-w-sm xl:max-w-xs px-2 hidden lg:block ml-8 space-y-5">
      {/* Search box */}
      <div className="bg-white sticky z-40 top-0 py-1.5">
        <div className="flex items-center bg-red-300 rounded-full p-3 relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 z-10" />
          <input 
            type="text" 
            placeholder="Search Twitter"
            className="absolute pl-11 rounded-full inset-0 border-gray-500 focus:shadow-lg focus:bg-white focus:ring-0 text-gray-700 bg-gray-100"
          />
        </div>
      </div>

      {/* News */}
      <div className="text-gray-700 bg-gray-100 rounded-xl pt-4">
        <h4 className="font-bold text-xl px-4 mb-3">What&apos;s happening?</h4>
        {newsResults.slice(0, articleNum).map(article => (
          <News key={article.url} article={article} />
        ))}
        {articleNum < newsResults.length && (
          <button 
            onClick={() => setArticleNum(articleNum + 3)}
            className="text-blue-300 hover:text-blue-400 pl-4 pb-3 mt-3"
          >
            Show more
          </button>
        )}
      </div>
      
      {/* Users */}
      <div className="sticky top-16 text-gray-700 bg-gray-100 rounded-xl pt-4">
        <h4 className="font-bold text-xl px-4 mb-3">Who to follow</h4>
        {randomUsers.slice(0, randomUserNum).map(user => (
          <div key={user.login.uuid} className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-200 transition duration-200 ease-in-out cursor-pointer">
            <img 
              src={user.picture.thumbnail}
              alt="user image"
              width='40'
              height='40'
              className='rounded-full'
            />
            <div className="flex-1">
              <h4 className="font-bold text-sm truncate hover:underline">{user.login.username}</h4>
              <h5 className="truncate text-[13px] text-gray-500">{user.name.first + ' ' + user.name.last}</h5>
            </div>
            <button className="bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">Follow</button>
          </div>
        ))}
        {randomUserNum < randomUsers.length && (
          <button 
            onClick={() => setRandomUserNum(randomUserNum + 3)}
            className="text-blue-300 hover:text-blue-400 pl-4 pb-3 mt-3"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  )
}
