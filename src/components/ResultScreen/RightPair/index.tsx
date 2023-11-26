import React, { FC } from 'react';
import styled from 'styled-components';

type Pair = [string, string];

interface MatchingAnswersProps {
  correctPairs: Pair[]; // Assuming Pair is defined as [string, string]
}

const MatchingAnswerContainer = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-top: 15px;
`;

const MatchingAnswers: FC<MatchingAnswersProps> = ({ correctPairs }) => {
  return (
    <MatchingAnswerContainer>
      {`Jawaban Benar:`}
      {correctPairs.map((pair, index) => (
        <div key={index}>
          {`${pair[0]} - ${pair[1]}`}
        </div>
      ))}
    </MatchingAnswerContainer>
  );
};

export default MatchingAnswers;
