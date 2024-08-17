import React, { useState } from 'react';
import axios from 'axios';
import styles from './login.module.css';
import {useNavigate} from 'react-router-dom'
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3030/api/auth/login', { username, password });
        console.log('Login successful', response.data);
        localStorage.setItem('token', response.data.token);

        // Redirect to a protected route
        navigate('/admin')
      } catch (err) {
        setError('Wrong Input');
      }
  };

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.toggleButton}
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          <div ><a className={styles.forgotButton} href="">forgot password ?</a></div>
        </div>
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
