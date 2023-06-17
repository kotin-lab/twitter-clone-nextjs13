'use client';

import useAuthStatus from "@/hooks/useAuthStatus";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SignInButton() {
  const {currentUser, status} = useAuthStatus();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handlers
  function handleSignIn() {
    const searchParamsStr = searchParams.toString();
    let callbackUrl = `${window.location.origin}${pathname}${searchParamsStr ? '/?' + searchParamsStr : ''}`;
    callbackUrl = encodeURIComponent(callbackUrl);
    
    router.push(`/auth/signin?callbackUrl=${callbackUrl}`);
  }

  return !currentUser && status !== 'loading' && status !== 'authenticated' && (
    <button onClick={handleSignIn} className="bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md text-lg hover:brightness-95 hidden xl:inline">
      Sign in
    </button>
  )
}
