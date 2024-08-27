
import React, { useState, useEffect } from 'react';
import { List, Typography, Divider, Box, Paper, CircularProgress, TextField, Button } from '@mui/material';
import axios from 'axios';

const ResponsesList = () => {
  const [groupedResponses, setGroupedResponses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [filterDate, setFilterDate] = useState(''); // State for filtering by date

  useEffect(() => {
    const fetchResponses = async () => {
      const token = localStorage.getItem('adminToken');
      setLoading(true); // Show loading spinner

      try {
        const response = await axios.get('http://localhost:5000/api/responses', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request header
          },
        });
        groupResponsesBySubmission(response.data);
      } catch (error) {
        console.error('Error fetching responses:', error);
      } finally {
        setLoading(false); // Hide loading spinner
      }
    };

    const groupResponsesBySubmission = (responses) => {
      const grouped = responses.reduce((acc, response) => {
        const submissionId = response.submissionId;
        if (!acc[submissionId]) {
          acc[submissionId] = {
            submissionId,
            createdAt: response.createdAt, // Store timestamp
            answers: [],
          };
        }
        acc[submissionId].answers.push(...response.answers); // Spread the answers array
        return acc;
      }, {});

      setGroupedResponses(Object.values(grouped));
    };

    fetchResponses();
  }, []);

  const handleFilter = () => {
    const filteredResponses = groupedResponses.filter(group => {
      const responseDate = new Date(group.createdAt).toISOString().slice(0, 10); // Get YYYY-MM-DD
      return responseDate === filterDate;
    });

    setGroupedResponses(filteredResponses);
  };

  return (
    <Box>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Responses</Typography>
      
      {/* Date Filter */}
      <Box style={{ display: 'flex', marginBottom: '20px', gap: '10px' }}>
        <TextField
          label="Filter by Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filter
        </Button>
      </Box>

      {/* Circular Progress Indicator */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      ) : groupedResponses.length === 0 ? (
        <Typography variant="h6" align="center">No responses found.</Typography>
      ) : (
        <List>
          {groupedResponses.map((group, index) => (
            <Paper key={group.submissionId} elevation={3} style={{ marginBottom: '20px', padding: '10px' }}>
              <Typography variant="h6">Response Group {index + 1}</Typography>
              <Typography variant="body2">
                Submitted on: {new Date(group.createdAt).toLocaleString()} {/* Display timestamp */}
              </Typography>
              <Divider style={{ margin: '10px 0' }} />
              {group.answers.map((answer, idx) => (
                <Box key={answer._id} style={{ marginBottom: '10px' }}>
                  <Typography variant="subtitle1">
                    Question {idx + 1}: {answer.questionId?.question || 'Question not available'}
                  </Typography>
                  
                  <Typography variant="body2">
                    Selected Option: {answer.selectedOption || 'No option selected'}
                  </Typography>
                  <Divider style={{ margin: '10px 0' }} />
                </Box>
              ))}
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ResponsesList;

