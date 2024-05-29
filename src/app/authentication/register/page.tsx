'use client'
import React, { useEffect, useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import axios from 'axios'

function Page() {

  const[ip, setIp] = useState('')

  useEffect(() => {
    getUserIP()
  }, [])

  const getUserIP = async () => {
      const ip = await axios.get('https://ipapi.co/json');
      console.log(ip.data.ip) 
      setIp(ip.data.ip)
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmedpassword, setconfirmedPassword] = useState("")

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); 
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); 
  }

  const handlePasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setconfirmedPassword(e.target.value)
  }

  const handleSubmit = async () => {
    if(password !== confirmedpassword){
      return
    }
    try{
      const useragent = navigator.userAgent;
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, useragent, ip })
      })
      const data = await response.json()
      
      console.log(response)
    }catch(e: any){
        console.log(e)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-950'>
      <div className='bg-blue-50 p-6 rounded-lg'>
        <div className='w-full max-w-xs mb-4'>
          <Input
            onChange={handleEmailChange}
            type="email"
            variant="underlined"
            label="Email"
            labelClassName="text-blue-500"
            inputClassName="border-blue-500 focus:border-blue-700"
            className='text-white'
          />
        </div>
        <div className='w-full max-w-xs mb-4'>
          <Input
            type={isPasswordVisible ? "text" : "password"}
            onChange={handlePasswordChange}
            variant="underlined"
            label="Password"
            labelClassName="text-blue-500"
            inputClassName="border-blue-500 focus:border-blue-700"
            endContent={
              <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-blue-500 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-blue-500 pointer-events-none" />
                )}
              </button>
            }
          />
        </div>
        <div className='w-full max-w-xs mb-4'>
          <Input
            onChange={handlePasswordConfirmationChange}
            type={isConfirmPasswordVisible ? "text" : "password"}
            variant="underlined"
            label="Confirm Password"
            labelClassName="text-blue-500"
            inputClassName="border-blue-500 focus:border-blue-700"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleConfirmPasswordVisibility}>
                {isConfirmPasswordVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-blue-500 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-blue-500 pointer-events-none" />
                )}
              </button>
            }
          />
        </div>
        <div className='w-full max-w-xs flex justify-end'>
          <Button className='w-32 border bg-white border-blue-500' onClick={handleSubmit}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
