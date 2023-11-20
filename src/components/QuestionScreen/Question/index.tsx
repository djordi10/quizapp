import { FC } from 'react'
import styled from 'styled-components'

import { device } from '../../../styles/BreakPoints'

import CodeSnippet from '../../ui/CodeSnippet'
import Answer from '../Answer'
import QuizImage from '../../ui/QuizImage'
import Matching from '../Matching'; // Import the Matching component

const QuestionContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  max-width: 88%;
  @media ${device.sm} {
    max-width: 100%;
  }
`

const AnswersContainer = styled.div`
  max-width: 78%;
  @media ${device.sm} {
    max-width: 100%;
  }
`

const QuestionStyle = styled.h2`
  font-size: clamp(18px, 4vw, 28px);
  font-weight: 500;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.colors.primaryText};
  line-height: 1.3;
`

interface MatchingQuestionType {
  setA: string[];
  setB: string[];
  onPairsUpdated: (pairs: [string, string][]) => void; // New callback prop
  correctPairs: [string, string][];
}

interface QuestionTypes {
  question: string
  code?: string
  image?: string
  type: string
  choices: any
  selectedAnswer: string[]
  handleAnswerSelection: (e: React.ChangeEvent<HTMLInputElement>, index: any) => void;
  setA: string[];
  setB: string[];
  correctPairs: [string, string][];
  onPairsUpdated: (pairs: [string, string][]) => void;
  resetIndicator: number;
}

const Question: FC<QuestionTypes> = ({
  question,
  code,
  image,
  type,
  choices,
  selectedAnswer,
  handleAnswerSelection,
  setA, // Include matchingData in props
  setB,
  onPairsUpdated,
  resetIndicator
}) => {
  return (
    <QuestionContainer>
      <QuestionStyle>{question}</QuestionStyle>
      {code && <CodeSnippet code={code} language="javascript" />}
      {image && <QuizImage image={image} />}
      {type === 'matching' ? (
        <Matching 
          setA={setA} 
          setB={setB} 
          onPairsUpdated={onPairsUpdated} 
          resetIndicator={resetIndicator}
        />
      ) : (
        <AnswersContainer>
          {choices?.map((choice:any, index:any) => (
            <Answer
              choice={choice}
              index={index}
              key={index}
              onChange={(e) => handleAnswerSelection(e, index)}
              type={type}
              selectedAnswer={selectedAnswer}
            />
          ))}
        </AnswersContainer>
      )}
    </QuestionContainer>
  );
};

export default Question;
