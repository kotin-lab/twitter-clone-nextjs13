import Image from "next/image";

// Components
import SignInButton from "./SignInButton";
import SidebarMiniProfile from "./SidebarMiniProfile";
import SidebarMenu from "./SidebarMenu";
import TweetButton from "./TweetButton";

export default async function Sidebar() {
  return (
    <div className="hidden sm:flex sm:flex-col p-2 xl:items-start fixed h-full xl:ml-[41px]">
      {/* Twitter logo */}
      <div className="hoverEffect p-0 hover:bg-blue-100 w-12 h-12 flex items-center justify-center">
        <Image 
          src={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/292px-Logo_of_Twitter.svg.png'}
          width={50}
          height={50}
          alt="twitter"
          className="object-contain w-8 h-8"
        />
      </div>

      {/* Menu */}
      <div className="mt-4 mb-2.5">
        <SidebarMenu />
      </div>

      {/* Tweet button */}
      <TweetButton />

      {/* Signin Button */}
      <SignInButton />
  
      {/* Mini profile */}
      <SidebarMiniProfile />
    </div>
  )
}
