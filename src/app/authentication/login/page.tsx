'use client'
import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-950'>
      <div className='bg-blue-50 p-6 rounded-lg'>
        <div className='w-full max-w-xs mb-4'>
          <Input
            type="email"
            variant="underlined"
            label="Email"
            labelClassName="text-blue-500"
            inputClassName="border-blue-500 focus:border-blue-700"
          />
        </div>
        <div className='w-full max-w-xs mb-4'>
          <Input
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
          <Button className='w-32 border border-blue-500 bg-white'>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
