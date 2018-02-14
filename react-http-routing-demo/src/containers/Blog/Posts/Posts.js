import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import { Route, Link } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        console.log( this.props );
        axios.get('/posts')
            .then((response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Michael'
                    }
                })
                this.setState({posts: updatedPosts})
                console.log(response);
            })).catch((err) => {
                // console.log(err);
                // this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        console.log('post handler called');
        // this.setState({selectedPostId: id});
        // this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push( '/posts/' + id );
    }

    render() {

        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/' + post.id} key={post.id}>
                        <Post  
                            key={post.id}
                            title={post.title} 
                            author={post.author}
                            // {...this.props}
                            clicked={() => this.postSelectedHandler(post.id)}/>
                    // </Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        );
    }
}

export default Posts;