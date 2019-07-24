import axios from "axios";

export const loadPosts = () => {

    return (dispatch) => {
        return axios('https://jsonplaceholder.typicode.com/todos',
            {
                method: "GET",
                mode: 'no-cors',
                headers: {
                    "Content-type": "application/json",
                    'Accept': 'application/json',
                }
            })
            .then(json => {
                dispatch(
                    {type: "ALL_POSTS", data: json.data})
            })
            .catch(err => dispatch(
                {type: "ERROR", msg: "Unable to fetch data"}))
    }
}