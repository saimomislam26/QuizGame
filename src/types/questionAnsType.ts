export type questionAns = {
    question: string,
    answers: string[],
    callback: (e: React.MouseEvent<HTMLButtonElement>) =>void,
    userAnswer: AnswerObject | undefined,
    questionNumber: number,
    totalQuestions: number
}

export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type AnswerObject = {
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer:string
}
