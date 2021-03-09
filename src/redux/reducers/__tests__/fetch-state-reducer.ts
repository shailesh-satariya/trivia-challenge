import {FETCH_QUESTIONS, FETCH_QUESTIONS_SERVER_ERROR, FETCH_QUESTIONS_SUCCESS} from "../../action-types";
import FetchStateReducer from "../fetch-state-reducer";
import {FetchState} from "../../../types";
import questionList from "../../../test/data.json";

test("returns default initial state of `false` when no action is passed", () => {
    const newState = FetchStateReducer(FetchState.NO_STATE, {type: undefined});
    expect(newState).toBe(FetchState.NO_STATE);
});

test("returns state of `FetchState.FETCH_QUESTIONS` upon receiving an action of type `FETCH_QUESTIONS`", () => {
    const newState = FetchStateReducer(FetchState.NO_STATE, {type: FETCH_QUESTIONS});
    expect(newState).toBe(FetchState.FETCH_QUESTIONS);
});

test("returns state of `FetchState.FETCH_QUESTIONS_SERVER_ERROR` upon receiving an action of type `FETCH_QUESTIONS_SERVER_ERROR`", () => {
    const newState = FetchStateReducer(FetchState.NO_STATE, {type: FETCH_QUESTIONS_SERVER_ERROR});
    expect(newState).toBe(FetchState.FETCH_QUESTIONS_SERVER_ERROR);
});

test("returns state of `FetchState.FETCH_QUESTIONS_SUCCESS` upon receiving an action of type `FETCH_QUESTIONS_SUCCESS`", () => {
    const newState = FetchStateReducer(FetchState.NO_STATE, {
        type: FETCH_QUESTIONS_SUCCESS, payload: questionList
    });
    expect(newState).toBe(FetchState.FETCH_QUESTIONS_SUCCESS);
});