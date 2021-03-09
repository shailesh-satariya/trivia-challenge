import {QUIZ_END, QUIZ_START} from "../action-types";
import {ActionTypes} from "../types";
import {QuizState} from "../../types";

const initialState: QuizState = QuizState.NOT_STARTED;

/**
 * @function QuizStateReducer
 *
 * @param {QuizState} state - State before reducer.
 * @param {ActionTypes} action - Action sent to reducer.
 *
 * @returns {QuizState} - New state.
 */
const QuizStateReducer = (state: QuizState = initialState, action: ActionTypes): QuizState => {
    switch (action.type) {
        case QUIZ_START:
            return QuizState.IN_PROGRESS;
        case QUIZ_END:
            return QuizState.DONE;
        default:
            return state;
    }
};

export default QuizStateReducer;
