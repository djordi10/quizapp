import { FC } from 'react'
import styled, { css } from 'styled-components'

import { AppLogo, Refresh } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import { device } from '../../styles/BreakPoints'
import { Flex, LogoContainer, ResizableBox } from '../../styles/Global'
import { refreshPage } from '../../utils/helpers'
import { ScreenTypes } from '../../types';

import Button from '../ui/Button'
import CodeSnippet from '../ui/CodeSnippet'
import QuizImage from '../ui/QuizImage'
import ResultOverview from './ResultOverview'
import RightAnswer from './RightAnswer'
import MatchingAnswers from './RightPair'

const ResultScreenContainer = styled.div`
  max-width: 900px;
  margin: 60px auto;
  overflow-y: auto;
  height: calc(100vh - 120px);

  @media ${device.md} {
    width: 90%;
    margin: 30px auto;
  }
`;

const FlexEndContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InnerContainer = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  margin: 0 auto;
  margin-bottom: 40px;
  padding: 40px 90px 90px 90px;
  // Remove overflow-y property here
  @media ${device.md} {
    padding: 15px;
  }
`;

const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  @media ${device.md} {
    flex-direction: column;
  }
`

const QuestionNumber = styled.h6`
  font-size: clamp(16px, 5vw, 24px);
  font-weight: 500;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.primaryText};
`

const QuestionStyle = styled.span`
  font-size: clamp(16px, 5vw, 24px);
  font-weight: 500;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: 20px;
  @media ${device.md} {
    margin-bottom: 10px;
  }
`

interface AnswerProps {
  correct?: boolean
  wrong?: boolean
}

const Answer = styled.li<AnswerProps>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 90%;
  @media ${device.md} {
    width: 100%;
  }
  background: ${({ theme }) => theme.colors.answerBg};
  border-radius: 16px;
  font-size: clamp(16px, 5vw, 18px);
  font-weight: 600;
  padding: 15px;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-top: clamp(13px, calc(10px + 6 * ((100vw - 600px) / 1320)), 16px);

  // if user answer matches to correct answer make answer background success color otherwise danger color
  ${({ correct }) =>
    correct &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.success};
      background-color: ${({ theme }) => theme.colors.successLight};
    `}

  ${({ wrong }) =>
    wrong &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.danger};
      background-color: ${({ theme }) => theme.colors.dangerLight};
    `}

  span {
    margin-right: 14px;
  }

  @media ${device.md} {
    font-weight: 400;
  }
`

const Score = styled.span<{ right: boolean }>`
  font-weight: 500;
  font-size: 16px;
  color: ${({ right, theme }) =>
    right ? `${theme.colors.success}` : `${theme.colors.danger}`};
  margin-top: 4px;
  @media ${device.md} {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-right: 10px;
  }
`

const ResultScreen: FC = () => {
  const { result, setCurrentStep, setCurrentScreen} = useQuiz()

  const onClickRetry = () => {
    setCurrentStep(3)
    localStorage.setItem('step','3')
    //setCurrentScreen(ScreenTypes.QuizTopicsScreen)
    window.location.reload()
  }

  return (
    <ResultScreenContainer>
      <LogoContainer>
      </LogoContainer>
      <InnerContainer>
        <ResultOverview result={result} />
        {result.map(
          (
            {
              question,
              choices,
              code,
              image,
              correctAnswers,
              selectedAnswer,
              score,
              isMatch,
              type,
              correctPairs
            },
            index: number
          ) => {
            return (
              <QuestionContainer key={question}>
                <ResizableBox width="90%">
                  <Flex gap="4px">
                    <QuestionNumber>{`${index + 1}. `}</QuestionNumber>
                    <QuestionStyle>{question}</QuestionStyle>
                  </Flex>
                  <div>
                    {code && <CodeSnippet code={code} language="javascript" />}
                    {image && <QuizImage image={image} />}
                    <ul>
                      {choices?.map((ans: string, index: number) => {
                        const label = String.fromCharCode(65 + index);

                        // Check if the current answer is selected
                        const isSelected = selectedAnswer.includes(ans);

                        let isCorrect;
                        // Check if the current answer is correct
                        if(type != "matching"){
                          const isCorrect = (correctAnswers as string[]).includes(ans);
                        }

                        const correct = isSelected && isCorrect;
                        const wrong = isSelected && !isCorrect;

                        return (
                          <Answer key={index} correct={correct} wrong={wrong}>
                            <span>{label}.</span>
                            {ans}
                          </Answer>
                        );
                      })}
                    </ul>
                    {/* only show if the answer is wrong */}
                    {type === "matching" && correctPairs ? (
                      <MatchingAnswers correctPairs={correctPairs} />
                    ) : (
                      // Render RightAnswer for non-matching question types
                      !isMatch && (
                        <RightAnswer correctAnswers={correctAnswers as string[]} choices={choices} />
                      )
                    )}
                  </div>
                </ResizableBox>
                <Score right={isMatch}>{`Score ${isMatch ? score : 0}`}</Score>
              </QuestionContainer>
            )
          }
        )}
      </InnerContainer>
      <FlexEndContainer>
        <Button
          text="Lanjutkan"
          onClick={onClickRetry}
          icon={<Refresh />} // Adjust this based on how you implement icons
          iconPosition="left"
          bold
        />
      </FlexEndContainer>
    </ResultScreenContainer>
  )
}

export default ResultScreen
