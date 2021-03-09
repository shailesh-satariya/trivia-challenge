import React from "react";
import {Footer, Header, Main, StartQuizButton} from "../components";

/**
 * Home component - renders home page
 * @function
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const Home = (): JSX.Element => {
    return <React.Fragment>
        <Header data-test="element-header">
            <h2 className="text-center">Welcome to the Trivia Challenge!</h2>
        </Header>
        <Main data-test="element-main">
            <div
                className="d-flex flex-column justify-content-center align-items-center text-center h-100 w-100">
                <div>
                    <p className="lead">You will be presented with 10 True or False questions.</p>
                    <br/>
                    <p className="lead">Can you score 100%?</p>
                </div>
            </div>
        </Main>
        <Footer data-test="element-footer">
            <StartQuizButton label="BEGIN"/>
        </Footer>
    </React.Fragment>;
};

export default Home;