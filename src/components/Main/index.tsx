import { useEffect } from 'react'

import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'

import QuestionScreen from '../QuestionScreen'
import QuizDetailsScreen from '../QuizDetailsScreen'
import QuizTopicsScreen from '../QuizTopicsScreen'
import VideoScreen from '../QuizVideoScreen'
import ResultScreen from '../ResultScreen'
import SplashScreen from '../SplashScreen'
import EssayScreen from '../QuizEssayScreen'
import LoginScreen from '../LoginScreen'

function Main() {
  const { currentScreen, setCurrentScreen, setCurrentStep } = useQuiz()

  useEffect(() => {
    setTimeout(() => {
      if(localStorage.getItem('token')){
        setCurrentScreen(ScreenTypes.QuizTopicsScreen)
        setCurrentStep(1)
      }else{
        setCurrentScreen(ScreenTypes.LoginScreen)
      }
    }, 1000)
  }, [setCurrentScreen])

  const screenComponents = {
    [ScreenTypes.SplashScreen]: <SplashScreen />,
    [ScreenTypes.QuizTopicsScreen]: <QuizTopicsScreen />,
    [ScreenTypes.QuizDetailsScreen]: <QuizDetailsScreen />,
    [ScreenTypes.QuestionScreen]: <QuestionScreen />,
    [ScreenTypes.ResultScreen]: <ResultScreen />,
    [ScreenTypes.VideoScreen]: <VideoScreen />,
    [ScreenTypes.EssayScreen]: <EssayScreen />,
    [ScreenTypes.LoginScreen]: <LoginScreen />,
  }

  const ComponentToRender = screenComponents[currentScreen] || <SplashScreen />

  return <>{ComponentToRender}</>
}

export default Main
