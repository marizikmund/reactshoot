var React = require('react');

var Barrier=React.createClass({
    render: function () {
        var style={top: this.props.y*this.props.one, left: this.props.x*this.props.one, position: 'absolute'};
        return (
            <img src="images/barrier.png" style={style} />
        )
    }
});

module.exports = Barrier;
