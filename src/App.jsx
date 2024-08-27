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

    
      <Dialog
        open={adminModalOpen}
        onClose={closeAdminModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: 'white', // Ensure white background
            padding: '20px',
            borderRadius: '8px'
          },
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            color='secondary'
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
            color='primary'
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
          {error && <Typography color="error" style={{ marginTop: 10 }}>{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAdminModal} style={{ color: '#003366' }}>
            Cancel
          </Button>
          <button
            className='admin-login'
            onClick={adminLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;

