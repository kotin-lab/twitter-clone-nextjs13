'use client';

import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

export function NextAuthProvider({children}) {
  return <SessionProvider>{children}</SessionProvider>
}

export function RecoilProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}