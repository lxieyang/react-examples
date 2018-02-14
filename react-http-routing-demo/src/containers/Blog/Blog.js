import React, { Component } from 'react';

import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import './Blog.css';
import asyncComponent from '../../hoc/asyncComponent';

// lazy loading NewPost Component
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state ={
        auth: true
    }

    render () {    
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}
                                to="/posts/"
                                exact>Posts</NavLink>
                            </li>
                            <li><NavLink to={{
                                pathname: '/new-post',   // -> absolute path
                                // pathname: this.props.match.url + '/new-post',
                                // hash: '#submit'
                                // search: '?quick-submit=true'
                                }}>New post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home2</h1>} /> */}
                <Switch>
                    {this.state.auth? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    <Route path="/posts"  component={Posts}/>
                    <Route render={() => <h1 style={{textAlign: 'center'}}>404 Not found</h1>} />
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
                
            </div>
        );
    }
}

export default Blog;