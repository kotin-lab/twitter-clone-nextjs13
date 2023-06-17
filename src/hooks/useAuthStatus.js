import { db } from '@/../firebase';
import { statusState, userState } from "@/atom/authAtom";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function useAuthStatus() {
  const [status, setStatus] = useRecoilState(statusState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  // Effects
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        async function getUser() {
          const uid = user.providerData[0].uid;
          const ref = doc(db, 'users', uid);
          const snap = await getDoc(ref);
      
          if (snap.exists()) {
            setCurrentUser(snap.data());
          } else {
            setCurrentUser(null);
          }
        }

        getUser();
        setStatus('authenticated');
      } else {
        setCurrentUser(null);
        setStatus('un-authenticated');
      }
    });

    return unsubscribe;
  }, []);

  return {currentUser, status};
}
