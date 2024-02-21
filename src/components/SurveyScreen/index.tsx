import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';
import axios from 'axios'

import { useQuiz } from '../../context/QuizContext';
import { ScreenTypes } from '../../types';

const Container = styled.div`
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

const QuestionText = styled.p`
  margin-top: 20px;
  font-size: 18px;
  font-weight: 500;
`;

const SurveyScreen: React.FC = () => {
  const { setCurrentScreen, setCurrentStep } = useQuiz();
  const [feeling, setFeeling] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const surveyData = {
        feeling,
        comments
    };

    try {
        const response = await axios.post('https://quizbackend-orcin.vercel.app/submit-survey', surveyData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Survey submitted successfully');
        // Redirect the user or give some feedback about successful submission
        setCurrentScreen(ScreenTypes.QuizTopicsScreen)
    } catch (error) {
        console.error('Error submitting survey:', error);
        // Handle the error, maybe show an error message to the user
        setCurrentScreen(ScreenTypes.QuizTopicsScreen)
    }
};


  return (
    <Container>
      <h2>User Satisfaction Survey</h2>
      <QuestionText>a. Bagaimana perasaan Anda terhadap website menulis dongeng tersebut?</QuestionText>
      <TextArea 
        value={feeling} 
        onChange={(e) => setFeeling(e.target.value)}
        placeholder="Your feelings about the website..."
      />
      <QuestionText>b. Bagaimana komentar dan saran Anda terhadap website menulis dongeng tersebut?</QuestionText>
      <TextArea 
        value={comments} 
        onChange={(e) => setComments(e.target.value)}
        placeholder="Your comments and suggestions..."
      />
      <Button text="Submit Survey" onClick={handleSubmit} />
    </Container>
  );
};

export default SurveyScreen;
