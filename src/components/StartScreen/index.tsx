import React from 'react';
import styled from 'styled-components';
import { useQuiz } from '../../context/QuizContext';
import { ScreenTypes } from '../../types';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f5f5;
  padding: 20px;
`;

const BackgroundImage = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: url('/image/bg.png') no-repeat center center;
  background-size: cover;
  margin-bottom: 20px;
`;

const BackgroundQuoteContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  text-align: justify;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  width: 60%;
`;

const BackgroundQuoteText = styled.p`
  font-style: italic;
  font-size: 1.5em;
  margin: 0;
`;

const BackgroundQuoteAuthor = styled.p`
  font-weight: bold;
  font-size: 1.2em;
  margin: 0;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const QuoteContainer = styled.div`
  width: 80%;
  margin: 20px 0;
  text-align: center;
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 10px;
`;

const QuoteText = styled.p`
  font-style: italic;
  color: #555;
`;

const QuoteAuthor = styled.p`
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

const ImageQuoteRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  width: 80%;
`;

const Image = styled.img`
  width: 40%;
  margin: 10px;
  border-radius: 10px;
  object-fit: cover;
`;

const QuoteBox = styled.div`
  width: 40%;
  margin: 10px;
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
`;

const LoginButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

// Component
const QuotePage = () => {
  const { setCurrentScreen } = useQuiz();

  const goToLogin = () => {
    setCurrentScreen(ScreenTypes.LoginScreen);
  };

  return (
    <PageContainer>
      <BackgroundImage>
        <BackgroundQuoteContainer>
          <BackgroundQuoteText>“Seorang penulis cerita sejati berawal dari tidak pernah menulis cerita sama sekali. Maka tulislah cerita mulai dari sekarang juga”</BackgroundQuoteText>
          <BackgroundQuoteAuthor>Kevin Dewanda Moudizka</BackgroundQuoteAuthor>
          <br /><br />
          <BackgroundQuoteText>“Dongeng tidak hanya cerita khayalan belaka. Sifat maupun perilaku yang menyerupai
          manusia pada tokoh cerita dan pesan moral yang terkandung bisa bisa bermakna bagi kehidupan
          nyata.”</BackgroundQuoteText>
          <BackgroundQuoteAuthor>Kevin Dewanda Moudizka</BackgroundQuoteAuthor>
        </BackgroundQuoteContainer>
      </BackgroundImage>
      <ContentContainer>
        <ImageQuoteRow>
          <Image src="/image/img1.jpg" alt="Fabel" />
          <QuoteBox>
            <QuoteText>Fabel adalah salah satu jenis dongeng yang ceritanya terdapat tokoh hewan yang berperilaku dan berwatak selayaknya manusia, seperti dapat berbicara, berpikir, hingga berpakaian.</QuoteText>
            <QuoteText>Contoh judul dongeng fabel misalnya Kancil dan Buaya, Ular dan tikus, Bani (Babi Pemberani) dan Serigala Rakus.</QuoteText>
          </QuoteBox>
        </ImageQuoteRow>
        <ImageQuoteRow>
          <QuoteBox>
            <QuoteText>Sage adalah dongeng cerita sejarah yang mengandung unsur perjuangan tokoh yang memiliki sifat dan perilaku pahlawan (seperti keberanian, keperkasaan, kerelaan, berkorban, dan kekesatriaan).</QuoteText>
            <QuoteText>Contoh judul dongeng sage misalnya Si Buta dari Gua Hantu.</QuoteText>
          </QuoteBox>
          <Image src="/image/img2.png" alt="Sage" />
        </ImageQuoteRow>
        <ImageQuoteRow>
          <Image src="/image/img3.png" alt="Mite" />
          <QuoteBox>
            <QuoteText>Mite adalah dongeng cerita rakyat yang menganggap benar-benar terjadi dan dianggap suci atau sakral, dan ada juga yang menganggap tidak pernah terjadi dengan tokohnya berupa dewa atau manusia setengah dewa.</QuoteText>
            <QuoteText>Contoh judul dongeng mite misalnya Ratu Pantai Selatan Nyi Roro Kidul.</QuoteText>
          </QuoteBox>
        </ImageQuoteRow>
        <ImageQuoteRow>
          <QuoteBox>
            <QuoteText>Legenda merupakan dongeng cerita rakyat pada zaman dahulu yang ada hubungannya dengan peristiwa sejarah asal usul terjadinya suatu tempat atau peristiwa tertentu.</QuoteText>
            <QuoteText>Contoh judul dongeng misalnya Legenda Gunung Semeru.</QuoteText>
          </QuoteBox>
          <Image src="/image/img4.png" alt="Legenda" />
        </ImageQuoteRow>
        <LoginButton onClick={goToLogin}>Go to Login</LoginButton>
      </ContentContainer>
    </PageContainer>
  );
};

export default QuotePage;
