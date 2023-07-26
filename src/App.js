// App.js
import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import MainPage from './MainPage';
import INVENTARIO from './INVENTARIO'


const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="container">
      {!isLoggedIn ? <Login onLogin={handleLogin} /> : <MainPage />}
    </div>
  );
};

export default App;
