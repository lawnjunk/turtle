var TurtleDispatcher          = require('../dispatcher/ChatAppDispatcher');
var {LOGIN_USER, LOGOUT_USER} = require('../constants/login_constants'   );
// var RouterContainer           = require('../services/router_container'   );
var eat                       = require('eat'                            );
import Router, {DefaultRoute, Router, Link, Route, RouteHandler, Navigation } from 'react-router';

export default {

  loginUser: function(eat) {

    var savedEat = localStorage.getItem('eat');
    console.log('user logged in');

    if(savedEat !== eat) {
      console.log('eat token good, redirect to /dashboard');
      var nextPath = '/dashboard';

      console.log(eat);

      function direct (nextState, transition) {
        transition.to('/dashboard', null, {nextPathname: nextState.location.pathname});
      }

      localStorage.setItem('eat', eat);
    }

    TurtleDispatcher.dispatch({
      actionType: LOGIN_USER,
      eat: eat
    });
  },

  logoutUser: function(eat) {
    RouterContainer.get().transition.to('/#/log_in');
    localStorage.removeItem('eat');
    TurtleDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
}
