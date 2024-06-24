import { Difficulty, useGetQuestion } from '../hooks/getQuestionHook'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import QuizBoard from '../components/QuizBoard';
import { useState } from 'react';
import { AnswerObject } from '../types/questionAnsType';
import { Button } from '@mui/material';

const TOTAL_QUESTION = 10

const QuizPage = () => {
    const [quizStarted, setQuizStarted] = useState<boolean>(false)
    const [number, setNumber] = useState<number>(0)
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
    const [score, setScore] = useState<number>(0)

    const startQuiz = async () => {
        setQuizStarted(true)
        refetch()
        setNumber(0)
        setScore(0)
        setUserAnswers([])
    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        const answer = e.currentTarget.value
        const correct = data[number].correct_answer === answer

        if (correct) setScore((prev) => prev + 1);

        const answerObject = {
            question: data[number].question,
            answer,
            correct,
            correctAnswer: data[number].correct_answer
        }
        setUserAnswers(prev => [...prev, answerObject])
    }

    const nextQuestion = () => {
        const nextQuestion = number + 1
        if (nextQuestion === TOTAL_QUESTION) {
            setQuizStarted(false)
        } else {
            setNumber(nextQuestion)
        }
    }

    const {
        data,
        isLoading,
        error,
        refetch
    } = useGetQuestion(TOTAL_QUESTION, Difficulty.EASY)

    return isLoading ?
        <LoadingBox /> :
        error ?
            <MessageBox variant='danger'>{getError(error)}</MessageBox> :
            (
                <div className='main-div'>
                    <h1 className='quiz-name'>Quiz Game</h1>
                    {
                        !quizStarted || userAnswers.length === TOTAL_QUESTION ?
                            <Button variant='contained' className='start' onClick={startQuiz}>Start</Button> : null
                    }

                    {quizStarted ? <p className="score">Score: {score}</p> : null}

                    {quizStarted &&
                        <QuizBoard
                            questionNumber={number + 1}
                            totalQuestions={TOTAL_QUESTION}
                            question={data[number]?.question}
                            answers={data[number]?.answers}
                            userAnswer={userAnswers ? userAnswers[number] : undefined}
                            callback={checkAnswer}
                        />}

                    {
                        quizStarted && userAnswers.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
                            <Button variant='contained' sx={{marginTop:"15px"}} onClick={nextQuestion}>Next Question</Button>
                        ) : null
                    }
                </div>
            )
}

export default QuizPage