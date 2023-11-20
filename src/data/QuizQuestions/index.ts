import { generalKnowledge } from './generalKnowledge'
import { javascript } from './javascript'
import { python } from './python'
import { penulisan } from './react'

// Question Types
// 1. MCQs | Multiple Choice | single
// 2. boolean | true/false | single
// 3. MAQs | Multiple Answers | multiple

type Choice = string;

// For matching questions, a pair is represented as a tuple of two strings
type Pair = [string, string];

type CorrectAnswers = string[] | Pair[]; // Correct answers can be a list of strings or a list of pairs

export type Question = {
  question: string;
  choices?: Choice[]; // Optional, as matching questions won't use this
  type: 'MCQs' | 'MAQs' | 'boolean' | 'matching';
  correctAnswers?: CorrectAnswers;
  score: number;
  code?: string;
  image?: string;
  setA?: string[]; // Specific to matching questions
  setB?: string[]; // Specific to matching questions
  correctPairs?: Pair[]; // Specific to matching questions
};

export type Topic = {
  topic: string;
  level: string;
  totalQuestions: number;
  totalScore: number;
  totalTime: number;
  questions: Question[];
};

export const quiz: Record<string, Topic> = {
  React: penulisan,
  'Penulisan Definisi': penulisan
  // ... any other topics ...
};

