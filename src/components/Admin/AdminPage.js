// AdminPage.js
import React, { useState, useEffect } from 'react';
import KonsumenPage from "./KonsumenPage";
import GudangPage from "./GudangPage";
import SupplierPage from './SupplierPage';
import CashierPage from './KasirPage';

const AdminPage = ({ requests, users, setUsers, gudangData, purchases, addPurchase, setGudangData, onUpdateRequest, onDeleteRequest, acceptPurchase, declinePurchase, handleRequest}) => {
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: 'Konsumen' // Default role: Konsumen
  });

  const [activeComponent, setActiveComponent] = useState('Manage Accounts'); // Default to Manage Accounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.password || !newUser.role) {
      alert('Please fill out all fields.');
      return;
    }
    setUsers([...users, newUser]);
    setNewUser({
      username: '',
      password: '',
      role: 'Konsumen' // Reset role to default after adding user
    });
  };

  const handleComponentClick = (componentName) => {
    setActiveComponent(componentName);
  };

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Page</h2>

      {/* Button for each component */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => handleComponentClick('Manage Accounts')}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${activeComponent === 'Manage Accounts' ? 'bg-blue-700' : ''}`}
        >
          Manage Accounts
        </button>
        <button
          onClick={() => handleComponentClick('Konsumen')}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${activeComponent === 'Konsumen' ? 'bg-blue-700' : ''}`}
        >
          Konsumen
        </button>
        <button
          onClick={() => handleComponentClick('Gudang')}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${activeComponent === 'Gudang' ? 'bg-blue-700' : ''}`}
        >
          Gudang
        </button>
        <button
          onClick={() => handleComponentClick('Supplier')}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${activeComponent === 'Supplier' ? 'bg-blue-700' : ''}`}
        >
          Supplier
        </button>
        <button
          onClick={() => handleComponentClick('Kasir')}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${activeComponent === 'Kasir' ? 'bg-blue-700' : ''}`}
        >
          Kasir
        </button>
      </div>

      {/* Conditional rendering based on activeComponent */}
      {activeComponent === 'Manage Accounts' && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Add New User</h3>
          <div className="flex items-center mb-2">
            <label htmlFor="username" className="mr-2">Username:</label>
            <input type="text" name="username" id="username" value={newUser.username} onChange={handleInputChange} className="border border-gray-400 rounded-md px-2 py-1" />
          </div>
          <div className="flex items-center mb-2">
            <label htmlFor="password" className="mr-2">Password:</label>
            <input type="password" name="password" id="password" value={newUser.password} onChange={handleInputChange} className="border border-gray-400 rounded-md px-2 py-1" />
          </div>
          <div className="flex items-center mb-2">
            <label htmlFor="role" className="mr-2">Role:</label>
            <select name="role" id="role" value={newUser.role} onChange={handleInputChange} className="border border-gray-400 rounded-md px-2 py-1">
              <option value="Admin">Admin</option>
              <option value="Gudang">Gudang</option>
              <option value="Konsumen">Konsumen</option>
              <option value="Kasir">Kasir</option>
              <option value="Supplier">Supplier</option>
            </select>
          </div>
          <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add User</button>
        </div>
      )}
      {activeComponent === 'Konsumen' && (
        <KonsumenPage
          gudangData={gudangData}
          purchases={purchases}
          addPurchase={addPurchase}
        />
      )}
      {activeComponent === 'Gudang' && (
        <GudangPage
          gudangData={gudangData}
          setGudangData={setGudangData}
          purchases={purchases}
          addPurchase={addPurchase}
        />
      )}
      {activeComponent === 'Supplier' && (
        <SupplierPage
          requests={requests}
          onUpdateRequest={onUpdateRequest}
          onDeleteRequest={onDeleteRequest}
          gudangData={gudangData}
          setGudangData={setGudangData}
          purchases={purchases}
          addPurchase={addPurchase}
        />
      )}
      {activeComponent === 'Kasir' && (
      <CashierPage
      requests={requests}
      onUpdateRequest={onUpdateRequest}
      onDeleteRequest={onDeleteRequest}
      gudangData={gudangData}
      setGudangData={setGudangData}
      purchases={purchases}
      addPurchase={addPurchase}
      onAccept={acceptPurchase} // Pass the acceptPurchase function from App.js
      onDecline={declinePurchase} // Pass the declinePurchase function from App.js
      onRequest={handleRequest} // Pass the handleRequest function from App.js
    />
      )}
    </div>
  );
};

export default AdminPage;