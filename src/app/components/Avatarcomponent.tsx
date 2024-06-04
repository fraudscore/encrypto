"use client"
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";


async function clearcookie() {
  const response = await fetch("http://localhost:3000/api/clearcookie", {
      method: "POST"
  })
  if(response.status === 200){
      console.log("Cookie cleared")
      window.location.href = '/';
  }
}

function Avatarcomponent({username, email, image}: any) {
  return (
    <div className="flex items-center gap-4 mr-3">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: image,
            }}
            className="transition-transform"
            description={`@${username}`}
            name={email}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@{username}</p>
          </DropdownItem>
          <DropdownItem key="settings">
            My Settings
          </DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">
            Analytics
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            <a onClick={clearcookie}>            Log Out
</a>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>)
}

export default Avatarcomponent