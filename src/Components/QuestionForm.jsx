import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const QuestionForm = ({ onQuestionAdded }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      await axios.post(
        'http://localhost:5000/api/questions',
        { question, options },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request header
          },
        }
      );
      setQuestion('');
      setOptions(['', '', '', '']);
      
      // Show an alert after successfully adding a question
      alert('New question added successfully!');
      
      // Call the callback function to refresh the page
      onQuestionAdded();
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        margin="normal"
        required
      />
      {options.map((option, index) => (
        <TextField
          key={index}
          fullWidth
          label={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          margin="normal"
          required
        />
      ))}
      <Button variant="contained" color="primary" type="submit">
        Add Question
      </Button>
    </Box>
  );
};

export default QuestionForm;

