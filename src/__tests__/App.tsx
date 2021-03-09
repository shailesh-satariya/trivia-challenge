import {mount, ReactWrapper} from "enzyme";
import React from "react";
import * as redux from "react-redux";
import {Provider} from "react-redux";

import App from "../App";
import {DefaultState, findByTestAttr, storeFactory} from "../test/utils";
import {Store} from "redux";
import {RootState} from "../redux/store";
import {ActionTypes} from "../redux/types";
import {FetchState} from "../types";

const defaultStore: Store<RootState, ActionTypes> = storeFactory();

/**
 * Factory function to create a ShallowWrapper for the DisconnectedApp component.
 * @function setup
 *
 * @param store
 *
 * @returns {ReactWrapper}
 */
const setup = (store: Store<RootState, ActionTypes> = defaultStore): ReactWrapper => {
    return mount(
        <Provider store={store}>
            <App/>
        </Provider>);
}

describe("render", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    test("renders component without an error", () => {
        const componentApp = findByTestAttr(wrapper, "component-app");

        expect(componentApp.length).toBe(1);
    });
});

describe("renders loader element", () => {
    test("does not render loader", () => {
        const wrapper: ReactWrapper = setup();
        const elmLoader = findByTestAttr(wrapper, "element-loader");

        expect(elmLoader.length).toBe(0);
    });

    test("renders loader", () => {
        const store: Store<RootState, ActionTypes> = storeFactory({...DefaultState, ...{fetchState: FetchState.FETCH_QUESTIONS}});
        const wrapper: ReactWrapper = setup(store);
        const elmLoader = findByTestAttr(wrapper, "element-loader");
        expect(elmLoader.length).toBe(1);
    });
});

describe("renders pages element", () => {
    test("renders pages", () => {
        const wrapper: ReactWrapper = setup();
        const elmLoader = findByTestAttr(wrapper, "element-pages");

        expect(elmLoader.length).toBe(1);
    });

    test("does not renders pages", () => {
        const store: Store<RootState, ActionTypes> = storeFactory({...DefaultState, ...{fetchState: FetchState.FETCH_QUESTIONS}});
        const wrapper: ReactWrapper = setup(store);
        const elmLoader = findByTestAttr(wrapper, "element-pages");
        expect(elmLoader.length).toBe(0);
    });
});

describe("renders toast message element", () => {
    test("does not render toast message", () => {
        const wrapper: ReactWrapper = setup();
        const toastMessage = findByTestAttr(wrapper, "toast-message-element");

        expect(toastMessage.length).toBe(0);
    });

    test("renders toast message", () => {
        const store: Store<RootState, ActionTypes> = storeFactory({...DefaultState, ...{serverError: true}});
        const wrapper: ReactWrapper = setup(store);
        const toastMessage = findByTestAttr(wrapper, "toast-message-element");
        expect(toastMessage.length).toBe(1);
    });
});

test("toast message onClose function", () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const store: Store<RootState, ActionTypes> = storeFactory({...DefaultState, ...{serverError: true}});
    const wrapper: ReactWrapper = setup(store);
    const toastMessage = findByTestAttr(wrapper, "toast-message-element");
    (toastMessage.prop("onClose") as Function)();
    expect(mockDispatchFn).toHaveBeenCalled();

    useDispatchSpy.mockClear();
});
