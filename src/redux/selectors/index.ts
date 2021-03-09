import {RootState} from "../store";

export const getFetchState = (state: RootState) => state.fetchState;
export const getQuizState = (state: RootState) => state.quizState;
export const getQuestions = (state: RootState) => state.questions;
export const getQuestionsIndex = (state: RootState) => state.questionIndex;
export const getAnswers = (state: RootState) => state.answers;
export const hasServerError = (state: RootState) => state.serverError;
