import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AppLogo, CheckIcon, Next, TimerIcon } from '../../config/icons';
import { useQuiz } from '../../context/QuizContext';
import { useTimer } from '../../hooks';
import { device } from '../../styles/BreakPoints';
import { ScreenTypes } from '../../types';
import Button from '../ui/Button';
import ModalWrapper from '../ui/ModalWrapper';
import Question from './Question';
import QuizHeader from './QuizHeader';

const QuizContainer = styled.div<{ selectedAnswer: boolean }>`
  width: 900px;
  min-height: 500px;
  max-height: calc(100vh - 60px); // Sesuaikan tinggi maksimum sesuai kebutuhan
  overflow-y: auto; // Memungkinkan pengguliran vertikal jika konten meluap
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  padding: 30px 60px 80px 60px;
  margin-bottom: 70px;
  position: relative;
  @media ${device.md} {
    width: 100%;
    padding: 15px 15px 80px 15px;
  }
  button {
    span {
      svg {
        path {
          fill: ${({ selectedAnswer, theme }) =>
            selectedAnswer ? `${theme.colors.buttonText}` : `${theme.colors.darkGray}`};
        }
      }
    }
  }
`;

const PageCenter = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; // Memungkinkan pengguliran vertikal
`;

const LogoContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  @media ${device.md} {
    margin-top: 10px;
    margin-bottom: 20px;
    svg {
      width: 185px;
      height: 80px;
    }
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 60px;
  bottom: 30px;
  display: flex;
  gap: 20px;
  @media ${device.sm} {
    justify-content: flex-end;
    width: 90%;
    right: 15px;
  }
`;

const QuestionScreen: FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
  const [selectedPairs, setSelectedPairs] = useState<[string, string][]>([]);
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  const [userPairs, setUserPairs] = useState<[string, string][]>([]);

  const [resetMatching, setResetMatching] = useState<number>(0); // State untuk memicu reset

  const handlePairsUpdated = (pairs: [string, string][]) => {
    setUserPairs(pairs);
  };

  const {
    questions,
    quizDetails,
    result,
    setResult,
    setCurrentScreen,
    timer,
    setTimer,
    setEndTime,
  } = useQuiz();

  const currentQuestion = questions[activeQuestion];
  const { question, type, choices, code, image, correctAnswers, setA, setB, correctPairs } = currentQuestion;

  const handleAnswerSelection = (e: React.ChangeEvent<HTMLInputElement>, item: string) => {
    const { name, checked } = e.target;

    if (type === 'MAQs') {
      if (selectedAnswer.includes(name)) {
        setSelectedAnswer((prevSelectedAnswer) =>
          prevSelectedAnswer.filter((element) => element !== name)
        );
      } else {
        setSelectedAnswer((prevSelectedAnswer) => [...prevSelectedAnswer, name]);
      }
    }

    if (type === 'MCQs' || type === 'boolean') {
      if (checked) {
        setSelectedAnswer([name]);
      }
    }

    // Logika untuk menangani pilihan pencocokan
    if (type === 'matching') {
      // Contoh logika untuk menangani pilihan pencocokan
      // setSelectedPairs([...selectedPairs, [item, otherSelectedItem]]);
      
    }
  };

  const onClickNext = () => {
    let isMatch = false;

    if (type === 'matching') {
      // Logika untuk memeriksa apakah pasangan yang dipilih cocok dengan pasangan yang benar
      isMatch = userPairs.every(userPair => 
        correctPairs.some(correctPair => 
          correctPair[0] === userPair[0] && correctPair[1] === userPair[1]
        )
      );
    } else {
      isMatch = selectedAnswer.length === correctAnswers?.length &&
                selectedAnswer.every((answer) => correctAnswers.includes(answer as any));
    }

    setResetMatching(prev => prev + 1);
    setResult([...result, { ...currentQuestion, selectedAnswer: type === 'matching' ? selectedPairs : selectedAnswer, isMatch }]);
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      // Berapa lama waktu yang dibutuhkan untuk menyelesaikan kuis
      const timeTaken = quizDetails.totalTime - timer;
      setEndTime(timeTaken);
      setShowResultModal(true);
    }
    setSelectedAnswer([]);
    setSelectedPairs([]);
  };

  useEffect(() => {
    if (showTimerModal || showResultModal) {
      document.body.style.overflow = 'hidden';
    }
  }, [showTimerModal, showResultModal]);

  useTimer(timer, quizDetails, setEndTime, setTimer, setShowTimerModal, showResultModal);

  return (
    <PageCenter>
      <LogoContainer>
      </LogoContainer>
      <QuizContainer selectedAnswer={selectedAnswer.length > 0}>
        <QuizHeader
          activeQuestion={activeQuestion}
          totalQuestions={quizDetails.totalQuestions}
          timer={timer}
          type={type}
        />
        <Question
          question={question}
          code={code}
          image={image}
          type={type}
          choices={choices}
          selectedAnswer={selectedAnswer}
          handleAnswerSelection={handleAnswerSelection}
          setA={setA}
          setB={setB}
          correctPairs={correctPairs}
          onPairsUpdated={handlePairsUpdated}
          resetIndicator={resetMatching}
        />
        <ButtonWrapper>
          <Button
            text={activeQuestion === questions.length - 1 ? 'Selesai' : 'Berikutnya'}
            onClick={onClickNext}
            icon={<Next />}
            iconPosition="right"
            disabled={
              type === 'matching'
                ? userPairs.length === 0
                : selectedAnswer.length === 0
            }
          />
        </ButtonWrapper>
      </QuizContainer>
      {(showTimerModal || showResultModal) && (
        <ModalWrapper
          title={showResultModal ? 'Selesai!' : 'Waktu Anda Habis!'}
          subtitle={`Anda telah mencoba ${result.length} pertanyaan secara total.`}
          onClick={() => setCurrentScreen(ScreenTypes.ResultScreen)}
          icon={showResultModal ? <CheckIcon /> : <TimerIcon />}
          buttonTitle="TAMPILKAN HASIL"
        />
      )}
    </PageCenter>
  );
};

export default QuestionScreen;
