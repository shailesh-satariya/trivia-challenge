import {mount, ReactWrapper} from "enzyme";
import React from "react";
import Pages from "../index";
import {Store} from "redux";
import {RootState} from "../../redux/store";
import {ActionTypes} from "../../redux/types";
import {Provider} from "react-redux";

import questionList from "../../test/data.json";
import {DefaultState, findByTestAttr, storeFactory} from "../../test/utils";
import {QuizState} from "../../types";

const defaultStore: Store<RootState, ActionTypes> = storeFactory({...DefaultState, questions: questionList});

/**
 * Factory function to create a ReactWrapper for the Pages component.
 * @function setup
 *
 * @return {ReactWrapper}
 */
const setup = (store: Store<RootState, ActionTypes> = defaultStore): ReactWrapper => {
    return mount(<Provider store={store}>
        <Pages/>
    </Provider>);
};

describe("element home", () => {
    test("renders without an error", () => {
        const store: Store<RootState, ActionTypes> = storeFactory({...DefaultState, quizState: QuizState.NOT_STARTED});
        const wrapper: ReactWrapper = setup(store);

        const elmHome = findByTestAttr(wrapper, "element-home");
        const elmResult = findByTestAttr(wrapper, "element-result");
        const elmQuiz = findByTestAttr(wrapper, "element-quiz");
        const elmError = findByTestAttr(wrapper, "element-error");

        expect(elmHome.length).toBe(1);
        expect(elmResult.length).toBe(0);
        expect(elmQuiz.length).toBe(0);
        expect(elmError.length).toBe(0);
    });
});

describe("element error", () => {
    test("renders without an error", () => {
        const store: Store<RootState, ActionTypes> = storeFactory({...DefaultState, quizState: QuizState.NOT_STARTED});
        const wrapper: ReactWrapper = setup(store);

        const elmHome = findByTestAttr(wrapper, "element-home");
        const elmResult = findByTestAttr(wrapper, "element-result");
        const elmQuiz = findByTestAttr(wrapper, "element-quiz");
        const elmError = findByTestAttr(wrapper, "element-error");

        expect(elmHome.length).toBe(1);
        expect(elmResult.length).toBe(0);
        expect(elmQuiz.length).toBe(0);
        expect(elmError.length).toBe(0);
    });
});

describe("element result", () => {
    test("renders without an error", () => {
        const store: Store<RootState, ActionTypes> = storeFactory({...DefaultState, quizState: QuizState.DONE});
        const wrapper: ReactWrapper = setup(store);

        const elmHome = findByTestAttr(wrapper, "element-home");
        const elmResult = findByTestAttr(wrapper, "element-result");
        const elmQuiz = findByTestAttr(wrapper, "element-quiz");
        const elmError = findByTestAttr(wrapper, "element-error");

        expect(elmHome.length).toBe(0);
        expect(elmResult.length).toBe(1);
        expect(elmQuiz.length).toBe(0);
        expect(elmError.length).toBe(0);
    });
});

describe("element quiz", () => {
    test("renders without an error", () => {
        const store: Store<RootState, ActionTypes> = storeFactory({
            ...DefaultState,
            questions: questionList,
            quizState: QuizState.IN_PROGRESS
        });
        const wrapper: ReactWrapper = setup(store);

        const elmHome = findByTestAttr(wrapper, "element-home");
        const elmResult = findByTestAttr(wrapper, "element-result");
        const elmQuiz = findByTestAttr(wrapper, "element-quiz");
        const elmError = findByTestAttr(wrapper, "element-error");

        expect(elmHome.length).toBe(0);
        expect(elmResult.length).toBe(0);
        expect(elmQuiz.length).toBe(1);
        expect(elmError.length).toBe(0);
    });
});

describe("element error", () => {
    test("renders without an error", () => {
        const store: Store<RootState, ActionTypes> = storeFactory({
            ...DefaultState,
            quizState: QuizState.IN_PROGRESS
        });
        const wrapper: ReactWrapper = setup(store);

        const elmHome = findByTestAttr(wrapper, "element-home");
        const elmResult = findByTestAttr(wrapper, "element-result");
        const elmQuiz = findByTestAttr(wrapper, "element-quiz");
        const elmError = findByTestAttr(wrapper, "element-error");

        expect(elmHome.length).toBe(0);
        expect(elmResult.length).toBe(0);
        expect(elmQuiz.length).toBe(0);
        expect(elmError.length).toBe(1);
    });
});