import {AxiosResponse} from "axios";
import {Dispatch} from "redux";
import {Question} from "../../types";
import {
    FETCH_QUESTIONS,
    FETCH_QUESTIONS_SERVER_ERROR,
    FETCH_QUESTIONS_SUCCESS,
    NEXT_QUESTION,
    NO_SERVER_ERROR,
    QUIZ_END,
    QUIZ_START,
    SET_ANSWER
} from "../action-types";
import * as Services from "../../services";
import {RootState} from "../store";

/**
 * Returns Redux Thunk function that dispatches NO_SERVER_ERROR action
 * @function setNoServerError
 *
 * @returns {function} - Redux Thunk function.
 */
export const setNoServerError = () => (dispatch: Dispatch) => {
    dispatch({type: NO_SERVER_ERROR})
};


/**
 * Returns Redux Thunk function that dispatches NO_SERVER_ERROR action
 * @function setAnswer
 *
 * @returns {function} - Redux Thunk function.
 */
export const setAnswer = (index: number, answer: string) => (dispatch: Dispatch) => {
    dispatch({
        type: SET_ANSWER, payload: {
            index, answer
        }
    });
};


/**
 * Returns Redux Thunk function that dispatches NEXT_QUESTION | QUIZ_END action
 * @function setNextQuestion
 *
 * @returns {function} - Redux Thunk function.
 */
export const setNextQuestion = () => (dispatch: Dispatch, getState: () => RootState) => {
    const {questions, questionIndex}: RootState = getState();

    if (questionIndex === questions.length - 1) {
        dispatch({type: QUIZ_END})
    } else {
        dispatch({type: NEXT_QUESTION})
    }
};

/**
 * Returns Redux Thunk function that dispatches NEXT_QUESTION action
 * @function setNextQuestion
 *
 * @returns {function} - Redux Thunk function.
 */
export const setQuizEnd = () => (dispatch: Dispatch) => {
    dispatch({type: QUIZ_END})
};

/**
 * Dispatch axios action to fetch points
 * @param dispatch
 *
 * @return Promise
 */
export const fetchQuestionsDispatch = (dispatch: Dispatch): Promise<any> => {
    const addQuestionsFn = (questions: Question[]): void => {
        dispatch({
            type: FETCH_QUESTIONS_SUCCESS,
            payload: questions
        });

        dispatch({
            type: QUIZ_START
        });
    };

    dispatch({
        type: FETCH_QUESTIONS
    });

    return Services.fetchQuestions().then((response: AxiosResponse) => {
        addQuestionsFn(response.data.results);
    }).catch(() => {
        dispatch({type: FETCH_QUESTIONS_SERVER_ERROR});
    });
};

/**
 * Returns Redux Thunk function that dispatches ADD_POINTS action
 *     after axios promise resolves
 * @function fetchQuestions
 * @returns {function} - Redux Thunk function.
 */
export const fetchQuestions = () => {
    return fetchQuestionsDispatch;
}
