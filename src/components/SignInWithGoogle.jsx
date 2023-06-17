'use client';

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { 
  collection, 
  doc, 
  documentId, 
  getCountFromServer, 
  query, 
  serverTimestamp, 
  setDoc, 
  where 
} from 'firebase/firestore';
import { useState } from 'react';
import { db } from '@/../firebase';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInWithGoogle() {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Handlers
  async function handleSignIn() {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // The signed-in user info
      const user = result.user.providerData[0];
      console.log(user);

      // true or false
      const _userExists = await userExists(user.uid);
      
      // Add user to firestore
      if (!_userExists) {
        const userRef = doc(db, 'users', user.uid);
        setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          username: user.displayName.split(' ').join('').toLocaleLowerCase(),
          email: user.email,
          phoneNumber: user.phoneNumber,
          userImg: user.photoURL,
          timestamp: serverTimestamp()
        });
      }

      // loading false
      setLoading(false);

      // redirect back
      if (searchParams.has('callbackUrl')) {
        router.replace(searchParams.get('callbackUrl'));
      } else {
        router.replace('/');
      }
    } catch (error) {
      setLoading(false);
      console.log('google signin: ', error);      
    }

    // Check user exists
    async function userExists(uid) {
      const snap = await getCountFromServer(query(
        collection(db, 'users'),
        where(documentId(), '==', uid)
      ));

      return !!snap.data().count;   
    }
  }

  return (
    <button 
      onClick={handleSignIn} 
      disabled={loading}
      className={`${loading? 'disabled:brightness-200 text-gray-400': 'text-white hover:brightness-95 transition-colors'}  px-4 py-2 rounded-lg sm:text-lg bg-red-400 text-center outline-none focus:outline-none focus:ring-0`}
    >
      Sign in with Google
    </button>
  )
}
