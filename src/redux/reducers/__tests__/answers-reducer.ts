import {FETCH_QUESTIONS_SUCCESS, SET_ANSWER} from "../../action-types";
import AnswersReducer from "../answers-reducer";
import questionList from "../../../test/data.json";
import Answer from "../../../types/answer";

test("returns default initial state of `[]` when no action is passed", () => {
    const newState = AnswersReducer([], {type: undefined});
    expect(newState).toEqual([]);
});

test("returns state of array of answers upon receiving an action of type `FETCH_QUESTIONS_SUCCESS`", () => {
    const newState = AnswersReducer([], {
        type: FETCH_QUESTIONS_SUCCESS,
        payload: [...questionList],
    });
    expect(newState).toEqual(questionList.map(() => null));
});

test("returns state of array of answers upon receiving an action of type `SET_ANSWER`", () => {
    const answers: Answer[] = questionList.map(() => null);
    const newState = AnswersReducer(answers, {
        type: SET_ANSWER,
        payload: {
            index: 0,
            answer: "True"
        },
    });

    answers[0] = "True";
    expect(newState).toEqual(answers);
});
