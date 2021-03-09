import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../test/utils";
import Header from "../header";

/**
 * Factory function to create a ShallowWrapper for the Header component.
 * @function setup
 *
 * @return {ShallowWrapper}
 */
const setup = (): ShallowWrapper => {
    return shallow(<Header>
        <div data-test="element-content">Content</div>
    </Header>);
}

describe("render", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    test("renders component without an error", () => {
        const componentHeader = findByTestAttr(wrapper, "component-header");

        expect(componentHeader.length).toBe(1);
    });

    test("renders passed content", () => {
        const elmContent = findByTestAttr(wrapper, "element-content");

        expect(elmContent.length).toBe(1);
    });
});
