import React from "react";
import {Footer, Header, Main} from "../components";

/**
 * Error component -  render error page
 * @function
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const Error: React.FC = (): JSX.Element => {
    const onBtnClick = (): void => {
        window.location.reload();
    };

    return <React.Fragment>
        <Header data-test="element-header">
            <h2>Error!</h2>
        </Header>
        <Main data-test="element-main">
            <div
                className="d-flex flex-column justify-content-center align-items-center text-center h-100 w-100">
                <div>
                    <p className="lead">Something went wrong..</p>
                    <br/>
                    <p className="lead">Please reload the page.</p>
                </div>
            </div>
        </Main>
        <Footer data-test="element-footer">
            <button data-test="button-reload" className="btn btn-primary"
                    onClick={onBtnClick}>RELOAD
            </button>
        </Footer>
    </React.Fragment>;
};

export default Error;