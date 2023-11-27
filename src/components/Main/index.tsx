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
import AdminScreen from '../AdminScreen'
import AdminEssayScreen from '../AdminEssayScreen'
import AdminSurveyScreen from '../AdminSurveyScreen'
import SurveyScreen from '../SurveyScreen'

function Main() {
  const { currentScreen, setCurrentScreen, setCurrentStep } = useQuiz()

  useEffect(() => {
    setTimeout(() => {
      if(localStorage.getItem('token')){
        if(localStorage.getItem('dosen')){
          setCurrentScreen(ScreenTypes.AdminScreen)
        }else{
          setCurrentScreen(ScreenTypes.QuizTopicsScreen)
        }
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
    [ScreenTypes.AdminScreen]: <AdminScreen />,
    [ScreenTypes.AdminEssayScreen]: <AdminEssayScreen />,
    [ScreenTypes.AdminSurveyScreen]: <AdminSurveyScreen />,
    [ScreenTypes.SurveyScreen]: <SurveyScreen />,
  }

  const ComponentToRender = screenComponents[currentScreen] || <SplashScreen />

  return <>{ComponentToRender}</>
}

export default Main
