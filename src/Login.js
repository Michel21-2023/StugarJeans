// Login.js
import React, { useState } from 'react';
import imagenis from "../src/imagen/88.77.png"


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Por favor, rellene los campos vacíos');
      return;
    }

    // Verificar si el usuario es admin y la contraseña es 12345
    if (username === 'admin' && password === '12345') {
      onLogin(); // Llamada a la función de inicio de sesión exitosa en el componente padre
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-form">
      <h1></h1>
      <img src={imagenis} alt="Login" />
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default Login;
