import axios from "axios";
import _ from 'lodash'

export const loadPosts = () => {

    return dispatch => {
        return axios('https://jsonplaceholder.typicode.com/posts')
            .then(json => {
                console.log(' ALL_POST')
                dispatch(
                    {type: "ALL_POSTS", data: json.data})
            })
            .catch(err => dispatch(
                {type: "ERROR", msg: "Unable to fetch data"}))
    }
}

export const addPost = (post) => {

    return dispatch => {
        return axios('https://jsonplaceholder.typicode.com/posts',
            {
                method: "POST",
                mode: 'no-cors',
                headers: {
                    "Content-type": "application/json",
                    'Accept': 'application/json',
                },
                data: post
            })
            .then(json => {
                console.log('createPost json', json)
                dispatch(
                    {type: "ADD_POST", data: json.data})
            })
            .catch(err => dispatch(
                {type: "ERROR", msg: "Unable to fetch data"}))
    }
}
export const auth = (id) => {

    return dispatch => {
        return axios(`https://jsonplaceholder.typicode.com/posts/${id}`,
            {
                method: "GET",
                mode: 'no-cors',
                headers: {
                    "Content-type": "application/json",
                    'Accept': 'application/json',
                }
            })
            .then(json => {
                console.log('getPost json', json, id === json.data.id)
                // if(data.status == 200){
                if (1 === json.data.id) {
                    console.log('Successfully Login');
                    localStorage.setItem('token', json.data.id);
                    dispatch(
                        {type: "AUTH_SUCCESS", data: json.data})
                } else {
                    dispatch(
                        {type: "AUTH_ERROR", error: "Please enter valid email or password."})
                }
            })
            .catch(err => dispatch(
                {type: "AUTH_ERROR", error: "Please enter valid email or password."}))
    }
}

export const sortByParameterAndMethod = (posts, param, method) => {
    return dispatch => {
        try {
            const sortedPosts = _.orderBy(posts, [param],[method]);
            console.log('sortedPosts action', sortedPosts)
            dispatch(
                {type: "SORT_BY_PARAMETER", posts: sortedPosts})
        } catch (e) {
            throw new Error(`Unknown parameter: ${param}. Description: ${e}`)

        }

    }
}