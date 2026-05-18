import React, { useState } from 'react';
import api from '../api';

const TransactionForm = ({ accounts, onClose, onSuccess }) => {
  const [fromAccount, setFromAccount] = useState(accounts.length > 0 ? accounts[0]._id : '');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    const idempotencyKey = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();

    try {
      const res = await api.post('/api/transactions/', {
        fromAccount,
        toAccount,
        amount: Number(amount),
        idempotencyKey
      });
      
      setSuccessMsg(res.data.message || 'Transaction successful');
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Transaction failed');
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '450px', margin: '20px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Transfer Money</h3>
        
        {successMsg && <div style={{ color: 'var(--success)', marginBottom: '15px', background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>{successMsg}</div>}
        {error && <div style={{ color: 'var(--danger)', marginBottom: '15px', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px' }}>{error}</div>}
        
        {!successMsg && (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>From Account</label>
              <select 
                className="input-control" 
                value={fromAccount} 
                onChange={(e) => setFromAccount(e.target.value)}
                required
                style={{ appearance: 'none', background: 'rgba(0,0,0,0.4)', color: 'white' }}
              >
                {!fromAccount && <option value="" disabled>Select account</option>}
                {accounts.map(acc => (
                  <option key={acc._id} value={acc._id}>
                    {(acc.accountType || 'Standard')} Account - ${acc.balance?.toFixed(2)} (••• {acc._id.slice(-4)})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="input-group">
              <label>To Account (Recipient Account ID)</label>
              <input 
                type="text" 
                className="input-control" 
                placeholder="Enter exact account ID"
                value={toAccount} 
                onChange={(e) => setToAccount(e.target.value)} 
                required 
              />
            </div>

            <div className="input-group">
              <label>Amount ($)</label>
              <input 
                type="number" 
                className="input-control" 
                placeholder="0.00"
                min="0.01"
                step="0.01"
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                required 
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button type="button" className="btn" style={{ background: 'transparent', border: '1px solid var(--card-border)' }} onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn" disabled={loading || !fromAccount}>
                {loading ? 'Processing...' : 'Send Money'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TransactionForm;
