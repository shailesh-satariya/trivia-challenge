import {mount, ReactWrapper} from "enzyme";
import React from "react";
import {DefaultState, findByTestAttr, storeFactory} from "../../test/utils";
import Result from "../result";
import {Provider} from "react-redux";
import {Store} from "redux";
import {RootState} from "../../redux/store";
import {ActionTypes} from "../../redux/types";
import {TestCase} from "../../types";

const defaultStore: Store<RootState, ActionTypes> = storeFactory(DefaultState);

/**
 * Factory function to create a ShallowWrapper for the Result component.
 * @function setup
 *
 * @param store
 *
 * @return {ReactWrapper}
 */
const setup = (store: Store<RootState, ActionTypes> = defaultStore): ReactWrapper => {
    return mount(
        <Provider store={store}>
            <Result/>
        </Provider>);
};

describe("render", () => {
    const testCases: TestCase[] = [
        {
            name: "header element",
            element: "element-footer"
        },
        {
            name: "main element",
            element: "element-main"
        },
        {
            name: "footer element",
            element: "element-footer"
        }
    ];

    for (const testCase of testCases) {
        test(`renders ${testCase.name} without an error`, () => {
            const wrapper: ReactWrapper = setup();
            const element = findByTestAttr(wrapper, testCase.element);

            expect(element.length).toBe(1);
        });
    }
});