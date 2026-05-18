import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
      <Link to="/">
        <h1 className="page-title" style={{ marginBottom: 0 }}>NexBank</h1>
      </Link>
      <div>
        {user ? (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{user.username || user.email}</span>
            <button className="btn btn-danger" onClick={handleLogout} style={{ padding: '8px 16px' }}>Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/login" className="btn" style={{ padding: '8px 16px' }}>Login</Link>
            <Link to="/register" className="btn" style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
