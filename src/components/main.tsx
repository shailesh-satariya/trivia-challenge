import React, {ReactNode} from "react";

export interface MainProps {
    children: ReactNode;
}

/**
 * Main component -  renders main content
 * @function
 *
 * @param {ReactNode} children
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const Main: ({children}: MainProps) => JSX.Element = ({children}: MainProps): JSX.Element => {
    return <main data-test="component-main"
                 className="container flex-1 p-4 overflow-auto w-100 mw-100">
        {children}
    </main>
};

export default Main;