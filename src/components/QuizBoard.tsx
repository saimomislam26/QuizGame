import { Typography, Button } from "@mui/material";
import { questionAns as Props } from "../types/questionAnsType"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const QuizBoard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalQuestions
}) => {

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ textAlign: "center", fontWeight:'bold',fontSize: '16px', marginBottom: "15px" }} >
                        Question: {questionNumber}/{totalQuestions}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ textAlign: "center", fontWeight:'bold',fontSize: '16px'  }}>
                        <p dangerouslySetInnerHTML={{ __html: question }} />
                    </Typography>
                    {
                        answers.map((answer, number) => {
                            const isCorrectAnswer = userAnswer?.correctAnswer === answer;
                            const isUserAnswer = userAnswer?.answer === answer;
                            const buttonColor = isCorrectAnswer
                                ? 'success'
                                : isUserAnswer ?
                                    'error'
                                    : 'info';
                            return (
                                <div key={number}>
                                    <ThemeProvider theme={theme}>
                                        <Button
                                            sx={{ 
                                                width: '100%',
                                                marginBottom: "10px",
                                                '&.Mui-disabled': {
                                                    color: 'white',
                                                    backgroundColor: isCorrectAnswer ? theme.palette.success.main : isUserAnswer?theme.palette.error.main: theme.palette.info.main ,
                                                  }
                                             }}
                                            variant='contained'
                                            disabled={userAnswer ? true : false}
                                            value={answer}
                                            onClick={callback}
                                            color={buttonColor}
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                                        </Button>
                                    </ThemeProvider>

                                </div>
                            )
                        })
                    }
                </CardContent>
            </Card>

        </div>
    )
}

export default QuizBoard