import {ActionTypes} from "../types";
import {NEXT_QUESTION, QUIZ_START} from "../action-types";

/**
 * @function QuestionIndexReducer
 *
 * @param {number} state - State before reducer.
 * @param {ActionTypes} action - Action sent to reducer.
 *
 * @returns {number} - New state.
 */
const QuestionIndexReducer = (state: number = 0, action: ActionTypes): number => {
    switch (action.type) {
        case QUIZ_START:
            return 0;
        case NEXT_QUESTION:
            return ++state;
    }
    return state;
};

export default QuestionIndexReducer;