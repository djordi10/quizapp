import styled from 'styled-components'

import { AppLogo, StartIcon } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import {
  CenterCardContainer,
  HighlightedText,
  LogoContainer,
  PageCenter,
} from '../../styles/Global'
import { ScreenTypes } from '../../types'
import { convertSeconds } from '../../utils/helpers'

import Button from '../ui/Button'

const AppTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.themeColor};
`

const DetailTextContainer = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  margin-bottom: 40px;
  text-align: center;
  max-width: 500px;
`

const DetailText = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 1.3;
`

const QuizDetailsScreen = () => {
  const { setCurrentScreen, quizDetails } = useQuiz()

  const { selectedQuizTopic, totalQuestions, totalScore, totalTime } = quizDetails

  const goToQuestionScreen = () => {
    setCurrentScreen(ScreenTypes.QuestionScreen)
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <AppTitle>KUIS</AppTitle>
        <DetailTextContainer>
          <DetailText>
            Topik Kuis Terpilih: <HighlightedText>{selectedQuizTopic}</HighlightedText>
          </DetailText>
          <DetailText>
            Jumlah pertanyaan: <HighlightedText>{totalQuestions}</HighlightedText>
          </DetailText>
          <DetailText>
            Skor total: <HighlightedText>{totalScore}</HighlightedText>
          </DetailText>
          <DetailText>
            Total waktu: <HighlightedText>{convertSeconds(totalTime)}</HighlightedText>
          </DetailText>
          <DetailText>
            Untuk menghemat waktu, Anda dapat melewati pertanyaan. Pertanyaan yang dilewati akan muncul di akhir kuis.
          </DetailText>
        </DetailTextContainer>
        <Button
          text="Mulai"
          icon={<StartIcon />}
          iconPosition="left"
          onClick={goToQuestionScreen}
          bold
        />
      </CenterCardContainer>
    </PageCenter>
  )
}

export default QuizDetailsScreen
