/*import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, Box } from '@mui/material';
import QuestionForm from '../Components/QuestionForm';
import QuestionList from '../Components/QuestionList';
import ResponsesList from '../Components/ResponsesList';

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleQuestionAdded = () => {
    window.location.reload(); // Refresh the entire page
  };

  return (
    <Container maxWidth="lg" style={{ backgroundColor: '#1c1c1c', minHeight: '100vh', padding: '20px' }}>
      <Box style={{ padding: '20px',backgroundColor: '#1c1c1c', }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="20px">
          <Typography variant="h4">
            Admin Dashboard
          </Typography>
          <button
          onClick={handleOpen}
          style={{
            backgroundColor: '#00fa9a',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
            Add Question
            </button>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '20px', backgroundColor: '#00fa9a' }}>
              <Typography variant="h6" gutterBottom>
                Question List
              </Typography>
              <QuestionList />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '20px', backgroundColor: '#00fa9a' }}>
              <Typography variant="h6" gutterBottom>
                Responses
              </Typography>
              <ResponsesList />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add a New Question</DialogTitle>
        <DialogContent>
          <QuestionForm onQuestionAdded = {handleQuestionAdded} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};
export default AdminDashboard;*/

import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, Box } from '@mui/material';
import QuestionForm from '../Components/QuestionForm';
import QuestionList from '../Components/QuestionList';
import ResponsesList from '../Components/ResponsesList';

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleQuestionAdded = () => {
    window.location.reload(); // Refresh the entire page
  };

  return (
    <Container maxWidth="lg" style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '20px' }}>
      <Box style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="20px">
          <Typography variant="h4" style={{ color: '#333' }}>
            Admin Dashboard
          </Typography>
          <Button
            onClick={handleOpen}
            style={{
              backgroundColor: '#1976d2',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add Question
          </Button>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '20px', backgroundColor: '#ffffff', border: '1px solid #ddd' }}>
              <Typography variant="h6" gutterBottom style={{ color: '#333' }}>
                Question List
              </Typography>
              <QuestionList />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '20px', backgroundColor: '#ffffff', border: '1px solid #ddd' }}>
              <Typography variant="h6" gutterBottom style={{ color: '#333' }}>
                Responses
              </Typography>
              <ResponsesList />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add a New Question</DialogTitle>
        <DialogContent>
          <QuestionForm onQuestionAdded={handleQuestionAdded} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;


