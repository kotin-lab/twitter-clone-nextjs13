'use client';

import { getProviders } from 'next-auth/react';
import Image from 'next/image';

// Components
import PrividerSignInButton from '@/components/PrividerSignInButton';
import { useEffect, useState } from 'react';

export default function Signin() {
  const [providers, setProviders] = useState(null);

  // Effects
  useEffect(() => {
    async function fetchProviders() {
      const providers = await getProviders();
      setProviders(providers);
    }
    fetchProviders();
  }, []);

  return (
    <div className='flex space-x-4 justify-center items-center h-screen'>
      <img 
        src='https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png'
        alt='twitter image inside a phone'
        className='w-48 h-80 hidden sm:block object-cover rotate-6'
      />
      <div className="">
        <div className="flex flex-col items-center">
          <Image 
            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/292px-Logo_of_Twitter.svg.png'}
            width={125}
            height={125}
            alt="twitter logo"
            className="object-contain mb-10 w-28 h-28"
          />
          <p className='text-gray-700 mb-6 text-center'>This app is created for learning purposes</p>

          {providers && (
            <div className="flex space-x-3 items-center">
              {Object.values(providers).map(provider => (
                <PrividerSignInButton key={provider.id} provider={provider} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
