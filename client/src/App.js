import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import jwtDecode from 'jwt-decode'
import axios from 'axios';

// components
import Login from "./pages/Login";
import Registration from './pages/Registration';
import Home from './pages/Home';
import NavigationBar from "./components/NavigationBar";
import Dashboard from './pages/Dashboard';
import Course from './components/Course';
import MyGrades from './components/MyGrades';
import PrivateRoute from './components/PrivateRoute';

// redux
import { Provider } from "react-redux";
import store from "./redux/store";
import history from './redux/history';
import { getUserData } from './redux/actions';

// On page reload, check if token exists. 
// If so, get current logged in user info.
const token = localStorage.getItem('authToken');
if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(getUserData());
}

function App() {
      return (
            <div className="App">
                  <Provider store={store}>
                        <BrowserRouter>
                              <Router history={history}>
                                    <NavigationBar />
                                    <Switch>
                                          <Route exact path="/" component={Home} />
                                          <Route path="/login" component={Login} />
                                          <Route path="/register" component={Registration} />

                                          <PrivateRoute exact path="/dashboard" component={Dashboard} />


                                          {/* <Route path="/dashboard" component={Dashboard} /> */}
                                          <Route path="/courses/:courseId" component={Course} />
                                          <Route path="/grades/:courseId" component={MyGrades} />
                                    </Switch>
                              </Router>
                        </BrowserRouter>
                  </Provider>
            </div>
      );
}

export default App;
