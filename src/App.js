import React, { Component } from 'react';
import PostForm from './components/AddNewPost/PostForm';
import AllPost from './components/Posts/AllPost';

class App extends Component {
    render() {
        return (
            <div className="App">
                <AllPost />
            </div>
        );
    }
}
export default App;