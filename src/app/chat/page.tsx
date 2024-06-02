import { cookies } from 'next/headers'
import React from 'react'
import { decrypt } from '../api/register/route';

interface DecryptedToken{
  id: number;
  email: string;
  username: string;
  password: string;
  ip: string;
  useragent: string;
  isAdmin: boolean;
  isEmailConfirmed: boolean;
}

async function page() {

  const cookieStore = cookies()
  const sessiontoken = cookieStore.get("sessiontoken")
  let decryptedToken: null | DecryptedToken;

  if(sessiontoken?.value){
    decryptedToken = decrypt(sessiontoken.value) as DecryptedToken
    console.log(decryptedToken)
  }

  return (
    <div>page</div>
  )
}

export default page