import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const MatchingContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div<{ selected?: boolean, paired?: boolean }>`
  padding: 10px;
  margin: 5px;
  border: 1px solid ${({ paired }) => (paired ? '#a0a0a0' : '#ddd')};
  cursor: pointer;
  background-color: ${({ selected, paired }) => 
    selected ? '#f0f0f0' : (paired ? '#f5f5f5' : 'transparent')};
  &:hover {
    background-color: #f0f0f0;
  }
`;

const PairContainer = styled.div`
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

const PairItem = styled.div`
  padding: 5px;
  margin: 3px 0;
  background-color: #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
`;

// Props interface
interface MatchingProps {
  setA: string[];
  setB: string[];
  onPairsUpdated: (pairs: [string, string][]) => void;
  resetIndicator: number;
}

// Component
const Matching: React.FC<MatchingProps> = ({ setA, setB, onPairsUpdated, resetIndicator }) => {
  const [selectedA, setSelectedA] = useState<string | null>(null);
  const [selectedB, setSelectedB] = useState<string | null>(null);
  const [pairs, setPairs] = useState<[string, string][]>([]);

  const handleSelectA = (item: string) => {
    setSelectedA(item === selectedA ? null : item); // Toggle selection
  };

  const handleSelectB = (item: string) => {
    setSelectedB(item === selectedB ? null : item); // Toggle selection
  };

  const handleUnpair = (pairIndex: number) => {
    const updatedPairs = pairs.filter((_, index) => index !== pairIndex);
    setPairs(updatedPairs);
    onPairsUpdated(updatedPairs);
  };


  useEffect(() => {
    // Reset pairs and selections when resetIndicator changes
    setPairs([]);
    setSelectedA(null);
    setSelectedB(null);
  }, [resetIndicator]); // Dependency on resetIndicator


  useEffect(() => {
    if (selectedA && selectedB) {
      const newPair: [string, string] = [selectedA, selectedB];
      const updatedPairs = [...pairs, newPair];
      setPairs(updatedPairs);
      onPairsUpdated(updatedPairs); // Update pairs in parent component
      setSelectedA(null);
      setSelectedB(null);
    }
  }, [selectedA, selectedB, pairs, onPairsUpdated]);

  return (
    <MatchingContainer>
      <ListContainer>
        {setA.map((item) => {
            const isPaired = pairs.some(pair => pair.includes(item));
            return (
            <ListItem
                key={item}
                onClick={() => handleSelectA(item)}
                selected={item === selectedA}
                paired={isPaired}
            >
                {item}
            </ListItem>
            );
        })}
      </ListContainer>
      <ListContainer>
        {setB.map((item) => {
            const isPaired = pairs.some(pair => pair.includes(item));
            return (
            <ListItem
                key={item}
                onClick={() => handleSelectB(item)}
                selected={item === selectedB}
                paired={isPaired}
            >
                {item}
            </ListItem>
            );
        })}
      </ListContainer>
      <PairContainer>
      <h4>Pasangan Terpilih:</h4>
        {pairs.map(([itemA, itemB], index) => (
          <PairItem key={index} onClick={() => handleUnpair(index)}>
            {`${itemA} - ${itemB}`}
            {/* Optionally, add an icon or indicator for unpairing */}
          </PairItem>
        ))}
      </PairContainer>
    </MatchingContainer>
  );
};

export default Matching;
