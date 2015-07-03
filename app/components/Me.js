var React = require('react');


var Me=React.createClass({
   render: function () {
       var rotate = '00deg';
       switch(this.props.direction) {
           case 'top':
               rotate='90deg';
               break;
           case 'right':
               rotate='180deg';
               break;
           case 'bottom':
               rotate='270deg';
               break;
           case 'left':
               rotate='0deg';
               break;
       }
       var style={top: this.props.y*this.props.one, left: this.props.x*this.props.one,  transform: 'rotate('+rotate+')', position: 'absolute'};
       return (
         <img src="images/meleft.png" style={style} />
       )
   }
});

module.exports = Me;
