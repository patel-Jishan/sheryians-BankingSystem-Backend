import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import CreateAccountModal from '../components/CreateAccountModal';
import TransactionForm from '../components/TransactionForm';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/accounts/');
      // API might return data in different shapes, e.g., res.data.accounts or directly res.data
      const accData = res.data.accounts || res.data || [];
      // Ensure it's an array
      setAccounts(Array.isArray(accData) ? accData : [accData]);
    } catch (error) {
      console.error('Failed to fetch accounts', error);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const totalBalance = accounts.reduce((acc, account) => acc + (account.balance || 0), 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 className="page-title" style={{ marginBottom: '5px' }}>Dashboard</h2>
          <p style={{ color: 'var(--text-muted)' }}>Overview of your finances</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="btn" onClick={() => setShowTransaction(true)}>Transfer Money</button>
          <button className="btn" style={{ background: 'var(--success)' }} onClick={() => setShowCreateAccount(true)}>Open Account</button>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '30px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 64, 175, 0.2) 100%)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Total Balance</h3>
        <div style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
          ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Your Accounts</h3>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading accounts...</div>
      ) : accounts.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: 'var(--text-muted)' }}>You don't have any accounts yet.</p>
          <button className="btn" style={{ marginTop: '15px' }} onClick={() => setShowCreateAccount(true)}>Open your first account</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {accounts.map((account, idx) => (
            <div key={account._id || idx} className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', filter: 'blur(20px)', transform: 'translate(30%, -30%)' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                <span style={{ fontWeight: 500, color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                  {account.accountType || 'Standard'} Account
                </span>
                <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>
                  Active
                </span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '15px', position: 'relative', zIndex: 1 }}>
                ${(account.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between' }}>
                <span>A/N: ••• {(account.accountNumber || account._id?.slice(-4) || 'N/A').toString().slice(-4)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateAccount && (
        <CreateAccountModal 
          onClose={() => setShowCreateAccount(false)} 
          onSuccess={() => {
            setShowCreateAccount(false);
            fetchAccounts();
          }} 
        />
      )}
      
      {showTransaction && (
        <TransactionForm 
          accounts={accounts} 
          onClose={() => setShowTransaction(false)} 
          onSuccess={() => {
            setShowTransaction(false);
            fetchAccounts();
          }} 
        />
      )}
    </div>
  );
};

export default Dashboard;
