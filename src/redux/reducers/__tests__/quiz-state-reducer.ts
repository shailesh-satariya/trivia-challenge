import {QUIZ_END, QUIZ_START} from "../../action-types";
import QuizStateReducer from "../quiz-state-reducer";
import {QuizState} from "../../../types";

test("returns default initial state of `false` when no action is passed", () => {
    const newState = QuizStateReducer(QuizState.NOT_STARTED, {type: undefined});
    expect(newState).toBe(QuizState.NOT_STARTED);
});

test("returns state of `QuizState.IN_PROGRESS` upon receiving an action of type `QUIZ_START`", () => {
    const newState = QuizStateReducer(QuizState.NOT_STARTED, {type: QUIZ_START});
    expect(newState).toBe(QuizState.IN_PROGRESS);
});

test("returns state of `QuizState.DONE` upon receiving an action of type `QUIZ_END`", () => {
    const newState = QuizStateReducer(QuizState.NOT_STARTED, {type: QUIZ_END});
    expect(newState).toBe(QuizState.DONE);
});