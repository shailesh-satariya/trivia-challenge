import {FETCH_QUESTIONS, FETCH_QUESTIONS_SERVER_ERROR, FETCH_QUESTIONS_SUCCESS} from "../action-types";
import {ActionTypes} from "../types";
import {FetchState} from "../../types";

const initialState: FetchState = FetchState.NO_STATE;

/**
 * @function FetchStateReducer
 *
 * @param {FetchState} state - State before reducer.
 * @param {ActionTypes} action - Action sent to reducer.
 *
 * @returns {FetchState} - New state.
 */
const FetchStateReducer = (state: FetchState = initialState, action: ActionTypes): FetchState => {
    switch (action.type) {
        case FETCH_QUESTIONS:
            return FetchState.FETCH_QUESTIONS;
        case FETCH_QUESTIONS_SERVER_ERROR:
            return FetchState.FETCH_QUESTIONS_SERVER_ERROR;
        case FETCH_QUESTIONS_SUCCESS:
            return FetchState.FETCH_QUESTIONS_SUCCESS;
        default:
            return state;
    }
};

export default FetchStateReducer;
