"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import AddChatPopUp from './AddChatPopUp';


function AddChat() {



  const [showPopUp, setShowPopUp] = useState(false);

  const handleOpenPopUp = () => {
    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <div>
      <Button color="primary" variant="shadow" className='focus:outline-none' onClick={handleOpenPopUp}>
        Add Chat + 
      </Button>
      <AddChatPopUp show={showPopUp} onClose={handleClosePopUp} />
    </div>
  );
}

export default AddChat;
