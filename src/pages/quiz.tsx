import React from "react";
import {decode} from "html-entities";
import {Footer, Header, Main} from "../components";
import {Question} from "../types";
import {useDispatch} from "react-redux";
import {setAnswer, setNextQuestion} from "../redux/actions";

export interface QuizProps {
    question: Question;
    index: number;
    totalQuestions: number;
}

/**
 * Quiz  - renders quiz page
 * @function
 *
 * @param {Question} question
 * @param {number} index
 * @param {number} totalQuestions
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
export const Quiz: ({question, index, totalQuestions}: QuizProps) => JSX.Element = ({question, index, totalQuestions}: QuizProps): JSX.Element => {
    const defaultState: { disabled: boolean, submitted: boolean, value: string } = {
        disabled: true,
        submitted: false,
        value: ''
    };
    const [state, setState] = React.useState(defaultState);

    const dispatch = useDispatch();

    const onValueChange = (val: string): void => {
        setState({...state, disabled: false, value: val});
    };

    const onSubmitBtnClick = (): void => {
        dispatch(setAnswer(index, state.value));
        setState({...state, submitted: true});
    };

    const onNextBtnClick = (): void => {
        dispatch(setNextQuestion());
        setState(defaultState);
    };

    const getLabelCssClasses = (val: string): string => {
        const classes: string[] = ["form-check-label"];


        if (state?.submitted) {
            if (question.correct_answer === val) {
                classes.push("text-success");
                if (state?.value === val) {
                    classes.push("font-weight-bold");
                }
            } else {
                classes.push("text-danger");
            }
        }

        return classes.join(" ");
    };

    return <React.Fragment>
        <Header data-test="element-header">
            <h2 className="text-center">{decode(question.category, {level: "html5"})}</h2>
        </Header>
        <Main data-test="element-main">
            <div className="d-flex flex-column justify-content-center align-items-center v-100 h-100">
                <div className="card w-100">
                    <div
                        className={"card-body" + (state?.submitted ? (state?.value === question.correct_answer ? " alert-success" : " alert-danger") : '')}>
                        <p className="text-center lead">{decode(question.question, {level: "html5"})}</p>
                        <div className="d-flex justify-content-center">
                            <div>
                                {
                                    ["True", "False"].map((val: string, i: number) => (
                                        <div className="form-check" key={`${index}-${i}`}>
                                            <input data-test={`cb-input-${i}`} className="form-check-input"
                                                   type="radio"
                                                   name="answer" id={`answer${i}`}
                                                   disabled={state?.submitted}
                                                   value={val} onClick={() => onValueChange(val)}/>
                                            <label
                                                className={getLabelCssClasses(val)}
                                                htmlFor={`answer${i}`}>
                                                {val}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-center mt-1">{index + 1} / {totalQuestions}</p>
            </div>
        </Main>
        <Footer data-test="element-footer">
            {
                state?.submitted ?
                    <button data-test="button-next" className="btn btn-primary"
                            onClick={onNextBtnClick}>NEXT
                    </button> :
                    <button data-test="button-submit" className="btn btn-primary" disabled={state?.disabled}
                            onClick={onSubmitBtnClick}>SUBMIT
                    </button>
            }
        </Footer>
    </React.Fragment>;
};

export default Quiz;