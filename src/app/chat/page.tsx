import { cookies } from 'next/headers';
import React from 'react';
import { decrypt } from '../api/register/route';
import type DecryptedToken from '@/types/types';
import type { PrivateChat, GroupChat } from '@/types/types';
import {Button} from "@nextui-org/react";
import AddChat from '../components/AddChat';

async function page() {
  const cookieStore = cookies();
  const sessiontoken = cookieStore.get("sessiontoken");
  let decryptedToken: null | DecryptedToken = null;
  let groupChats: null | GroupChat[] = null;
  let privateChats: null | PrivateChat[] = null;

  if (sessiontoken?.value) {
    decryptedToken = decrypt(sessiontoken.value) as DecryptedToken;
    privateChats = decryptedToken?.privateChats;
    groupChats = decryptedToken.groupChats;
    console.log(decryptedToken);
  }

  return (
    <div className='bg-gray-950 h-screen flex'>
      <div className='w-1/3 border-r border-gray-700 p-4'>
        <div className='mb-4 flex gap-2'>
          <input
            type='text'
            placeholder='Search Contacts'
            className='w-full p-2 rounded-xl bg-blue-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-transparent'
          />
                    <AddChat/>

        </div>
        {(!groupChats || !privateChats) ? (
          <div className='flex gap-4'>
          <h1 className='text-white text-2xl font-semibold '>No chats yet</h1>
          </div>
        ) : (
          <div className='space-y-4'>
            {groupChats.map((chat, index) => (
              <div key={index} className='bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-colors'>
                <h2 className='text-white text-lg font-medium'>Chat {index + 1}</h2>
                <p className='text-gray-400'>Last message preview...</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='w-2/3 p-4'>
        <h1 className='text-white'>Chat Area</h1>
        {/* Hier kommt der Chat-Inhalt hin */}
      </div>
    </div>
  );
}

export default page;
