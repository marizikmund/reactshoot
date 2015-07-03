var React = require('react');
var Router = require('react-router');
var ShotsStore = require('../stores/ShotsStore');
var ShotsActions = require('../actions/ShotsActions');
var EnemiesStore = require('../stores/EnemiesStore');
var SettingsStore = require('../stores/SettingsStore');
var EnemiesActions = require('../actions/EnemiesActions');
var MeStore = require('../stores/MeStore');
var MeActions = require('../actions/MeActions');
var Shot = require('./Shot');
var Dashboard = require('./Dashboard');
var MyStats = require('./MyStats');
var Enemy = require('./Enemy');
var Barrier = require('./Barrier');
var Me = require('./Me');
var $ = require('jquery');
var firebase = require('firebase');

var Playground = React.createClass({
  mixins: [ Router.State ],
  getInitialState: function () {
    return {
      sizes: SettingsStore.getSizes(),
      me: {
        nickname: '',
        direction: 'left'
      },
      enemies: EnemiesStore.getEnemies(),
      keys: SettingsStore.getKeys(),
      shots: ShotsStore.getShots(),
      myDeaths:MeStore.getMyDeaths(),
      myPoints:MeStore.getMyPoints(),
      barriers: SettingsStore.getBarriers()
    }
  },
  _onAddShot: function () {
    this.setState({
      shots: ShotsStore.getShots()
    });
  },
  _onChangeEnemy: function () {
    this.setState({
      enemies: EnemiesStore.getEnemies()
    });
  },
  _onChangeMe: function () {
    this.setState({
      me: MeStore.getMe(),
      myPoints: MeStore.getMyPoints(),
      myDeaths: MeStore.getMyDeaths()
    });
  },
  componentDidMount: function () {
    ShotsStore.addChangeListener(this._onAddShot);
    EnemiesStore.addChangeListener(this._onChangeEnemy);
    MeStore.addChangeListener(this._onChangeMe);
    if(this.props.nickname) { var nickname = this.props.nickname; } else {var nickname='player'+Math.floor(Math.random()*1000);}
    MeActions.updateMe({
     nickname: nickname,
     length: 0,
     points: 0,
     deaths:0,
     direction: 'left'
   });
    this.firebaseRef = new Firebase("https://reactshoot.firebaseio.com/players");
    this.firebaseRefShots = new Firebase("https://reactshoot.firebaseio.com/shots");
    this.appear(nickname);
    this.firebaseRef.on('child_added', function(snapshot){
      if(snapshot.val().nickname==nickname) {
        var MeObject = {
          x: snapshot.val().x,
          y: snapshot.val().y,
          keyi: snapshot.key(),
          somek: snapshot.key(),
          nickname: snapshot.val().nickname,
          key: snapshot.key(),
          deaths: snapshot.val().deaths,
          points: snapshot.val().points,
          length: 0,
          direction: snapshot.val().direction
        };
        MeActions.updateMe(MeObject);
      }
      else {
        EnemiesActions.addEnemy({key: snapshot.key(), nickname: snapshot.val().nickname, x: snapshot.val().x, y: snapshot.val().y, direction: snapshot.val().direction});
      }
    }.bind(this));
    this.firebaseRef.on('child_removed', function(childSnapshot, prevChildName) {
      EnemiesActions.removeEnemy(childSnapshot.val().nickname);
    }.bind(this));
    this.firebaseRef.on('child_changed', function(childSnapshot, prevChildName) {
      var newEnemies = this.state.enemies.map(function(enemy,id) {
       if(childSnapshot.val().nickname==enemy.nickname) {
        return {nickname: childSnapshot.val().nickname,x: childSnapshot.val().x,y: childSnapshot.val().y,direction: childSnapshot.val().direction, points: childSnapshot.val().points, deaths: childSnapshot.val().deaths};
      } else {return enemy;}
    });
      this.setState(
      {
        enemies: newEnemies
      }
      );
      if(childSnapshot.key()==this.state.me.key) {
       this.setState({myDeaths:childSnapshot.val().deaths,myPoints:childSnapshot.val().points});
     }
   }.bind(this));
    var shoti = this.state.shots;
    var that = this;
    this.firebaseRefShots.on('child_added', function(snapshot){
      ShotsActions.addShot({x:snapshot.val().x,y: snapshot.val().y, direction: snapshot.val().direction, nickname: snapshot.val().nickname, key: snapshot.key(),sent: snapshot.val().sent});
    }.bind(this));
    var node = this.getDOMNode();
    $(node).focus();
  },

  go: function (e) {
    var plusX =0, plusY = 0, direction= this.state.me.direction;
    switch(e.which) {
      case this.state.keys.left:
      plusX=-1;
      direction= 'left';
      break;
      case this.state.keys.top:
      plusY=-1;
      direction= 'top';
      break;
      case this.state.keys.right:
      plusX=1;
      direction= 'right';
      break;
      case this.state.keys.bottom:
      plusY=1;
      direction= 'bottom';
      break;
      case this.state.keys.shoot:
      this.shoot();
      break;
      default:
      direction = this.state.me.direction

    };
    var newX = this.state.me.x+plusX,
    newY = this.state.me.y+plusY;
    var cango=true;
    for(x=0;x<this.state.barriers.length;x++) {
      if(this.state.barriers[x].x==newX && this.state.barriers[x].y==newY) {cango=false; }
    }
    for(x=0;x<this.state.enemies.length;x++) {
      if(this.state.enemies[x].x==newX && this.state.enemies[x].y==newY) {cango=false; }
    }
    if(newX >= 0 && newX <= this.state.sizes.x && cango) {} else {newX = this.state.me.x;}
    if(newY >= 0 && newY <= this.state.sizes.y && cango) {} else {newY = this.state.me.y;}
    this.setState({
      me: {
        x: newX,
        y: newY,
        direction: direction,
        somek: this.state.me.somek,
        keyi: this.state.me.keyi,
        nickname: this.state.me.nickname,
        key: this.state.me.key,
        deaths: this.state.me.deaths,
        points: this.state.me.points,
        length: this.state.me.length
      }
    });
        this.firebaseRef.child(this.state.me.somek).set({ x: newX, y: newY, direction: direction, nickname: this.state.me.nickname, points:this.state.myPoints, deaths: this.state.myDeaths}); //this.state.me.nickname
        e.preventDefault();
      },
      shoot: function () {
        var shootObject = {x:this.state.me.x,y:this.state.me.y,direction:this.state.me.direction,one:30, nickname: this.state.me.nickname, sent: this.state.me.key};
        var sh = this.firebaseRefShots.push(shootObject); //this.state.sizes.one
        this.firebaseRefShots.child(sh.key()).remove();

      },
      appear: function (nick) {
        var newY = Math.floor(Math.random()*this.state.sizes.y),
        newX = Math.floor(Math.random()*this.state.sizes.x);
        var ran = ranXY.bind(this);
       // var ss= ran();
       function ranXY() {
        var newY = Math.floor(Math.random()*this.state.sizes.y),
        newX = Math.floor(Math.random()*this.state.sizes.x);
        var cango = true;
        for(x=0;x<this.state.barriers.length;x++) {
          if(this.state.barriers[x].x==newX && this.state.barriers[x].y==newY) {cango=false;}
        }
        for(x=0;x<this.state.enemies.length;x++) {
          if(this.state.enemies[x].x==newX && this.state.enemies[x].y==newY) {cango=false;}
        }
        if(cango) {
          return {x:newX,y:newY} ;
        }
        else {
          return ranXY();
        }
      };
      var x=this.firebaseRef.push({nickname: nick, x: newX, y: newY, direction: 'left', info: 'nothing', points:0,deaths:0,length:0});
      x.onDisconnect().remove();
    },
    teleport: function() {
      var randomY = Math.floor(Math.random()*this.state.sizes.y),
      randomX = Math.floor(Math.random()*this.state.sizes.x);
      $(this.getDOMNode()).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
      this.setState({
        me: {
          x: randomX,
          y: randomY,
          direction: this.state.me.direction,
          somek: this.state.me.somek,
          keyi: this.state.me.keyi,
          nickname: this.state.me.nickname,
          key: this.state.me.key,
          deaths: this.state.me.deaths,
          points: this.state.me.points,
          length: this.state.me.length
        }
      });
        this.firebaseRef.child(this.state.me.somek).set({ x: randomX, y: randomY, direction: 'left', nickname: this.state.me.nickname, points:this.state.myPoints, deaths: this.state.myDeaths});
      },
      removeShot: function (key) {
        var shots = this.state.shots.filter(function(shot,id) {
          console.log(shot.key, ' shotkey ',key);
          if(shot.key==key) {return false;} else {return true;}
        });
        this.setState({shots:shots});
      },

      render: function(){

        var username = this.getParams().username;
        var basicStyle = {width:840, height:600, display: 'block', marginLeft: 'auto', marginRight: 'auto', border: '1px solid black',background:'url(images/bcg.jpg)',textAlign:'left', position: 'relative'};
        var shots = this.state.shots.map(function (shot, id) {
          return (<Shot removeShot={this.removeShot} x={shot.x} y={shot.y} enemies={this.state.enemies} barriers={this.state.barriers} one={shot.one} teleport={this.teleport} direction={shot.direction} nickname={this.state.me.nickname} keyx={shot.key} mykey={this.state.me.key}  sent={shot.sent} myx={this.state.me.x} myy={this.state.me.y}  />)
        }.bind(this));
        var enemies = this.state.enemies.map(function (enemy, id) {
          return (<Enemy x={enemy.x} y={enemy.y} one={this.state.sizes.one} direction={enemy.direction} title={enemy.nickname} />)
        }.bind(this));
        var barriers = this.state.barriers.map(function (barrier, id) {
          return (<Barrier x={barrier.x} y={barrier.y} one={this.state.sizes.one} />)
        }.bind(this));
        return (
          <div className="row" tabIndex="1" onKeyPress={this.go} ref="playground">
          <div style={basicStyle} className="text-center">
          <Me x={this.state.me.x} y={this.state.me.y} one={this.state.sizes.one} direction={this.state.me.direction} ref="me" />
          {shots}
          {enemies}
          {barriers}
          <Dashboard me={{nickname: this.state.me.nickname, points: this.state.myPoints, deaths: this.state.myDeaths}} enemies={this.state.enemies} myPoints={this.state.myPoints} myDeaths={this.state.myDeaths} />
          <MyStats me={this.state.me} myPoints={this.state.myPoints} myDeaths={this.state.myDeaths} />
          </div>
          </div>
          )
      }
    });

module.exports = Playground;
