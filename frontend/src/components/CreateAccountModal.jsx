import React, { useState } from 'react';
import api from '../api';

const CreateAccountModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    setLoading(true);
    setError('');
    try {
      await api.post('/api/accounts/');
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px', margin: '20px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Open New Account</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>
          By confirming, a new standard account will be created under your profile.
        </p>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '15px', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px' }}>{error}</div>}
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button className="btn" style={{ background: 'transparent', border: '1px solid var(--card-border)' }} onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="btn" style={{ background: 'var(--success)' }} onClick={handleCreate} disabled={loading}>
            {loading ? 'Creating...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountModal;
