import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setNoServerError} from "./redux/actions";
import {getFetchState, hasServerError} from "./redux/selectors";
import {Loader, ToastMessage} from "./components";
import {FetchState} from "./types";
import Pages from "./pages";

/**
 * App component - renders app
 * @function App
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
export const App = (): JSX.Element => {
    const dispatch = useDispatch();
    const serverError: boolean = useSelector(hasServerError);
    const fetchState: FetchState = useSelector(getFetchState);

    return (
        <div data-test="component-app" className="w-100 h-100 d-flex flex-column">
            {fetchState === FetchState.FETCH_QUESTIONS ? <Loader data-test="element-loader"/> :
                <Pages data-test="element-pages"/>}
            {serverError ?
                <ToastMessage data-test="toast-message-element" header="Error!" body="Server error!"
                              onClose={() => dispatch(setNoServerError())}/>
                : null}
        </div>
    );
}

export default App;
