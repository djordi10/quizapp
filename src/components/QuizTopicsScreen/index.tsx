import styled from 'styled-components'
import { useState, useEffect } from "react"

import { AppLogo } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import { quizTopics } from '../../data/quizTopics'
import { device } from '../../styles/BreakPoints'
import {
  CenterCardContainer,
  HighlightedText,
  LogoContainer,
  PageCenter,
} from '../../styles/Global'
import { ScreenTypes } from '../../types'

import Button from '../ui/Button'
import ModalWrapper from '../ui/ModalWrapper';


const Heading = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

const DetailText = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
`;

const SelectButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 60%;
  gap: 30px;
  margin-top: 40px;
  margin-bottom: 45px;
  @media ${device.md} {
    row-gap: 20px;
    column-gap: 20px;
    max-width: 100%;
  }
`;

interface SelectButtonProps {
  active: boolean;
  disabled?: boolean;
  completed: boolean;
}

const SelectButton = styled.div<SelectButtonProps>`
  background-color: ${({ completed, theme }) =>
    completed ? theme.colors.disabledCard : theme.colors.selectTopicBg};
  border: ${({ active, theme }) =>
    active ? `2px solid ${theme.colors.themeColor}` : `1px solid ${theme.colors.disabledButton}`};
  transition: background-color 0.4s ease-out;
  border-radius: 10px;
  padding: 14px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const SelectButtonText = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  @media ${device.md} {
    font-size: 16px;
    font-weight: 500;
  }
`;

const QuizTopicsScreen: React.FC = () => {
  const { setCurrentScreen, currentStep } = useQuiz();
  const [showPopup, setShowPopup] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleButtonClick = (targetStep: number) => {
    if (currentStep < targetStep) {
      setShowPopup(true);
    } else if(targetStep == 1){
      setCurrentScreen(ScreenTypes.VideoScreen)
    } else if(targetStep == 2){
      setCurrentScreen(ScreenTypes.QuizDetailsScreen)
    } else if(targetStep == 3){
      setCurrentScreen(ScreenTypes.EssayScreen)
    }
  };

  useEffect(() => {
    if(currentStep == 1){
      const studentName = localStorage.getItem('fullname')// fetch student's name from login response or context
      const professorName = "Prof. Dr. Suyatno, M.Pd";
      const yourName = "Kevin Dewanda Moudizka";
      const message = `Selamat datang ${studentName}, dari ${professorName} dan ${yourName}.`;
      setWelcomeMessage(message);
      setShowWelcome(true)
    }

    if(currentStep == 4){
      setShowSuccess(true)
    }
  }, [currentStep])


  return (
    <PageCenter>
      <CenterCardContainer>
        <Heading>Penulisan Definisi</Heading>
        <DetailText>Pilih Step berikut untuk mengerjakan</DetailText>
        <SelectButtonContainer>
          <SelectButton
            active={currentStep === 2}
            completed={currentStep >= 2}
            onClick={() => handleButtonClick(1)}
          >
            <SelectButtonText>Tonton</SelectButtonText>
          </SelectButton>
          <SelectButton
            active={currentStep === 3}
            completed={currentStep >= 3}
            onClick={() => handleButtonClick(2)}
          >
            <SelectButtonText>Kerjakan</SelectButtonText>
          </SelectButton>
          <SelectButton
            active={currentStep === 4}
            completed={currentStep >= 4}
            onClick={() => handleButtonClick(3)}
          >
            <SelectButtonText>Tuliskan</SelectButtonText>
          </SelectButton>
        </SelectButtonContainer>
        {showPopup && (
          <ModalWrapper
            title="Aksi Tidak Diizinkan"
            subtitle="Maaf, silahkan klik menu tonton dan lihat materi dalam video sampai selesai."
            icon={<AppLogo />}
            buttonTitle="Tutup"
            onClick={() => setShowPopup(false)}
          />
        )}
        {showWelcome && (
          <ModalWrapper
            title="Welcome"
            subtitle={welcomeMessage}
            icon={<AppLogo />}
            buttonTitle="Tutup"
            onClick={() => setShowWelcome(false)}
          />
        )}
        {showSuccess && (
          <ModalWrapper
            title="Berhasil"
            subtitle="Essay Berhasil Di input"
            icon={<AppLogo />}
            buttonTitle="Tutup"
            onClick={() => setShowSuccess(false)}
          />
        )}
      </CenterCardContainer>
    </PageCenter>
  );
};

export default QuizTopicsScreen;
