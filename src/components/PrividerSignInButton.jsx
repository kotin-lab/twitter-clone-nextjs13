'use client';

import { signIn } from 'next-auth/react';

export default function PrividerSignInButton({provider}) {
  return (
    <button 
      onClick={() => signIn(provider.id, {callbackUrl: '/'})} 
      className='px-4 py-2 rounded-lg sm:text-lg bg-red-400 text-white text-center hover:brightness-95 transition-colors'
    >
      Sign in with {provider.name}
    </button>
  )
}
