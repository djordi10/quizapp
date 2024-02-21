import React, { useState ,useEffect} from 'react';
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

const RevisionBox = styled.div`
  background-color: rgba(255, 0, 0, 0.1); // Light red background
  border: 1px solid red; // Red border
  padding: 10px;
  margin-top: 10px;
  color: red; // Red text color
  font-style: italic;
  border-radius: 5px;
`;

const EssayScreen: React.FC = () => {
  const [responseOne, setResponseOne] = useState('');
  const [responseTwo, setResponseTwo] = useState('');
  const [responseThree, setResponseThree] = useState('');
  const [feedback, setFeedback] = useState([]);
  const { setCurrentScreen, setCurrentStep } = useQuiz();

  useEffect(() => {
    const fetchFeedback = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://quizbackend-orcin.vercel.app/get-feedback', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        setFeedback(response.data);
        // Set existing answers if any
        response.data.forEach((item) => {
          if (item.questionid === 1) setResponseOne(item.useranswer);
        });
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };
    fetchFeedback();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    
    const answers = [
      { questionID: 1, userAnswer: responseOne }
    ];

    try {
      await axios.post('https://quizbackend-orcin.vercel.app/submit-essay', {  answers }, {
        headers: {
          Authorization: `Bearer ${token}`
        }  
      });
      console.log('Essays submitted successfully');
      localStorage.setItem('step','4')
      setCurrentStep(4)
      setCurrentScreen(ScreenTypes.QuizTopicsScreen);
    } catch (error) {
      console.error('Error submitting essays:', error);
    }
  };

  return (
    <Container>
      <h2>Tuliskan</h2>
      {feedback[0]?.feedback && (
      <RevisionBox>Revisi: {feedback[0].feedback}</RevisionBox>
      )}
      <QuestionText>1. 1. Buatlah dan tulislah 1 dongeng (fabel, mite, legenda, dan sage) hasil karyamu sendiri !</QuestionText>
      <TextArea 
        value={responseOne} 
        onChange={(e) => setResponseOne(e.target.value)}
      />

      <Button text="Lanjutkan" onClick={handleSubmit} />
    </Container>
  );
};

export default EssayScreen;
