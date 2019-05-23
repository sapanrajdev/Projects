import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import { routes } from './routes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { usersActions } from './actions/users.action';

class App extends React.Component {

  componentWillMount() {
    this.props.getUsers();
  }
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/users">User List</Link></li>
            <li><Link to="/registration">Registration</Link></li>
          </ul>

          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </div>
      </Router>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUsers: usersActions.getUsers
    },
    dispatch,
  );
}

export default connect(null, mapDispatchToProps)(App); 