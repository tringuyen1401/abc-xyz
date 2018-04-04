import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
import Feed from './feed';
import Users from './users';
import PostForm from './post-form';

export default function microblog_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Microblog state={store.getState()} />
    </Provider>,
    document.getElementById('root'),
  );
}

let Microblog = connect((state) => state)((props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Route path="/" exact={true} render={() =>
          <div>
            <PostForm />
            <Feed posts={props.posts} />
          </div>
        } />
        <Route path="/users" exact={true} render={() =>
          <Users users={props.users} />
        } />
        <Route path="/users/:user_id" render={({match}) =>
          <Feed posts={_.filter(props.posts, (pp) =>
            match.params.user_id == pp.user.id )
          } />
        } />
      </div>
    </Router>
  );
});

