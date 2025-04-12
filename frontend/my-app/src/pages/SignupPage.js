import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      alert('Signup successful. Please log in.');
      window.location.href = '/login';
    } catch (err) {
      alert('Signup failed. Try a different email.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;