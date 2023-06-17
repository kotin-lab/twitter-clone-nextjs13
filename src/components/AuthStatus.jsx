'use client';

import useAuthStatus from "@/hooks/useAuthStatus";

export default function AuthStatus({children}) {
  useAuthStatus();
  
  return children;
}
