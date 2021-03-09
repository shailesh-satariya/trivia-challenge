import {FETCH_QUESTIONS_SUCCESS} from "../../action-types";
import QuestionsReducer from "../questions-reducer";
import {Question} from "../../../types";
import questionList from "../../../test/data.json";

test("returns default initial state of `[]` when no action is passed", () => {
    const newState = QuestionsReducer([], {type: undefined});
    expect(newState).toEqual([]);
});

test("returns state of array of questions upon receiving an action of type `FETCH_QUESTIONS_SUCCESS`", () => {
    const questions: Question[] = questionList;
    const newState = QuestionsReducer([], {
        type: FETCH_QUESTIONS_SUCCESS,
        payload: [...questions],
    });
    expect(newState).toEqual(questions);
});
