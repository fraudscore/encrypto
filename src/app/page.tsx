import React from 'react'
import Button from '@mui/material/Button';
import { Metadata } from 'next';
import LandingPage from './components/LandingPage';

export const metadata: Metadata = {
  title: "Encrypto",
  description: "Secure datatransfer",
  icons: {
      icon: "/img/logo.ico"
  }
};

function page() {
  return <>
  <LandingPage/>
  </>
}

export default page