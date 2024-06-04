'use client'
import React, { useEffect, useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import axios from 'axios';
import Alert from '@/app/components/Alert';

function Page() {
  const [ip, setIp] = useState('');
  const [username, setUsername] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [alert, setAlert] = useState({ title: '', description: '', status: 0 });

  useEffect(() => {
    getUserIP();
  }, []);

  const getUserIP = async () => {
    const response = await axios.get('https://ipapi.co/json');
    setIp(response.data.ip);
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (!username || !email || !password || !confirmedPassword) {
      setAlert({
        title: 'Missing Fields',
        description: 'All fields are required. Please fill in all the fields.',
        status: 400
      });
      return;
    }

    if (password !== confirmedPassword) {
      setAlert({
        title: 'Password Mismatch',
        description: 'The passwords do not match. Please try again.',
        status: 400
      });
      return;
    }

    try {
      const useragent = navigator.userAgent;
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, useragent, ip })
      });

      const data = await response.json();

      if (response.status === 200) {
        setAlert({
          title: 'Registration Successful',
          description: 'Your registration was successful. Redirecting...',
          status: 200
        });
        setTimeout(() => {
          window.location.href = "/chat";
        }, 2000);
      } else {
        setAlert({
          title: 'Registration Failed',
          description: data.error || 'There was an issue with your registration. Please try again.',
          status: 400
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
            onChange={handleUsernameChange}
            type="text"
            variant="underlined"
            label="Username"
            labelClassName="text-blue-500"
            inputClassName="border-blue-500 focus:border-blue-700"
            className='text-white'
          />
        </div>
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
