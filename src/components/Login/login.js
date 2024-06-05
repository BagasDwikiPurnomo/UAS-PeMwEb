import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import data from '../../data/user.json';

const Login = ({ onLogin }) => {
  const [users] = useState(data.users);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    setTimeout(() => {
      setLoading(false);
      if (user) {
        setError('');
        onLogin(user.username, user.role); // Tambahkan user.role saat memanggil onLogin
        setIsLoggedIn(true);
      } else {
        setError('Invalid username or password');
      }
    }, 1500);
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
              style={{ marginTop: '10px', marginBottom: '10px' }}
            >
              <strong className="font-bold">Error!</strong>&nbsp;
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="mb-4">
            <button
              className={`w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
