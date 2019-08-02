import axios from "axios";
import {GET_ALL_BOOKS_REQUEST} from "./book";

export const AUTH_REQUEST  = 'AUTH_REQUEST';
export const AUTH_REQUEST_SUCCESS  = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR  = 'AUTH_REQUEST_ERROR';
export const LOGOUT  = 'LOGOUT';

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch({type: LOGOUT})
    }
};

export const auth = (credentials) => {
    return dispatch => {
        dispatch({type: AUTH_REQUEST});

        return axios.post('http://localhost:4000/auth/', credentials, {
            headers: {'Content-Type': 'application/json'}
        })
            .then(json => {
                if (json.status === 200) {
                    if (json.data.token) {
                        localStorage.setItem('token', json.data.token);
                        dispatch({type: "AUTH_REQUEST_SUCCESS"})
                    }
                } else if (json.status === 401) {
                    dispatch(
                        {type: "AUTH_REQUEST_ERROR", error: "Please enter valid email or password."})
                }
            })
            .catch(error => dispatch(
                {type: "AUTH_REQUEST_ERROR", error: "Please enter valid email or password."}))
    }
}