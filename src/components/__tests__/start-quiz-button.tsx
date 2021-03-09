import {mount, ReactWrapper} from "enzyme";
import React from "react";
import {DefaultState, findByTestAttr, storeFactory} from "../../test/utils";
import StartQuizButton, {StartQuizButtonProps} from "../start-quiz-button";
import {Store} from "redux";
import {RootState} from "../../redux/store";
import {ActionTypes} from "../../redux/types";
import {Provider} from "react-redux";

const defaultStore: Store<RootState, ActionTypes> = storeFactory(DefaultState);

const defaultProps: StartQuizButtonProps = {
    label: "Begin"
};

/**
 * Factory function to create a ReactWrapper for the StartQuizButton component.
 *
 * @param store
 * @param props
 *
 * @return {ReactWrapper}
 */
const setup = (store: Store<RootState, ActionTypes> = defaultStore, props: StartQuizButtonProps = defaultProps): ReactWrapper => {
    return mount(
        <Provider store={store}>
            <StartQuizButton {...props}/>
        </Provider>);
};

describe("render", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    test("renders component without an error", () => {
        const componentStartQuizButton = findByTestAttr(wrapper, "component-start-quiz-button");

        expect(componentStartQuizButton.length).toBe(1);
    });

    test("renders label without an error", () => {
        const componentStartQuizButton = findByTestAttr(wrapper, "component-start-quiz-button");

        expect(componentStartQuizButton.text().includes("Begin")).toBe(true);
    });
});

