'use client';

import { RecoilRoot } from 'recoil';

export function RecoilProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}