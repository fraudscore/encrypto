'use client'
import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import Alert from '@/app/components/Alert';

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ title: '', description: '', status: 0 }); // State for managing alert

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        title: 'Missing Fields',
        description: 'All fields are required. Please fill in all the fields.',
        status: 400
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.status === 200) {
        setAlert({
          title: 'Login Successful',
          description: 'Your login was successful. Redirecting...',
          status: 200
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setAlert({
          title: 'Login Failed',
          description: 'Invalid email or password. Please try again.',
          status: response.status
        });
      }
    } catch (e: any) {
      setAlert({
        title: 'Network Error',
        description: 'There was a network error. Please try again.',
        status: 400
      });
      console.log(e);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-950'>
      <div className='bg-blue-50 p-6 rounded-lg'>
        {alert.status !== 0 && (
          <div className='mb-4'>
            <Alert title={alert.title} description={alert.description} status={alert.status} />
          </div>
        )}
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
