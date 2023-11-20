import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuiz } from '../../context/QuizContext';
import Button from '../ui/Button';
import { ScreenTypes } from '../../types'
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  height: 100vh; // Set the height to the full viewport height
  overflow-y: auto; // Enable vertical scrolling if content overflows
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical; // Allows the user to resize the text area vertically
`;

const QuestionText = styled.p`
  margin-top: 20px;
  font-size: 18px;
  font-weight: 500;
`;

const EssayScreen: React.FC = () => {
  const [responseOne, setResponseOne] = useState('');
  const [responseTwo, setResponseTwo] = useState('');
  const [responseThree, setResponseThree] = useState('');
  const { setCurrentScreen, setCurrentStep } = useQuiz();

  const handleSubmit = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    
    const answers = [
      { questionID: 1, userAnswer: responseOne },
      { questionID: 2, userAnswer: responseTwo },
      { questionID: 3, userAnswer: responseThree }
    ];

    try {
      await axios.post('https://quizbackend-orcin.vercel.app/submit-essay', {  answers }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Essays submitted successfully');
      setCurrentStep(4)
      setCurrentScreen(ScreenTypes.QuizTopicsScreen);
    } catch (error) {
      console.error('Error submitting essays:', error);
    }
  };

  return (
    <Container>
      <h2>Tuliskan</h2>
      <QuestionText>1. Buatlah 1 definisi formal!</QuestionText>
      <TextArea 
        value={responseOne} 
        onChange={(e) => setResponseOne(e.target.value)}
      />

      <QuestionText>2. Buatlah 5 jenis definisi nominal (sinonim, simbolik, etimologis, stipulatif, dan denotatif)! Catatan: Definisi tidak boleh sama pada video materi!</QuestionText>
      <TextArea 
        value={responseTwo} 
        onChange={(e) => setResponseTwo(e.target.value)}
      />

      <QuestionText>3. Buatlah 1 definisi operasional</QuestionText>
      <TextArea 
        value={responseThree} 
        onChange={(e) => setResponseThree(e.target.value)}
      />

      <Button text="Lanjutkan" onClick={handleSubmit} />
    </Container>
  );
};

export default EssayScreen;
