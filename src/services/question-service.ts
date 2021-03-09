import axios, {AxiosResponse} from "axios";

const apiUrl: string = process.env.REACT_APP_API_URL as string;

/**
 * fetchQuestions function
 *
 * @return {Promise<AxiosResponse>}
 */
export const fetchQuestions = (): Promise<AxiosResponse> => {
    return axios.get(apiUrl);
};
