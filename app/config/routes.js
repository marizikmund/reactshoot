var React = require('react');
var Main = require('../components/Main');
var Home = require('../components/Home');
var Playground = require('../components/Playground')

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name="app" path="/" handler={Main}>
    <Route name="playground" handler={Playground} />
    <DefaultRoute handler={Home} />
  </Route>
);
