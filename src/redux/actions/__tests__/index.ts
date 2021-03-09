import moxios from "moxios";
import {Store} from "redux";
import {fetchQuestions} from "..";

import {ActionTypes} from "../../types";
import {RootState} from "../../store";
import {storeFactory} from "../../../test/utils";
import {Question} from "../../../types";
import questionList from "../../../test/data.json";

describe("fetchQuestions action creator", () => {
    let store: Store<RootState, ActionTypes>;

    beforeEach(() => {
        moxios.install();
        store = storeFactory();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test("adds response questions to state", () => {
        const questions: Question[] = questionList;

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {results: [...questions]},
            });
        });

        return store.dispatch<any>(fetchQuestions()).then(() => {
            const newState = store.getState();
            expect(newState.questions).toEqual(questions);
        });
    });

    describe("updates serverError state to `true`", () => {
        // NOTE: there"s currently no way to simulate server nonresponse with moxios
        test("when server returns 4xx status", () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 404,
                });
            });

            // @ts-ignore
            return (
                store
                    .dispatch<any>(fetchQuestions())
                    // @ts-ignore
                    .then(() => {
                        const newState = store.getState();
                        expect(newState.serverError).toBe(true);
                    })
            );
        });

        test("when server returns 5xx status", () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 500,
                });
            });

            return store.dispatch<any>(fetchQuestions()).then(() => {
                const newState = store.getState();
                expect(newState.serverError).toBe(true);
            });
        });
    });
});
