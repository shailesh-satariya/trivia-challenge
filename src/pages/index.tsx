import React from "react";
import {Question, QuizState} from "../types";
import {useSelector} from "react-redux";
import {getQuestions, getQuestionsIndex, getQuizState} from "../redux/selectors";
import Quiz from "./quiz";
import Result from "./result";
import Home from "./home";
import Error from "./error";

/**
 * Pages component - render appropriate page
 * @function
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const Pages = (): JSX.Element => {
    const quizState: QuizState = useSelector(getQuizState);
    const questionIndex: number = useSelector(getQuestionsIndex);
    const questions: Question[] = useSelector(getQuestions);

    switch (quizState) {
        case QuizState.IN_PROGRESS:
            const question: Question | undefined = questions[questionIndex];
            if (question) {
                return <Quiz data-test="element-quiz" question={question} index={questionIndex}
                             totalQuestions={questions.length}/>;
            } else {
                return <Error data-test="element-error"/>;
            }
        case QuizState.DONE:
            return <Result data-test="element-result"/>
        default:
            return <Home data-test="element-home"/>
    }
};

export default Pages;