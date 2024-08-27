import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from '../Components/Questions';
import './AssessmentFormPage.css';
import {useNavigate} from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const AssessmentFormPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
   //console.log('touched')
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleNext = (event) => {
    event.preventDefault()
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = (event) => {
    event.preventDefault()
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption
    }));
    try {
      const response = await axios.post('http://localhost:5000/api/responses', { answers: formattedAnswers });
      console.log('Assessment submitted:', response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error(`this is the error  ${error}`);
    }
  };

  const isNextDisabled = !answers[questions[currentQuestionIndex]?._id];
  if (isSubmitted) {
    return (
      <div className="main">
        <h2>Thank you for completing the assessment!</h2>
        <p>Your responses have been recorded.</p>
        <button className='go-home-button' type='button' onClick={goHome}>
          Go Home
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  return  (
    <div className="main">
      <div className="welcome-text">
        <h2>Welcome to the SMEs AI Readiness Assessment!</h2>
        <p>Answer the following questions to see how prepared your organization is to adopt AI and data-driven solutions.</p>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>
      {questions.length > 0 && (
        <form onSubmit={handleSubmit}>
          <Question
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            selectedOption={answers[questions[currentQuestionIndex]._id]}
            handleOptionChange={(option) => handleOptionChange(questions[currentQuestionIndex]._id, option)}
          />
            <div className="button-group">
          <button
            type="button"
            className="back-button"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
          >
            Back
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button type="button" className="next-button" onClick={handleNext} disabled={isNextDisabled}>
              Next
            </button>
          ) : (
            <button type="submit" className="submit-button">
              Submit Assessment
            </button>
          )}
        </div>
        </form>
      )}
    </div>
  );
};

export default AssessmentFormPage;

