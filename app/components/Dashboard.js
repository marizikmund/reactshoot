var React = require('react');

function compare(a,b) {
 if (a.points > b.points)
   return -1;
 if (a.points < b.points)
   return 1;
 return 0;
}

var Dashboard = React.createClass({
 render: function () {
    var all=[];
    all=all.concat(this.props.me);
    all=all.concat(this.props.enemies);
    all.sort(compare);

    var players = all.map(function(player,id) {
      return (<tr><td style={{paddingRight:10}}>{player.nickname}</td><td>{player.points || '0'}{' '}</td><td>{player.deaths || '0'}</td></tr>)
    });

    var style={ position: 'absolute', left:'-180px', width: 150, top: 20 };

    return (
       <table style={style}>
         <tbody>
           <tr>
             <th>Player</th>
             <th style={{paddingRight:10}}>Points</th>
             <th>Deaths</th>
           </tr>
           {players}
         </tbody>
       </table>
     )
  }
});


module.exports = Dashboard;
