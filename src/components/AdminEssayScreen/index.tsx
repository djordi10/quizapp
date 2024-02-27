import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../ui/Button';
import { ScreenTypes } from '../../types'
import { useQuiz } from '../../context/QuizContext'
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import ReactQuill styles

const Container = styled.div`
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start; /* Aligns items to the left */
  align-items: center;
  margin-bottom: 20px;
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

const AnswerText = styled.p`
  margin-top: 20px;
  font-size: 16px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
`;

const FeedbackBox = styled.div`
  margin-top: 10px;
`;

const ScoreText = styled.h3`
  color: #007bff;
  margin-top: 20px;
`;

const EssayScreen: React.FC = () => {
  const [essayData, setEssayData] = useState([]);
  const [score, setScore] = useState(null);
  const { setCurrentScreen } = useQuiz();

  useEffect(() => {
    const fetchEssaysAndScore = async () => {
      const token = localStorage.getItem('token');
      const userID = localStorage.getItem('currentUserID'); // Retrieve userID from localStorage
      try {
        const response = await axios.get(`https://quizbackend-orcin.vercel.app/get-admin-essay?userid=${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEssayData(response.data.essays);
        setScore(response.data.score);
      } catch (error) {
        console.error('Error fetching essays and score:', error);
      }
    };
    fetchEssaysAndScore();
  }, []);

  const handleFeedbackChange = (questionid, newFeedback) => {
    setEssayData(essayData.map(essay => essay.questionid === questionid ? { ...essay, feedback: newFeedback } : essay));
  };

  const handleSubmitFeedback = async () => {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('currentUserID');
    const feedbackToSend = essayData.map(({ questionid, feedback }) => ({
      userID,
      questionid,
      feedback
    }));

    try {
      await axios.post('https://quizbackend-orcin.vercel.app/submit-feedback', feedbackToSend, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('All feedback submitted successfully');
      setCurrentScreen(ScreenTypes.AdminScreen);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setCurrentScreen(ScreenTypes.AdminScreen);
    }
  };

  const handleBack = () => {
    // Navigate back to the AdminPage
    setCurrentScreen(ScreenTypes.AdminScreen);
  };

  return (
    <Container>
      <Header>
        <Button text="Kembali" onClick={handleBack} />
        {/* You can place additional header content here if needed */}
      </Header>
      <h2>User Essays and Feedback</h2>
      {score !== null && <ScoreText>User Score: {score}</ScoreText>}
      {essayData.map(({ questionid, useranswer, feedback }) => (
        <div key={questionid}>
          <AnswerText>Answer to Question {questionid}:</AnswerText>
          <ReactQuill 
            theme="snow"
            value={useranswer}
          />
          <FeedbackBox>
            <TextArea
              value={feedback}
              placeholder="Write your feedback here"
              onChange={(e) => handleFeedbackChange(questionid, e.target.value)}
            />
          </FeedbackBox>
        </div>
      ))}
      <Button text="Submit Feedback" onClick={handleSubmitFeedback} />
    </Container>
  );
};

export default EssayScreen;
