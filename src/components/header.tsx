import React, {ReactNode} from "react";

export interface HeaderProps {
    children: ReactNode;
}

/**
 * Header component - renders header content
 * @function
 *
 * @param {ReactNode} children
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const Header: ({children}: HeaderProps) => JSX.Element = ({children}: HeaderProps): JSX.Element => {
    return <header data-test="component-header" className="d-flex justify-content-center p-2">
        {children}
    </header>
};

export default Header;