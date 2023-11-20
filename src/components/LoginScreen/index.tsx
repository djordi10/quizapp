import React, { useState } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel'; // Ensure you have installed this package
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import axios from 'axios';
import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;

const LoginForm = styled.div`
  width: 40vw;
  padding: 20px;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CarouselImage = styled.img`
  width: 100%; /* Adjust width to fill the container */
  height: 450px; /* Fixed height for all images */
  object-fit: cover; /* Ensures images cover the area without stretching */
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const CarouselContainer = styled.div`
  margin-bottom: 20px;
`;

// Login Screen Component
const LoginScreen = () => {
const { setCurrentScreen, currentStep, setCurrentStep } = useQuiz();
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://quizbackend-orcin.vercel.app/login', { nim, password });
      const { token, fullname } = response.data;
  
      // Store the token and fullname in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('fullname', fullname);
  
      // Redirect or update the UI based on successful login
      // For example, changing the screen or showing a welcome message
      // ...
      setCurrentScreen(ScreenTypes.QuizTopicsScreen)
      setCurrentStep(1)
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      // Handle login failure (e.g., show error message)
    }
  };

  return (
    <LoginContainer>
      <LoginForm>
        <CarouselContainer>
          <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false} showStatus={false}>
            <div>
              <CarouselImage src="/image/rose.jpg" alt="Mawar" />
              <p className="legend">Apakah Mawar itu?</p>
            </div>
            <div>
              <CarouselImage src="/image/mahasiswa.jpg" alt="Mahasiswa" />
              <p className="legend">Apakah Mahasiswa itu?</p>
            </div>
            <div>
              <CarouselImage src="/image/cat.jpg" alt="Kucing" />
              <p className="legend">Apakah Kucing itu?</p>
            </div>
          </Carousel>
        </CarouselContainer>
        <InputField 
          type="text" 
          placeholder="NIM" 
          value={nim} 
          onChange={(e) => setNim(e.target.value)} 
        />
        <InputField 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <LoginButton onClick={handleLogin}>Login</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginScreen;
