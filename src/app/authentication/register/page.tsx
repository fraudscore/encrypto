'use client'
import React, { useState } from 'react'
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

function Page() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
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
      <div className='w-full max-w-xs mb-4'>
        <Input
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
        <Button  className='w-32 border bg-white border-blue-500'>
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default Page
