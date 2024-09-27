import './App.css';
import Hero from './Components/Hero';
import { useState } from 'react';
import { Button, Dialog, DialogContent, TextField, DialogActions,CircularProgress, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function App() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminUsername,setAdminUsername] = useState('')
  const [adminPassword,setAdminPassword] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const openAdminModal = () => {
    setAdminModalOpen(true);
  };

  const closeAdminModal = () => {
    setAdminModalOpen(false);
    setError('')
  };

  const adminLogin = async (e)  => {
    e.preventDefault();
    try {
      const data ={
        "username":adminUsername,
        "password":adminPassword
      }
      const response = await axios.post('https://smeassessmenttool.onrender.com/api/admin/login',data);
      const {token} = response.data;
      localStorage.setItem('adminToken', token);
      navigate('/admindashboard');
    } catch (error){
      console.log(error)
      setError('Invalid Credentials')
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='app'>
      <div className="navbar">
        <h1 className='header'>SMEs Assessment Tool</h1>
        <button className="admin-button" onClick={openAdminModal}>
          Login
        </button>
      </div>

      <div style={{ marginTop: '-20px' }}> 
        <Hero />
      </div>

       {/*<Dialog
  open={adminModalOpen}
  onClose={closeAdminModal}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    style: {
      borderRadius: '16px', // Rounded corners for the modal
    },
  }}
>
 <DialogContent style={{ backgroundColor: '#f5f5f5', padding: '30px 20px' }}>
    <Typography
      variant="h5"
      style={{ color: '#003366', textAlign: 'center', marginBottom: '20px' }}
    >
      Admin Login
    </Typography>
    <TextField
      autoFocus
      margin="dense"
      label="Username"
      type="email"
      fullWidth
      variant="outlined"
      color="primary" // Same color for focus as password input
      onChange={(e) => setAdminUsername(e.target.value)}
      InputLabelProps={{
        style: { color: '#003366' },
      }}
      InputProps={{
        style: { color: '#003366' },
        classes: {
          notchedOutline: 'custom-outline',
        },
      }}
    />
    <TextField
      margin="dense"
      label="Password"
      type="password"
      fullWidth
      variant="outlined"
      color="primary" // Same color as the email input
      onChange={(e) => setAdminPassword(e.target.value)}
      InputLabelProps={{
        style: { color: '#003366' },
      }}
      InputProps={{
        style: { color: '#003366' },
        classes: {
          notchedOutline: 'custom-outline',
        },
      }}
    />
    {error && <Typography color="error" style={{ marginTop: 10, textAlign: 'center' }}>{error}</Typography>}
  </DialogContent>
  <DialogActions style={{ justifyContent: 'center', padding: '20px' }}>
    <Button
      onClick={closeAdminModal}
      style={{ color: '#003366', fontWeight: 'bold', textTransform: 'uppercase' }}
    >
      Cancel
    </Button>
    <button
      className="admin-login"
      onClick={adminLogin}
      disabled={loading}
      style={{
        backgroundColor: '#003366',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontSize: '1rem',
        cursor: 'pointer',
        textTransform: 'uppercase',
        marginLeft: '10px',
        transition: 'all 0.3s ease',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Login'}
    </button>
  </DialogActions>
</Dialog>*/}
<Dialog open={adminModalOpen} onClose={closeAdminModal} maxWidth="xs" fullWidth>
  <DialogContent style={{ backgroundColor: '#f5f5f5', padding: '30px 20px', borderRadius: '8px' }}>
    <Typography
      variant="h5"
      style={{ color: '#003366', textAlign: 'center', marginBottom: '20px' }}
    >
      Admin Login
    </Typography>
    <TextField
      margin="dense"
      label="Username"
      type="email"
      fullWidth
      variant="outlined"
      color="primary" // Same color for focus as password input
      onChange={(e) => setAdminUsername(e.target.value)}
      InputLabelProps={{
        style: { color: '#003366' },
      }}
      InputProps={{
        style: { color: '#003366' },
        classes: {
          notchedOutline: 'custom-outline',
        },
      }}
    />
    <TextField
      margin="dense"
      label="Password"
      type="password"
      fullWidth
      variant="outlined"
      color="primary" // Same color as the email input
      onChange={(e) => setAdminPassword(e.target.value)}
      InputLabelProps={{
        style: { color: '#003366' },
      }}
      InputProps={{
        style: { color: '#003366' },
        classes: {
          notchedOutline: 'custom-outline',
        },
      }}
    />
    {error && <Typography color="error" style={{ marginTop: 10, textAlign: 'center' }}>{error}</Typography>}
  </DialogContent>
  <DialogActions style={{ justifyContent: 'center', padding: '20px' }}>
    <Button
      onClick={closeAdminModal}
      style={{ color: '#003366', fontWeight: 'bold', textTransform: 'uppercase' }}
    >
      Cancel
    </Button>
    <button
      className="admin-login"
      onClick={adminLogin}
      disabled={loading}
      style={{
        backgroundColor: loading ? '#99b3cc' : '#003366', // Color change when loading
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontSize: '1rem',
        cursor: loading ? 'not-allowed' : 'pointer', // Prevent clicking while loading
        textTransform: 'uppercase',
        marginLeft: '10px',
        transition: 'all 0.3s ease',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center', // Center loading spinner and text
        justifyContent: 'center',
        width: '100px', // Set fixed width to prevent resizing on loading
      }}
    >
      {loading ? (
        <CircularProgress size={24} style={{ color: 'white' }} />
      ) : (
        'Login'
      )}
    </button>
  </DialogActions>
</Dialog>



    </div>
  );
}

export default App;

