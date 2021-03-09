import React from "react";
import {useDispatch} from "react-redux";
import {fetchQuestionsDispatch} from "../redux/actions";

export interface StartQuizButtonProps {
    label: string;
}

/**
 * Component StartQuizButton -  renders start quiz button
 * @function
 *
 * @param {string} label
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const StartQuizButton: ({label}: StartQuizButtonProps) => JSX.Element = ({label}: StartQuizButtonProps): JSX.Element => {
    const dispatch = useDispatch();
    return <button data-test="component-start-quiz-button" className="btn btn-primary"
                   onClick={() => dispatch(fetchQuestionsDispatch)}>{label}</button>
};

export default StartQuizButton;