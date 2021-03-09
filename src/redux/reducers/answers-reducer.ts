import {ActionTypes} from "../types";
import {FETCH_QUESTIONS_SUCCESS, SET_ANSWER} from "../action-types";
import Answer from "../../types/answer";

const initialState: Answer[] = [];

/**
 * @function AnswersReducer
 *
 * @param {Answer[]} state - State before reducer.
 * @param {ActionTypes} action - Action sent to reducer.
 *
 * @returns {Answer[]} - New state.
 */
const AnswersReducer = (state: Answer[] = initialState, action: ActionTypes): Answer[] => {
    switch (action.type) {
        case FETCH_QUESTIONS_SUCCESS:
            return Array.from({length: action.payload.length}).map(() => null);
        case SET_ANSWER:
            const {index, answer} = action.payload;
            const newAnswers = [...state];
            newAnswers[index] = answer;
            return newAnswers;
        default:
            return state
    }
};

export default AnswersReducer;