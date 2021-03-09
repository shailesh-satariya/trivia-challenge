import {mount, ReactWrapper} from "enzyme";
import React from "react";
import {DefaultState, findByTestAttr, storeFactory} from "../../test/utils";
import Error from "../error";
import {TestCase} from "../../types";
import {Store} from "redux";
import {RootState} from "../../redux/store";
import {ActionTypes} from "../../redux/types";
import questionList from "../../test/data.json";
import {Provider} from "react-redux";

const defaultStore: Store<RootState, ActionTypes> = storeFactory({...DefaultState, questions: questionList});

/**
 * Factory function to create a ReactWrapper for the Error component.
 * @function setup
 *
 * @return {ReactWrapper}
 */
const setup = (store: Store<RootState, ActionTypes> = defaultStore): ReactWrapper => {
    return mount(<Provider store={store}>
        <Error/>
    </Provider>);
};
describe("render", () => {
    const testCases: TestCase[] = [
        {
            name: "header element",
            element: "element-header"
        },
        {
            name: "main element",
            element: "element-main"
        },
        {
            name: "footer element",
            element: "element-footer"
        },
        {
            name: "footer element",
            element: "element-footer"
        },
        {
            name: "reload button",
            element: "button-reload"
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

/*
describe("button reload on click", () => {
    const {reload} = window.location;

    beforeAll(() => {
        Object.defineProperty(window.location, "reload", {
            configurable: true,
        });
        window.location.reload = jest.fn();
    });

    afterAll(() => {
        window.location.reload = reload;
    });

    test("mocks reload function", () => {
        expect(jest.isMockFunction(window.location.reload)).toBe(true);
    });

    test("window.location.reload on reload button click", () => {
        const wrapper: ReactWrapper = setup();
        const buttonReload = findByTestAttr(wrapper, "button-reload");
        buttonReload.simulate("click");
        expect(window.location.reload).toHaveBeenCalled();
    });
});
*/