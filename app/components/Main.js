var React = require('react');
var Home = require('./Home');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Main = React.createClass({
  mixins: [Router.Navigation],
  getInitialState: function () {
      return {nickname: ''}
  },
  openGame: function () {
    this.setState({
      nickname: this.state.nickname || 'random'
    });
    this.transitionTo('playground');
  },
  setNickname: function (n) { //this.state.me.nickname
    this.setState({
      nickname: n
    });
  },
  render: function(){
    return (
      <div className="main-container" >
        <nav className="navbar navbar-default" role="navigation" style={{marginBottom:0, background: 'url(images/bcglights.jpg)', border: 'none'}}>
          <div className="col-sm-7" style={{marginTop: 15}}>
              <b><Link to="app" style={{color: 'black'}}><img src="images/meleft.png" width="20" height="20" />ReactShoot!</Link></b> ...multiplayer online game built in ReactJS
          </div>
        </nav>
        <div className="containerx">
          <RouteHandler openGame={this.openGame} nickname={this.state.nickname} setNickname={this.setNickname} />
        </div>
          <div className="container" style={{paddingBottom: 20, marginTop: 40}}>
              <span className="pull-right">View the source code on Github.</span>
          </div>
      </div>
    )
  }
});

module.exports = Main;
