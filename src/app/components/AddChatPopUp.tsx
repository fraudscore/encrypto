import React, { useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import debounce from 'lodash.debounce';

function AddChatPopUp({ show, onClose }: any) {
  const [users, setUsers]: any = useState([]);
  const [totalUsers, setTotalUsers]: any = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async (query: string, page: number) => {
    const response = await fetch(`http://localhost:3000/api/getalluser?page=${page}&limit=${usersPerPage}&query=${query}`, {
      method: "GET"
    });
    const data = await response.json();
    setUsers(data.users);
    setTotalUsers(data.totalUsers);
  };

  const debouncedFetchUsers = debounce(fetchUsers, 300);

  useEffect(() => {
    if (show) {
      debouncedFetchUsers(searchQuery, currentPage);
    }
  }, [show, searchQuery, currentPage]);

  if (!show) return null;

  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAddChat = async (userEmail: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/addchat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ addChatUserEmail: userEmail })
      });

      const data = await response.json();
      console.log("Status: " + data.Status + " Message: " + JSON.stringify(data));

      if (response.ok) {
        console.log('Chat created successfully:', data.chatId);
      } else {
        console.error('Error creating chat:', data.error);
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-blue-100 p-6 rounded shadow-lg relative">
        <h2 className="text-xl mb-4">Search Users</h2>
        <input
          type="text"
          placeholder="Search Contacts"
          className="w-full pl-8 border-gray-950 font-bold p-2 rounded-xl bg-blue-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-transparent mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul>
          {users.map((user: any, index: any) => (
            <li key={index} className="mb-2 flex items-center">
              <div className="flex items-center flex-grow">
                <img src={user[2].profilepicture} alt={`@${user[0].username}'s profile`} className="w-8 h-8 rounded-full mr-2" />
                <span className="font-bold">@{user[0].username}</span>
                <span className="text-gray-500"> ({user[1].email})</span>
              </div>
              <Button
                color="primary"
                variant="shadow"
                className="rounded focus:outline-none px-11 py-3 ml-3"
                onClick={() => handleAddChat(user[1].email)}
              >
                Add Chat
              </Button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 px-2 py-1 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <Button color="primary" variant="shadow" onClick={onClose} className='absolute top-2 right-2 px-2 py-1 rounded focus:outline-none'>
          Close
        </Button>
      </div>
    </div>
  );
}

export default AddChatPopUp;
