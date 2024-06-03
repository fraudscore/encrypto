import { cookies } from 'next/headers'
import React from 'react'
import { decrypt } from '../api/register/route';
import type DecryptedToken from '@/types/types';
import type { PrivateChat, GroupChat } from '@/types/types';

async function page() {

  const cookieStore = cookies()
  const sessiontoken = cookieStore.get("sessiontoken")
  let decryptedToken: null | DecryptedToken = null;
  let groupChats: null | GroupChat[] = null;
  let privateChats: null | PrivateChat[] = null;

  if(sessiontoken?.value){
    decryptedToken = decrypt(sessiontoken.value) as DecryptedToken;
    privateChats = decryptedToken?.privateChats;
    groupChats = decryptedToken.groupChats;
    console.log(decryptedToken)
  }

  return (
    <div className='bg-gray-950 h-screen'>
      <h1 className='text-white'>test</h1>
      {groupChats || privateChats && <h1 className='text-white'>No Chats</h1>}
      {groupChats?.map(() => {
        return <h1 className='text-white'>Test</h1>
      })}
    </div>
  )
}

export default page
