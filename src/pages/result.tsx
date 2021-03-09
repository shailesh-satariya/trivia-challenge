import React from "react";
import {useSelector} from "react-redux";
import {decode} from "html-entities";
import {Footer, Header, Main, StartQuizButton} from "../components";
import {Question} from "../types";
import {getAnswers, getQuestions} from "../redux/selectors";
import Answer from "../types/answer";

/**
 * Result component -  renders result page
 * @function
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const Result = (): JSX.Element => {
    const questions: Question[] = useSelector(getQuestions);
    const answers: Answer[] = useSelector(getAnswers);
    const score: number = answers.reduce((prevScore: number, answer: Answer, index: number) => {
        const question: Question = questions[index];
        const nextScore: number = prevScore + (question?.correct_answer === answer ? 1 : 0);
        return nextScore;
    }, 0);

    const ResultListItem = ({question, index}: { question: Question, index: number }): JSX.Element => {
        const answer: Answer = answers[index];
        const isCorrect: boolean = question?.correct_answer === answer;

        return <li key={index}
                   className={"list-group-item " + (isCorrect ? "list-group-item-success" : "list-group-item-danger")}>
            <div className="d-flex">
                <div className="mr-2" style={{fontSize: "1.2em"}}><b>{isCorrect ? "+" : "-"}</b></div>
                <div className="flex-1">{decode(question.question, {level: "html5"})}</div>
            </div>
        </li>
    }

    return <React.Fragment>
        <Header data-test="element-header">
            <div className="text-center">
                <h2>You scored</h2>
                <h2>{score} / {questions.length}</h2>
            </div>
        </Header>
        <Main data-test="element-main">
            <ul className="list-group">
                {
                    questions.map((q: Question, index: number) => (
                        <ResultListItem key={index} question={q} index={index}/>
                    ))
                }
            </ul>
        </Main>
        <Footer data-test="element-footer">
            <StartQuizButton label="PLAY AGAIN?"/>
        </Footer>
    </React.Fragment>
};

export default Result;