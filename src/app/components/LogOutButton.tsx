"use client"
import { Button } from '@nextui-org/react'
import React from 'react'


async function clearcookie() {
    const response = await fetch("http://localhost:3000/api/clearcookie", {
        method: "POST"
    })
    if(response.status === 200){
        console.log("Cookie cleared")
        window.location.href = '/authentication/login';
    }
}

function LogOutButton() {
  return (
            <Button  onClick={clearcookie} color="primary"  variant="flat" className="fade-in">
                Sign Out
              </Button>  
              )
}

export default LogOutButton