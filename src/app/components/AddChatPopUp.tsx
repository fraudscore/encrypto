import React, { useEffect, useState } from 'react';

function AddChatPopUp({ show, onClose }: any) {
  const [users, setUsers]: any = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Anzahl der Benutzer pro Seite

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`http://localhost:3000/api/getalluser?page=${currentPage}&limit=${usersPerPage}`, {
        method: "GET"
      });
      const data = await response.json();
      setUsers(data.users);
    }

    if (show) {
      fetchUsers();
    }
  }, [show, currentPage]);

  if (!show) return null;

  // Filter users based on search query
  const filteredUsers = users.filter((user: any) =>
    user[0].username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Slice the filtered users based on the current page and users per page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

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
          {currentUsers.map((user: any, index: any) => (
            <li key={index} className="mb-2">
              <img src={user[2].profilepicture} alt={`@${user[0].username}'s profile`} className="w-8 h-8 rounded-full inline-block mr-2" />
              <span className="font-bold">@{user[0].username}</span>
              <span className="text-gray-500"> ({user[1].email})</span>
            </li>
          ))}
        </ul>
        {/* Pagination buttons */}
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
