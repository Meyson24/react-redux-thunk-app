import axios from "axios";
import _ from 'lodash'
import {getAllBooks} from "../actions";

export const loadBooks = ({page, per_page}) => {
    return dispatch => {
        return axios.get(
            `http://localhost:4000/books/?page=${page}&per_page=${per_page}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(json => {
                // console.log('json', json.data.books);
                if(json.status === 200) {
                    dispatch(getAllBooks(json.data))
                } else {
                    dispatch({type: "ERROR", msg: `Server error`})
                }
            })
            .catch(err => dispatch(
                {type: "ERROR", msg: `Server error: ${err}`}))
    }
};

export const loadBookById = (id) => {
    return dispatch => {
        return axios.get(
            `http://localhost:4000/books/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(json => {
                console.log('json', json.data);
                if(json.status === 200) {
                    dispatch({type: "GET_BOOK_BY_ID", data: json.data})
                } else {
                    dispatch({type: "ERROR", msg: `Server error`})
                }
            })
            .catch(err => dispatch(
                {type: "ERROR", msg: `Server error: ${err}`}))
    }
};

export const addBook = (book) => {
    return dispatch => {
        return axios.post('http://localhost:4000/books/new', book,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(json => {
                if (json.status === 201) {
                    dispatch(
                        {type: "ADD_POST", data: json.data})
                } else {
                    dispatch(
                        {type: "ERROR", msg: "Server Error"})
                }
            })
            .catch(err => {
                dispatch(
                    {type: "ERROR", errorResponse: err.message})
            })
    }
}

export const auth = (credentials) => {
    return dispatch => {
        return axios.post('http://localhost:4000/auth/', credentials, {
            headers: {'Content-Type': 'application/json'}
        })
            .then(json => {
                if (json.status === 200) {
                    if (json.data.token) {
                        localStorage.setItem('token', json.data.token);
                        dispatch({type: "AUTH_SUCCESS", data: json.data})
                    }
                } else if (json.status === 401) {
                    dispatch(
                        {type: "AUTH_ERROR", error: "Please enter valid email or password."})
                }
            })
            .catch(error => dispatch(
                {type: "AUTH_ERROR", error: "Please enter valid email or password."}))
    }
}

export const sortByParameterAndMethod = (posts, param, method) => {
    return dispatch => {
        try {
            const sortedPosts = _.orderBy(posts, [param], [method]);
            dispatch(
                {type: "SORT_BY_PARAMETER", posts: sortedPosts})
        } catch (e) {
            throw new Error(`Unknown parameter: ${param}. Description: ${e}`)

        }

    }
}