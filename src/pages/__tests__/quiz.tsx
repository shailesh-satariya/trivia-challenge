import {mount, ReactWrapper} from "enzyme";
import React from "react";
import * as redux from "react-redux";
import {Provider} from "react-redux";
import {Store} from "redux";
import {DefaultState, findByTestAttr, storeFactory, whenStable} from "../../test/utils";
import Quiz, {QuizProps} from "../quiz";
import {RootState} from "../../redux/store";
import {ActionTypes} from "../../redux/types";
import {TestCase} from "../../types";
import questionList from "../../test/data.json";

const defaultStore: Store<RootState, ActionTypes> = storeFactory({...DefaultState, questions: questionList});

const defaultProps: QuizProps = {
    question: questionList[0],
    index: 0,
    totalQuestions: questionList.length
}
/**
 * Factory function to create a ReactWrapper for the Quiz component.
 * @function setup
 *
 * @param store
 * @param props
 *
 * @return {ReactWrapper}
 */
const setup = (store: Store<RootState, ActionTypes> = defaultStore, props: QuizProps = defaultProps): ReactWrapper => {
    return mount(<Provider store={store}>
        <Quiz {...props}/>
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
            name: 'footer element',
            element: 'element-footer'
        },
        {
            name: 'true checkbox',
            element: 'cb-input-0'
        },
        {
            name: 'false checkbox',
            element: 'cb-input-1'
        },
        {
            name: 'submit button',
            element: 'button-submit'
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

describe("state controlled input fields", () => {
    let wrapper: ReactWrapper;
    let originalUseState = React.useState;
    const mockSetState: jest.Mock<number> = jest.fn();

    beforeEach(() => {
        mockSetState.mockClear();
        React.useState = jest.fn(() => [null, mockSetState]) as any;
        wrapper = setup();
    });

    afterEach(() => {
        React.useState = originalUseState;
    });

    test("state value updates when input checkbox value true changes", () => {
        const cbTrue = findByTestAttr(wrapper, "cb-input-0");
        cbTrue.simulate('click');
        expect(mockSetState).toHaveBeenCalledWith({disabled: false, value: "True"});
    });

    test("state value updates when input checkbox value false changes", () => {
        const cbFalse = findByTestAttr(wrapper, "cb-input-1");
        cbFalse.simulate('click');
        expect(mockSetState).toHaveBeenCalledWith({disabled: false, value: "False"});
    });
});

describe("submit button enable disable state", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    test("submit button is disabled initially`", () => {
        const buttonSubmit = findByTestAttr(wrapper, "button-submit");

        expect(buttonSubmit.prop("disabled")).toBe(true);
    });

    test("submit button is enabled when check-box is clicked`", async () => {
        const cbTrue = findByTestAttr(wrapper, "cb-input-0");
        cbTrue.simulate('click');
        await whenStable();

        const buttonSubmit = findByTestAttr(wrapper, "button-submit");
        expect(buttonSubmit.prop("disabled")).toBe(false);
    });
});


describe("submit button click event", () => {
    let wrapper: ReactWrapper;
    const store: Store<RootState, ActionTypes> = defaultStore;

    beforeEach(() => {
        wrapper = setup(store);
    });

    test("submit button click`", () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn();
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        let cbTrue0 = findByTestAttr(wrapper, "cb-input-0");
        let cbTrue1 = findByTestAttr(wrapper, "cb-input-1");
        expect(cbTrue0.prop("disabled")).toBe(false);
        expect(cbTrue1.prop("disabled")).toBe(false);
        cbTrue0.simulate('click');

        const buttonSubmit = findByTestAttr(wrapper, "button-submit");
        buttonSubmit.simulate('click');

        expect(mockDispatchFn).toHaveBeenCalledTimes(1);

        cbTrue0 = findByTestAttr(wrapper, "cb-input-0");
        cbTrue1 = findByTestAttr(wrapper, "cb-input-1");

        expect(cbTrue0.prop("disabled")).toBe(true);
        expect(cbTrue1.prop("disabled")).toBe(true);

    });
});

describe("next button", () => {
    let wrapper: ReactWrapper;
    const store: Store<RootState, ActionTypes> = defaultStore;

    beforeEach(() => {
        wrapper = setup(store);
    });

    test("does not render next button`", () => {
        const buttonNext = findByTestAttr(wrapper, "button-next");

        expect(buttonNext.length).toBe(0);
    });

    test("renders next button & click event", () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn();
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        const cbTrue = findByTestAttr(wrapper, "cb-input-0");
        cbTrue.simulate('click');

        const buttonSubmit = findByTestAttr(wrapper, "button-submit");
        buttonSubmit.simulate('click');

        const buttonNext = findByTestAttr(wrapper, "button-next");

        expect(buttonNext.length).toBe(1);

        buttonNext.simulate('click');
        expect(mockDispatchFn).toHaveBeenCalledTimes(2);
        useDispatchSpy.mockRestore();
    });
});