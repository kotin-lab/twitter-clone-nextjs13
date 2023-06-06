import { SparklesIcon } from "@heroicons/react/24/solid";
import { getServerSession } from "next-auth";

// Components
import Input from "./Input";
import Posts from "./Posts";

export default function Feed() {
  const session = getServerSession();

  return (
    <div className="xl:ml-[313px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex items-center justify-between py-2 px-3 sticky top-0 z-40 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center w-9 h-9 px-0">
          <SparklesIcon className="h-5 w-5" />
        </div>
      </div>
      {session && <Input />}
      <Posts />
    </div>
  )
}
