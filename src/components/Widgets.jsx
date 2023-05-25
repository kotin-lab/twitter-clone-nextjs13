import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Widgets() {
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
    </div>
  )
}
