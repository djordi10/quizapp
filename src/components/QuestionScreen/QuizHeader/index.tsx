import { FC } from 'react';
import styled from 'styled-components';

import { Flex } from '../../../styles/Global';
import { addLeadingZero, formatTime } from '../../../utils/helpers';

import Counter from './Counter';

const ActiveQuestionNo = styled.span`
  font-size: clamp(40px, 5vw, 60px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.themeColor};
`;

const TotalQuestionNo = styled.span`
  font-size: clamp(20px, 5vw, 30px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkerGray};
`;

const QuestionType = styled.span`
  font-size: clamp(16px, 3vw, 24px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkerGray};
  margin-left: 20px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  padding: 5px 10px;
  border-radius: 5px;
`;

interface QuizHeaderProps {
  activeQuestion: number;
  totalQuestions: number;
  timer: number;
  type: string;
}

const QuizHeader: FC<QuizHeaderProps> = ({ activeQuestion, totalQuestions, timer, type }) => {
  // Map the question types to more readable formats
  const questionTypeMap = {
    MCQs: 'Pilihan Ganda',
    boolean: 'Benar/Salah',
    MAQs: 'Jawaban Ganda',
    matching: 'Pencocokan',
  };

  return (
    <Flex spaceBetween gap="6px">
      <div>
        <ActiveQuestionNo>{addLeadingZero(activeQuestion + 1)}</ActiveQuestionNo>
        <TotalQuestionNo>/{addLeadingZero(totalQuestions)}</TotalQuestionNo>
        <QuestionType>{questionTypeMap[type]}</QuestionType>
      </div>
      <Flex>
        <Counter time={`${formatTime(timer)}`} />
      </Flex>
    </Flex>
  );
};

export default QuizHeader;
