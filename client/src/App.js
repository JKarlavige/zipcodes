// Components
import React, { Component } from 'react';
import PrivateRoute from './components/general/PrivateRoute';
import AdminRoute from './components/general/AdminRoute';
import Navigation from './components/navigation/Navigation'
import Landing from './components/landing/Landing'
import Register from './components/users/Register'
import Login from './components/users/Login'
import Training from './components/training/Training'
import BeginQuiz from './components/training/BeginQuiz'
import Quiz from './components/training/Quiz'
import Admin from './components/admin/Admin'

// Redux
import { Provider } from 'react-redux'
import store from './store' 

// React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Actions
import { setCurrentUser, logoutUser } from './actions/userActions'

// Helpers
import jwt_decode from 'jwt-decode'
import setUserToken from './helpers/setUserToken'

// CSS
import 'normalize.css'
import './styles/skeleton.css'
import './styles/App.css'

// Check for token
const token = localStorage.jwtToken
if(token) {
  // Set auth token header
  setUserToken(token)
  // Decode token and get user information and expiration
  const decoded = jwt_decode(token)
  // Set current user
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser())
    // // Clear current profile
    // store.dispatch(clearProfile())
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <main>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/training' component={Training} />
              <PrivateRoute exact path='/training/:position' component={BeginQuiz} />
              <PrivateRoute exact path='/training/:position/quiz/:quiz_id' component={Quiz} />
              <AdminRoute exact path='/admin' component={Admin} />
            </Switch>
          </main>
        </Router>
      </Provider>
    )
  }
}

export default App
