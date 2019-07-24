const postReducer = (state = [], action) => {
    switch (action.type) {
        case 'ALL_POSTS':
            console.log('postReducer ALL_POSTS')
            // loadPosts()
            return action.data;
        case 'ADD_POST':
            return state.concat([action.data]);
        case 'ERROR':
            return state.concat([action.data]);
        case 'DELETE_POST':
            return state.filter((post) => post.id !== action.id);
        case 'EDIT_POST':
            // return state.map((post) => post.id === action.id ? {...post, editing: !post.editing} : post)
            return state.map((post) => post.id === action.id ? {...post, editing: true} : post)
        case 'UPDATE':
            return state.map((post) => {
                if (post.id === action.id) {

                    return {
                        ...post,
                        title: action.data.newTitle,
                        editing: false
                    }
                } else return post;
            })
        default:
            return state;
    }
}
export default postReducer;