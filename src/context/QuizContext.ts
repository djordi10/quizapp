import { createContext, useContext } from 'react'
import { QuizContextTypes, ScreenTypes } from '../types'

export const initialState: QuizContextTypes = {
  currentScreen: ScreenTypes.SplashScreen,
  setCurrentScreen: () => {},
  quizTopic: 'Menulis Dongeng',
  selectQuizTopic: () => {},
  questions: [],
  setQuestions: () => {},
  result: [],
  setResult: () => {},
  timer: 15,
  setTimer: () => {},
  endTime: 0,
  setEndTime: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
  quizDetails: {
    totalQuestions: 0,
    totalScore: 0,
    totalTime: 0,
    selectedQuizTopic: 'Menulis Dongeng',
  },
}

export const QuizContext = createContext<QuizContextTypes>(initialState)

export function useQuiz() {
  return useContext(QuizContext)
}
