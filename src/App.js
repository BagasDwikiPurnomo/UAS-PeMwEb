import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PlayerList from './components/Player/PlayerList';
import GudangManager from './components/Gudang/GudangManager';
import Login from './components/Login/login';
import SidebarWithSearch from './components/sidebar';
import NotFound from './components/NotFound';
import CashierPage from './components/Kasir/Kasir';
import AdminPage from './components/Admin/AdminPage';
import SupplierPage from './components/Supplier/Supplier';
import data from './data/user.json';
// import AcceptPurchaseForm from './components/Kasir/AcceptPurchase'; 
// import { formatRupiah } from './FormatHarga'; 

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const [isLogout, setIsLogout] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [gudangData, setGudangData] = useState([]);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState(data.users);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedIsLogin = localStorage.getItem('isLogin');
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    const storedPurchases = localStorage.getItem('purchases');
    const storedGudangData = localStorage.getItem('gudangData');
    const storedRequests = localStorage.getItem('requests');
    const storedUsers = localStorage.getItem('users');

    if (storedIsLogin) {
      setIsLogin(JSON.parse(storedIsLogin));
    }

    if (storedUser) {
      setUser(storedUser);
    }

    if (storedRole) {
      setRole(storedRole);
    }

    if (storedPurchases) {
      setPurchases(JSON.parse(storedPurchases));
    }

    if (storedGudangData) {
      setGudangData(JSON.parse(storedGudangData));
    }

    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('isLogin', JSON.stringify(isLogin));
    localStorage.setItem('user', user);
    localStorage.setItem('role', role);
    localStorage.setItem('purchases', JSON.stringify(purchases));
    localStorage.setItem('gudangData', JSON.stringify(gudangData));
    localStorage.setItem('requests', JSON.stringify(requests));
    localStorage.setItem('users', JSON.stringify(users));
  }, [isLogin, user, role, purchases, gudangData, requests, users]);

  const handleLogin = (username, userRole) => {
    setUser(username);
    setRole(userRole);
    setIsLogin(true);
    setIsLogout(false);
  };

  const handleLogout = () => {
    setUser('');
    setRole('');
    setIsLogin(false);
    setIsLogout(true);
  };

  const addPurchase = (newPurchase) => {
    setPurchases([...purchases, newPurchase]);
  };

  const acceptPurchase = (updatedPurchase) => {
    setPurchases(purchases.map(p => p.id === updatedPurchase.id ? updatedPurchase : p));
  };

  const handleRequest = (requestedPurchase) => {
    setRequests([...requests, requestedPurchase]);
  };

  const declinePurchase = (updatedPurchase) => {
    setPurchases(purchases.map(p => p.id === updatedPurchase.id ? updatedPurchase : p));
  };

  const acceptRequest = (id) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: 'Accepted' } : request
      )
    );
  };

  const declineRequest = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  const requestMoreInfo = (id) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: 'Request Info' } : request
      )
    );
  };

  const handleDeleteRequest = (requestId) => {
    setRequests(requests.filter(request => request.id !== requestId));
  };

  const getDefaultRoute = (role) => {
    switch (role) {
      case 'Admin':
        return '/admin';
      case 'Gudang':
        return '/gudang';
      case 'Konsumen':
        return '/Menu';
      case 'Kasir':
        return '/kasir';
      case 'Supplier':
        return '/supplier';
      default:
        return '/login';
    }
  };

  return (
    <Router>
      <div className="App">
        <h1 style={{ margin: '10px' }}>Management Inventory System</h1>
        <Routes>
          <Route path="/" element={<Navigate to={isLogin ? getDefaultRoute(role) : '/login'} />} />
          <Route path="/Menu" element={<PrivateRoute isLogin={isLogin} user={user} role={role} isLogout={isLogout} handleLogout={handleLogout} purchases={purchases} addPurchase={addPurchase} gudangData={gudangData} setGudangData={setGudangData} />} />
          <Route path="/Gudang" element={<PrivateRoute isLogin={isLogin} user={user} role={role} isLogout={isLogout} handleLogout={handleLogout} purchases={purchases} addPurchase={addPurchase} gudangData={gudangData} setGudangData={setGudangData} />} />
          <Route path="/Kasir" element={<PrivateRoute isLogin={isLogin} user={user} role={role} isLogout={isLogout} handleLogout={handleLogout} purchases={purchases} addPurchase={addPurchase} gudangData={gudangData} setGudangData={setGudangData} requests={requests} acceptPurchase={acceptPurchase} declinePurchase={declinePurchase} handleRequest={handleRequest} />} />
          <Route path="/Supplier" element={<PrivateRoute isLogin={isLogin} user={user} role={role} isLogout={isLogout} handleLogout={handleLogout} purchases={purchases} addPurchase={addPurchase} gudangData={gudangData} setGudangData={setGudangData} requests={requests} acceptRequest={acceptRequest} declineRequest={declineRequest} requestMoreInfo={requestMoreInfo} onRequest={handleRequest} onDeleteRequest={handleDeleteRequest} />} />
          <Route path="/admin" element={<PrivateRoute isLogin={isLogin} user={user} role={role} isLogout={isLogout} handleLogout={handleLogout} purchases={purchases} addPurchase={addPurchase} requests={requests} acceptRequest={acceptRequest} declineRequest={declineRequest} requestMoreInfo={requestMoreInfo} users={users} setUsers={setUsers}  gudangData={gudangData} setGudangData={setGudangData} onRequest={handleRequest} onDeleteRequest={handleDeleteRequest} acceptPurchase={acceptPurchase} declinePurchase={declinePurchase} handleRequest={handleRequest}/> } />          
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

function PrivateRoute({ isLogin, user, role, isLogout, handleLogout, purchases, addPurchase, gudangData = [], setGudangData, requests, acceptPurchase, declinePurchase, acceptRequest, declineRequest, requestMoreInfo, handleRequest, onDeleteRequest, users, setUsers, handleDeleteRequest }) {
  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      <div className="w-1/4">
        <SidebarWithSearch isLogout={isLogout} onLogout={handleLogout} />
      </div>
      <div className="w-3/4">
      {role === 'Konsumen' && <PlayerList user={user} purchases={purchases} addPurchase={addPurchase} gudangData={gudangData} setGudangData={setGudangData}/>}
      {role === 'Gudang' && <GudangManager user={user} gudangData={gudangData} setGudangData={setGudangData} />}
      {role === 'Admin' && <AdminPage requests={requests} purchases={purchases} onAccept={acceptPurchase} onDecline={declinePurchase} users={users} setUsers={setUsers} gudangData={gudangData} setGudangData={setGudangData} onRequest={handleRequest} onDeleteRequest={handleDeleteRequest} acceptRequest={acceptRequest} declineRequest={declineRequest} requestMoreInfo={requestMoreInfo}/>}
      {role === 'Kasir' && <CashierPage purchases={purchases} onAccept={acceptPurchase} onDecline={declinePurchase} gudangData={gudangData} setGudangData={setGudangData} onRequest={handleRequest} />}
      {role === 'Supplier' && <SupplierPage requests={requests} acceptRequest={acceptRequest} declineRequest={declineRequest} requestMoreInfo={requestMoreInfo} gudangData={gudangData} setGudangData={setGudangData} onRequest={handleRequest} onDeleteRequest={handleDeleteRequest} />}
      </div>
    </div>
  );
}

export default App;