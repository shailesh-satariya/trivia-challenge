import {Question} from "../../types";
import {ActionTypes} from "../types";
import {FETCH_QUESTIONS_SUCCESS} from "../action-types";

const initialState: Question[] = [];

/**
 * @function QuestionsReducer
 *
 * @param {Question[]} state - State before reducer.
 * @param {ActionTypes} action - Action sent to reducer.
 *
 * @returns {Question[]} - New state.
 */
const QuestionsReducer = (state: Question[] = initialState, action: ActionTypes): Question[] => {
    switch (action.type) {
        case FETCH_QUESTIONS_SUCCESS:
            return action.payload;
        default:
            return state
    }
};

export default QuestionsReducer;