'use client';

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button onClick={() => signIn()} className="bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md text-lg hover:brightness-95 hidden xl:inline">
      Sign in
    </button>
  )
}
