var React = require('react');

var Home = React.createClass({
    propTypes: {
        openGame: React.PropTypes.func.isRequired
    },
    onk: function (e) {
       this.props.setNickname(e.target.value);
    },
    openGame: function (e) {
        this.props.openGame();
        e.preventDefault();
    },
    render: function(){
      var styles = {marginTop: 70, color: '#000',fontSize:'340%'};
      return (
        <div>
          <div style={{height: 280, background: 'url(images/bcglight.jpg) #FFF center'}}>
            <div className="container-fluid" >
              <h1 className="text-center" style={styles}>
                Welcome to <img src="images/meleft.png" />ReactShoot!
              </h1>
              <div className="text-center">
                <form onSubmit={this.openGame}>
                  <div className="form-group col-sm-3 col-sm-offset-4" style={{marginTop:20}}>
                    <input type="text"
                      placeholder="My nickname"
                      className="form-control"
                      ref="nickname"
                      onKeyDown={this.onk}
                    />
                  </div>
                  <div className="form-group col-sm-2" style={{paddingLeft:0, marginTop: 20}}>
                    <button className="btn btn-success pull-left" >Play now!</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row" style={{paddingTop:60}}>
              <div className="col-sm-6">
                <img src="images/ground.jpg" className="img-responsive " />
              </div>
              <div className="col-sm-6 text-center" style={{display: 'inline-block',
                verticalAlign: 'middle',
                float: ' none',paddingTop: 40, fontSize: '130%'}}>
                <h3>Enter your nickname and play.</h3><br/><br/>
                <strong> A: Turn left <br />
                W: Go to top<br />
                D: Turn right<br />
                S: Go to bottom<br />
                Space: Shoot</strong><br /><br />
                Just kill everyone and compare your scores.
              </div>
            </div>
          </div>
          <div style={{background: 'url(images/bcglight.jpg)', marginTop: 60, paddingTop: 50, paddingBottom: 60}}>
            <div className="container text-center" >
              <h3 className="">Purpose of this project</h3>
              <p>This game was build to demonstrate the strength of ReactJS, Flux architecture, Webpack and Firebase.</p>
              <p>The game has for sure some bugs, but please understand its main goal - demonstration of possibilities, which these technologies offer. Many thanks to @ReactWeek.</p>
              <p>Nobody in the game? Call a friend or open two tabs for yourself, just to see that it's working.</p>
            </div>
          </div>
          <div className="container text-center" style={{ paddingTop: 30, paddingBottom: 40}}>
            <h3 className="text-center">Want to learn these technologies?</h3>
            <br /><button className="btn btn-primary">View the code on Github</button>
          </div>
          <div className="container text-center" style={{ paddingTop: 30, paddingBottom: 40}}>
            <br />There are definitely many possibilities for improving the game (graphics, rewriting all to HTML Canvas for faster rendering, optimization of algorithms...). If you had any other idea, feel free to contact me.
          </div>
        </div>
        )
  }
});

module.exports = Home;
