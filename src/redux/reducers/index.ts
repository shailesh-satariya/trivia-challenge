import {combineReducers} from "redux";
import AnswersReducer from "./answers-reducer";
import FetchStateReducer from "./fetch-state-reducer";
import QuestionIndexReducer from "./question-index-reducer";
import QuestionsReducer from "./questions-reducer";
import QuizStateReducer from "./quiz-state-reducer";
import ServerErrorReducer from "./server-error-reducer";

export default combineReducers({
    answers: AnswersReducer,
    fetchState: FetchStateReducer,
    questionIndex: QuestionIndexReducer,
    questions: QuestionsReducer,
    quizState: QuizStateReducer,
    serverError: ServerErrorReducer,
});
