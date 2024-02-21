import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { useQuiz } from '../../context/QuizContext';
import { ScreenTypes } from '../../types';
import Button from '../ui/Button';

const PageCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;

const CenterCardContainer = styled.div`
  width: 95%;
  max-width: 800px; // Increased max-width for larger video
  background: white;
  padding: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Heading = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

const VideoContainer = styled.div`
  margin: 20px 0;
  background: black;
  video {
    width: 100%;
    height: auto;
  }
`;

const QuizTopicsScreen: React.FC = () => {
  const { setCurrentScreen, setCurrentStep } = useQuiz();
  const [videoFinished, setVideoFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && videoRef.current && !videoFinished) {
        videoRef.current.pause();
      } else if (document.visibilityState === 'visible' && videoRef.current && !videoFinished) {
        videoRef.current.play();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [videoFinished]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const onVideoEnd = () => {
    setVideoFinished(true);
  };

  const goToQuizDetailsScreen = () => {
    setCurrentStep(2)
    localStorage.setItem('step','2')
    setCurrentScreen(ScreenTypes.QuizTopicsScreen);
  };

  return (
    <PageCenter>
      <CenterCardContainer>
        <Heading>Menulis Dongeng</Heading>
        <VideoContainer>
          <video
            ref={videoRef}
            onEnded={onVideoEnd}
            controls
          >
            <source src="https://storage.cloud.google.com/rektbookie/quiz-video/materi-2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </VideoContainer>
        <Button
          text="Lanjutkan"
          onClick={goToQuizDetailsScreen}
          disabled={!videoFinished}
        />
      </CenterCardContainer>
    </PageCenter>
  );
};

export default QuizTopicsScreen;
