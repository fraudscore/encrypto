'use client'
import React, { useEffect } from 'react';

function AddChatPopUp({ show, onClose }: any) {
  if (!show) return null;

  useEffect(()  => {
    async function GetUser(params:Request) {
      const data = await fetch("http://localhost:3000/api/getalluser", {
        method: "GET"
      })
      const body = await data.json()
    }
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg relative">
        <h2 className="text-xl mb-4">Search Users</h2>
        <input
          type="text"
          placeholder="Search Contacts"
          className="w-full pl-8 font-bold p-2 rounded-xl bg-blue-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-transparent mb-4"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AddChatPopUp;
