import {
    FETCH_QUESTIONS,
    FETCH_QUESTIONS_SERVER_ERROR,
    FETCH_QUESTIONS_SUCCESS,
    NEXT_QUESTION,
    NO_SERVER_ERROR,
    QUIZ_END,
    QUIZ_START,
    SERVER_ERROR,
    SET_ANSWER,
} from "../action-types";
import {Question} from "../../types";
import Answer from "../../types/answer";

interface DefaultAction {
    type: undefined | null;
}

interface FetchQuestionsAction {
    type: typeof FETCH_QUESTIONS;
}

interface FetchQuestionsServerErrorAction {
    type: typeof FETCH_QUESTIONS_SERVER_ERROR;
}

interface FetchQuestionsSuccessAction {
    type: typeof FETCH_QUESTIONS_SUCCESS;
    payload: Question[];
}

interface NextQuestionAction {
    type: typeof NEXT_QUESTION;
}

interface QuizStartAction {
    type: typeof QUIZ_START;
}

interface QuizEndAction {
    type: typeof QUIZ_END;
}

interface SetAnswerAction {
    type: typeof SET_ANSWER;
    payload: {
        index: number,
        answer: Answer
    }
}

interface ServerError {
    type: typeof SERVER_ERROR;
}

interface NoServerError {
    type: typeof NO_SERVER_ERROR;
}

export type ActionTypes =
    | DefaultAction
    | FetchQuestionsAction
    | FetchQuestionsServerErrorAction
    | FetchQuestionsSuccessAction
    | NextQuestionAction
    | QuizStartAction
    | QuizEndAction
    | SetAnswerAction
    | ServerError
    | NoServerError;
