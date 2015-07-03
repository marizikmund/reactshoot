var React = require('react');

var Shot = React.createClass({
    getInitialState: function () {
        return {
            x:0,
            y:0,
            direction:'',
            one:0,
            display: 'none',
            nickname: '',
            key: '',
            enemies: []
        }
    },
    componentDidMount: function () {
        var plusX = 0,
            plusY = 0;
        switch(this.props.direction) {
            case 'left':
                plusX = -1;
                break;
            case 'top':
                plusY = -1;
                break;
            case 'right':
                plusX = 1;
                break;
            case 'bottom':
                plusY = 1;
                break;
        }

        this.setState({
            x:this.props.x+plusX,
            y:this.props.y+plusY,
            direction:this.props.direction,
            one:this.props.one,
            display: 'none',
            key: this.props.key,
            nickname: this.props.nickname,
            sent: this.props.sent,
            barriers: this.props.barriers,
            enemies: this.props.enemies
        });
        this.playShoot = setInterval(function() {this.continueShot()}.bind(this),50);

    },
    componentWillUnmount: function () {
        clearInterval(this.playShoot);
    },
    continueShot: function () {
        var plusX = 0,
            plusY = 0;
        switch(this.state.direction) {
            case 'left':
                plusX = -1;
                break;
            case 'top':
                plusY = -1;
                break;
            case 'right':
                plusX = 1;
                break;
            case 'bottom':
                plusY = 1;
                break;
        }
        var goon=true;
        for(x=0;x<this.state.enemies.length;x++) {
            if(this.state.enemies[x].x==this.state.x && this.state.enemies[x].y==this.state.y) {this.setState({display:'none'}); goon=false; }
        }
        for(x=0;x<this.state.barriers.length;x++) {
            if(this.state.barriers[x].x==this.state.x && this.state.barriers[x].y==this.state.y) {this.setState({display:'none'}); goon=false;}
        }

        if((this.state.x < 1 && this.state.direction=='left') || (this.state.x > 27-1 && this.state.direction=='right')
            ||  (this.state.y < 1 && this.state.direction=='top') || (this.state.y > 19-1  && this.state.direction=='bottom') || goon == false || this.state.expired) {
            clearInterval(this.playShoot);
            this.setState({display:'none'});
        } else {
            this.setState({
                x:this.state.x+plusX,
                y:this.state.y+plusY,
                direction: this.state.direction,
                one: 30,
                key: this.state.keyx,
                nickname: this.state.nickname,
                sent: this.props.sent,
                mykey: this.props.mykey,
                display: 'block'
            });
            if(this.props.myx==this.state.x && this.props.myy==this.state.y && this.state.display!='none' && this.state.sent != this.props.mykey) {
                if(this.state.sent !== undefined) {
                    this.firebaseRef = new Firebase("https://reactshoot.firebaseio.com/players");
                    this.firebaseRef.child(this.props.mykey).once('value', function(snapshot){
                        this.firebaseRef.child(this.props.mykey).set({ x: snapshot.val().x,y: snapshot.val().y,points: snapshot.val().points,deaths: snapshot.val().deaths+1,nickname: snapshot.val().nickname,
                            direction: snapshot.val().direction});

                    }.bind(this));
                    this.firebaseRef.child(this.state.sent).once('value', function(snapshot){
                        this.firebaseRef.child(this.state.sent).set({ x: snapshot.val().x,y: snapshot.val().y,points: snapshot.val().points+1,deaths: snapshot.val().deaths,nickname: snapshot.val().nickname,
                            direction: snapshot.val().direction});
                        this.setState({display:'none'});
                    }.bind(this));
                }
                this.props.teleport();
                this.setState({display:'none'});
                this.setState({expired:true});
            }

        }
    },
   render: function () {
       var rotate = '00deg';
       switch(this.state.direction) {
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
       var display=this.state.display;
       if(this.state.y ==0 && this.state.x==0) {display='none';}
       var style={top:this.state.y*this.state.one, left: this.state.x*this.state.one, display: display, position: 'absolute', transform: 'rotate('+rotate+')'};
       return (
         <img src="images/shot.png" style={style} />
       )
   }
});
module.exports = Shot;
