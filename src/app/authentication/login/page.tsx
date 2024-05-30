'use client'
import React, { ReactHTMLElement, useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";


function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
}

const handleSubmit = async () => {
    const response = await fetch("http://localhost:3000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({ email, password })
  }
    )
    if(response.status == 200){
      window.location.href = "/"
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
          />
        </div>
        <div className='w-full max-w-xs mb-4'>
          <Input
          onChange={handlePasswordChange}
            type={isPasswordVisible ? "text" : "password"}
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
        <div className='w-full max-w-xs flex justify-end'>
          <Button onClick={handleSubmit} className='w-32 border border-blue-500 bg-white'>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
