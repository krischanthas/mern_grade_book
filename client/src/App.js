import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// components
import Login from "./pages/Login";
import Registration from './pages/Registration';
import Home from './pages/Home';
import Navbar from "./components/Navbar";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";
import history from './redux/history';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
                        <Router history={history}>
                              <Navbar/>
                              <Switch>
                                    <Route exact path="/">
                                          <Home/>
                                    </Route>
                                    <Route path="/login">
                                          <Login/>
                                    </Route>
                                    <Route path="/register">
                                          <Registration/>
                                    </Route>
                              </Switch>
                        </Router>
                  </Provider>
    </div>
  );
}

export default App;
