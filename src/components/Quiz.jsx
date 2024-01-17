import { useState , useCallback} from "react"
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import Question from "./Question.jsx";

export default function Quiz(){

    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback (function handleSelectAnswer(selectedAnswer){
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        });

        setTimeout(()=>{
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correct');
            }else {
                setAnswerState('wrong');
            }
            setTimeout(() =>{
                setAnswerState('');
            },2000);
        },1000);

    },[activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(quizIsComplete){
        return (<div id="summary">
            <img src={quizCompleteImg} alt="quiz completed" />
            <h2>Quiz COmpleted!</h2>
        </div>);
    }

    
    return (
        <div id="quiz">
            <Question 
                key={activeQuestionIndex}
                answers={QUESTIONS[activeQuestionIndex].answers} 
                onSelectAnswer={handleSelectAnswer} 
                questionText={QUESTIONS[activeQuestionIndex].text}
                answerState={answerState}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                onSkipAnswer={handleSkipAnswer}/>
        </div>
     );
}