import { cookies } from 'next/headers';
import React from 'react';
import { decrypt } from '../api/register/route';
import type DecryptedToken from '@/types/types';
import type { PrivateChat, GroupChat } from '@/types/types';
import { Chip } from "@nextui-org/react";
import AddChat from '../components/AddChat';

async function page() {
  const cookieStore = cookies();
  const sessiontoken = cookieStore.get("sessiontoken");
  let decryptedToken: null | DecryptedToken = null;
  let groupChats: null | GroupChat[] = [];
  let privateChats: null | PrivateChat[] = [];

  if (sessiontoken?.value) {
    decryptedToken = decrypt(sessiontoken.value) as DecryptedToken;
    console.log(decryptedToken)
    privateChats = decryptedToken?.privateChats || [];
    groupChats = decryptedToken?.groupChats || [];
  }

  return (
    <div className='bg-gray-950 h-screen flex overflow-hidden'>
      <div className='w-1/3 border-r border-gray-700 p-4'>
        <div className="flex items-center justify-center ">
          <div className='mb-4 flex gap-2 items-center'>
            <div className="relative w-full">
              <span className="absolute left-3 top-2 text-black font-bold">@</span>
              <input
                type='text'
                placeholder='Search Contacts'
                className='w-full pl-8 font-bold p-2 rounded-xl bg-blue-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-transparent'
              />
            </div>
            <AddChat />
          </div>
        </div>
        {groupChats.length === 0 && privateChats.length === 0 ? (
          <div className="flex items-center justify-center">
            <div className='flex gap-4 items-center'>
              <Chip color="warning" className="bg-gray-700 border-gray-400 text-blue-100" variant="faded">Pretty empty here</Chip>
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            {privateChats.map((chat, index) => (
              <div key={index} className='bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-colors'>
                <h2 className='text-white text-lg font-medium'>Private Chat {index + 1}</h2>
                <p className='text-gray-400'>Last message preview...</p>
              </div>
            ))}
            {groupChats.map((chat, index) => (
              <div key={index} className='bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-colors'>
                <h2 className='text-white text-lg font-medium'>Group Chat {index + 1}</h2>
                <p className='text-gray-400'>Last message preview...</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='w-2/3 p-4'>
        <div className="flex items-center justify-center min-h-screen">
          <Chip color="warning" className="bg-gray-700 border-gray-400 text-blue-100" variant="faded">Select a Chat</Chip>
        </div>
      </div>
    </div>
  );
}

export default page;
