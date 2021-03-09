import {Store} from "redux";
import {storeFactory} from "../test/utils";
import {ActionTypes} from "../redux/types";
import {RootState} from "../redux/store";
import questionList from "../test/data.json";
import {FETCH_QUESTIONS_SUCCESS, NEXT_QUESTION, QUIZ_END, QUIZ_START, SET_ANSWER} from "../redux/action-types";
import {FetchState, QuizState} from "../types";
import Answer from "../types/answer";

const answers: Answer[] = questionList.map(() => null);

describe("actions dispatcher", () => {
    const store: Store<RootState, ActionTypes> = storeFactory();
    test("fetchQuestions: FETCH_QUESTIONS_SUCCESS", () => {
        store.dispatch<any>(
            {
                type: FETCH_QUESTIONS_SUCCESS,
                payload: questionList
            }
        );
        const expectedState: RootState = {
            questionIndex: 0,
            questions: questionList,
            answers: answers,
            quizState: QuizState.NOT_STARTED,
            fetchState: FetchState.FETCH_QUESTIONS_SUCCESS,
            serverError: false
        };

        expect(store.getState()).toEqual(expectedState);
    });

    test("start quiz", () => {
        store.dispatch<any>(
            {
                type: QUIZ_START
            }
        );
        const expectedState: RootState = {
            questionIndex: 0,
            questions: questionList,
            answers: answers,
            quizState: QuizState.IN_PROGRESS,
            fetchState: FetchState.FETCH_QUESTIONS_SUCCESS,
            serverError: false
        };

        expect(store.getState()).toEqual(expectedState);
    });

    describe("set answer and next question dispatcher", () => {
        const validAnswers: Answer[] = ["True", "False"];
        for (const [index, question] of questionList.entries()) {
            test(`setAnswer: SET_ANSWER ${index}`, () => {
                const answer: Answer = validAnswers[Math.floor((Math.random() * 2))];
                store.dispatch<any>(
                    {
                        type: SET_ANSWER,
                        payload: {
                            index, answer
                        }
                    }
                );
                answers[index] = answer;

                const expectedState: RootState = {
                    questionIndex: index,
                    questions: questionList,
                    answers: answers,
                    quizState: QuizState.IN_PROGRESS,
                    fetchState: FetchState.FETCH_QUESTIONS_SUCCESS,
                    serverError: false
                };

                expect(store.getState()).toEqual(expectedState);
            });

            test(`setNextQuestion: SET_ANSWER ${index}`, () => {
                store.dispatch<any>(
                    {
                        type: NEXT_QUESTION,
                    }
                );

                const expectedState: RootState = {
                    questionIndex: index + 1,
                    questions: questionList,
                    answers: answers,
                    quizState: QuizState.IN_PROGRESS,
                    fetchState: FetchState.FETCH_QUESTIONS_SUCCESS,
                    serverError: false
                };

                expect(store.getState()).toEqual(expectedState);

            });
        }
    });

    test("end quiz", () => {
        store.dispatch<any>(
            {
                type: QUIZ_END
            }
        );
        const expectedState: RootState = {
            questionIndex: questionList.length,
            questions: questionList,
            answers: answers,
            quizState: QuizState.DONE,
            fetchState: FetchState.FETCH_QUESTIONS_SUCCESS,
            serverError: false
        };

        expect(store.getState()).toEqual(expectedState);
    });
});