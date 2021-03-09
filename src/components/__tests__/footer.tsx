import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../test/utils";
import Footer from "../footer";

/**
 * Factory function to create a ShallowWrapper for the Footer component.
 * @function setup
 *
 * @return {ShallowWrapper}
 */
const setup = (): ShallowWrapper => {
    return shallow(<Footer>
        <div data-test="element-content">Content</div>
    </Footer>);
}

describe("render", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    test("renders component without an error", () => {
        const componentFooter = findByTestAttr(wrapper, "component-footer");

        expect(componentFooter.length).toBe(1);
    });

    test("renders passed content", () => {
        const elmContent = findByTestAttr(wrapper, "element-content");

        expect(elmContent.length).toBe(1);
    });
});