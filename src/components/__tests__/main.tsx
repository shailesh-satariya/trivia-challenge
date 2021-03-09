import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../test/utils";
import Main from "../main";

/**
 * Factory function to create a ShallowWrapper for the Main component.
 * @function setup
 *
 * @return {ShallowWrapper}
 */
const setup = (): ShallowWrapper => {
    return shallow(<Main>
        <div data-test="element-content">Content</div>
    </Main>);
}

describe("render", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    test("renders component without an error", () => {
        const componentMain = findByTestAttr(wrapper, "component-main");

        expect(componentMain.length).toBe(1);
    });

    test("renders passed content", () => {
        const elmContent = findByTestAttr(wrapper, "element-content");

        expect(elmContent.length).toBe(1);
    });
});
