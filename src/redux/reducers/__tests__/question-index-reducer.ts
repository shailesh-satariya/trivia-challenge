import {NEXT_QUESTION, QUIZ_START} from "../../action-types";
import QuestionIndexReducer from "../question-index-reducer";

test("returns default initial state of `0` when no action is passed", () => {
    const newState = QuestionIndexReducer(0, {type: undefined});
    expect(newState).toBe(0);
});

test("returns state of `0` upon receiving an action of type `QUIZ_START`", () => {
    const newState = QuestionIndexReducer(0, {type: QUIZ_START});
    expect(newState).toBe(0);
});

test("returns state of `1` upon receiving an action of type `NEXT_QUESTION`", () => {
    const newState = QuestionIndexReducer(0, {type: NEXT_QUESTION});
    expect(newState).toBe(1);
});