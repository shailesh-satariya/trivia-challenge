import React, {ReactNode} from "react";

export interface FooterProps {
    children: ReactNode;
}

/**
 * Footer component - renders footer content
 * @function
 *
 * @param {ReactNode} children
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const Footer: ({children}: FooterProps) => JSX.Element = ({children}: FooterProps): JSX.Element => {
    return <footer data-test="component-footer" className="d-flex justify-content-center p-2">
        {children}
    </footer>
};

export default Footer;