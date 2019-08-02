import axios from "axios";
import _ from 'lodash'
// import { GET_ALL_BOOKS } from './../reducers'
export const GET_ALL_BOOKS_REQUEST  = 'GET_ALL_BOOKS_REQUEST';
export const GET_ALL_BOOKS_SUCCESS  = 'GET_ALL_BOOKS_SUCCESS';

export function getAllBooks(books) {

    return {
        type: GET_ALL_BOOKS_SUCCESS,
        data: books
    }
}

export const loadBooks = ({page, per_page}) => {
    return dispatch => {
        dispatch({type: GET_ALL_BOOKS_REQUEST});
        return axios.get(
            `http://localhost:4000/books/?page=${page}&per_page=${per_page}`,
            {headers: {'Content-Type': 'application/json'}
            })
            .then(json => {
                console.log('json', json.data.books);
                if(json.status === 200) {
                    dispatch({type: GET_ALL_BOOKS_SUCCESS, data: json.data})
                } else {
                    dispatch({type: "ERROR", msg: `Server error`})
                }
            })
            .catch(err => dispatch(
                {type: "ERROR", msg: `Server error: ${err}`}))
    }
};