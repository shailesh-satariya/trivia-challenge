import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../test/utils";
import Home from "../home";
import {TestCase} from "../../types";

/**
 * Factory function to create a ShallowWrapper for the Home component.
 * @function setup
 *
 * @return {ShallowWrapper}
 */
const setup = (): ShallowWrapper => {
    return shallow(<Home/>);
};

describe("render", () => {
    const testCases: TestCase[] = [
        {
            name: 'header element',
            element: 'element-header'
        },
        {
            name: 'main element',
            element: 'element-main'
        },
        {
            name: 'footer element',
            element: 'element-footer'
        }
    ];

    for (const testCase of testCases) {
        test(`renders ${testCase.name} without an error`, () => {
            const wrapper: ShallowWrapper = setup();
            const element = findByTestAttr(wrapper, testCase.element);

            expect(element.length).toBe(1);
        });
    }
});