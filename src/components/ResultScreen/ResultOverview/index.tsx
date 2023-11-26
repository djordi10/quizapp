import { FC , useEffect} from 'react'
import styled from 'styled-components'

import { useQuiz } from '../../../context/QuizContext'
import { device } from '../../../styles/BreakPoints'
import { HighlightedText } from '../../../styles/Global'
import { convertSeconds } from '../../../utils/helpers'
import { Result } from '../../../types'

const ResultOverviewStyle = styled.div`
  text-align: center;
  margin-bottom: 70px;
  @media ${device.md} {
    margin-bottom: 30px;
  }
  p {
    margin-top: 15px;
    font-weight: 500;
    font-size: 18px;
  }
`

interface ResultOverviewProps {
  result: Result[]
}

const ResultOverview: FC<ResultOverviewProps> = ({ result }) => {
  const { quizDetails, endTime } = useQuiz()

  const totalQuestionAttempted = result.length

  const obtainedScore = result
    .filter((item) => item.isMatch && typeof item.score === 'number')
    .reduce((accumulator, currentValue) => accumulator + (currentValue.score || 0), 0)

  // Lulus jika skor 60 atau lebih dari 60%
  const calculateStatus =
    (obtainedScore / quizDetails.totalScore) * 100 >= 60 ? 'Lulus' : 'Gagal'

    const submitScore = async () => {
      const token = localStorage.getItem('token')/* fetch JWT token from local storage */;
      const scoreData = {  score: obtainedScore };
  
      try {
        const response = await fetch('https://quizbackend-orcin.vercel.app/submit-score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(scoreData)
        });
        const data = await response.json();
        console.log('Score submitted:', data);
      } catch (error) {
        console.error('Error submitting score:', error);
      }
    };

    useEffect(() => {
      if (result.length > 0) {
        submitScore();
      }
    }, [result]);

  return (
    <ResultOverviewStyle>
      <p>
        Jumlah pertanyaan yang dijawab:{' '}
        <HighlightedText> {totalQuestionAttempted} </HighlightedText> dari{' '}
        {quizDetails.totalQuestions}
      </p>
      <p>
        Skor yang diperoleh:<HighlightedText> {obtainedScore} </HighlightedText> dari{' '}
        {quizDetails.totalScore}
      </p>
      <p>
        Waktu yang dihabiskan:<HighlightedText> {convertSeconds(endTime)} </HighlightedText>
      </p>
      <p>
        Status:<HighlightedText> {calculateStatus}</HighlightedText>
      </p>
    </ResultOverviewStyle>
  )
}

export default ResultOverview
