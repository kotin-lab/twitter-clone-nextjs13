'use client';

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Components
import News from "./News";

export default function Widgets({newsResults}) {
  const [articleNum, setArticleNum] = useState(3);

  return (
    <div className="flex-1 max-w-sm xl:max-w-none px-2 hidden lg:block ml-8 space-y-5">
      <div className="sticky z-40 top-0 py-1.5">
        <div className="flex items-center bg-red-300 rounded-full p-3 relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 z-10" />
          <input 
            type="text" 
            placeholder="Search Twitter"
            className="absolute pl-11 rounded-full inset-0 border-gray-500 focus:shadow-lg focus:bg-white focus:ring-0 text-gray-700 bg-gray-100"
          />
        </div>
      </div>

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
    </div>
  )
}
