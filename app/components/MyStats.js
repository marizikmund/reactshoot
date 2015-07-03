var React = require('react');

var MyStats=React.createClass({
   render: function () {
     var style={ position: 'absolute', left:'-100px', };
      return (
        <div style={{position: 'absolute', width: 150, right: '-160px', top:20}}>
            <b><img src="images/meleft.png" /> {this.props.me.nickname}<br />
            My points: {this.props.myPoints}<br />
            My deaths: {this.props.myDeaths}<br /></b>
          <br /><br/><br />
            A: Turn left <br />
            W: Go to top<br />
            D: Turn right<br />
            S: Go to bottom<br />
            SPACE: Shoot
        </div>
      )
   }
});

module.exports = MyStats;
