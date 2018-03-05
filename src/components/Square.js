import React from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, Alert, Image, ImageBackground } from 'react-native';

class Square extends React.Component {
    constructor(props) {
        super(props)
        this.objectLocation = new Animated.ValueXY({ x: 0, y: 0 });
        this.state = { backgroundCol: '#0000ff', isFoxGoingUp: false};
        this.currentFallAnimation;
        this.currentBounceAnimation;
        this.gameInProgress = false;
        this.speedFactor = 2000;
        this.distanceFactor = 300;
        this.isInitialLaunch = true;
        this.timeStamp = 0;
        this.timeDiff = 0;
    }

    handlePress = (evt) => {
        let x = evt.nativeEvent.locationX;
        let y = evt.nativeEvent.locationY;

        let newTime = new Date();
        this.timeDiff = newTime - this.timeStamp;
        this.timeStamp = newTime;

        if(this.timeDiff > this.speedFactor){
            this.timeDiff = this.speedFactor
        }

        if (x > 25) {
            this.setState({ backgroundCol: '#000000' })
        }
        else {
            this.setState({ backgroundCol: '#d3d3d3' })
        }
        this.throw(x, y);
      
        this.props.moveStage(this.distanceFactor, this.speedFactor);//

    }

    initialLaunch = () => {
        this.props.initialLaunch();
    }

    bounce = (toValue, x, y, firstBounce, goingRight, xFactor) => {
        let duration;
        if (x >= 25 && firstBounce) {
            toValue = -toValue;
            goingRight = !goingRight;
        }

        if (goingRight) {
            duration = 0.5*((this.props.stageWidth - this.objectLocation.x._value) / this.props.stageWidth) * this.speedFactor / 2;
        } else {
            duration = 0.5*((this.props.stageWidth + this.objectLocation.x._value) / this.props.stageWidth) * this.speedFactor / 2;
        }

        this.currentBounceAnimation = Animated.timing(
            this.objectLocation.x,
            {
                toValue: toValue,
                duration: duration/(1-xFactor),
                easing: Easing.linear
            });

        this.currentBounceAnimation.start(
            (result) => {
                if (result.finished) {
                    this.bounce(-toValue, x, y, false, !goingRight, xFactor)
                }
            }
        );
    }

    //throws the object up and then it falls down
    throw = (coordinateX, coordinateY) => {
        //correcting out of bound coordinate issue, seems that when clicking too fast the coordinate can be > 25
        coordinateX = coordinateX > 50? 50 : coordinateX
        //interpoling vertical factor to get a value from 0 to 1;
        const xFactor = (25 - Math.abs(coordinateX -25)) / 25;

       // Alert.alert((this.currentFallAnimation == null).toString())

        if (this.currentFallAnimation) {
            this.currentFallAnimation.stop();
            this.currentBounceAnimation.stop();
            this.bounce(this.props.stageWidth - 50, coordinateX, coordinateY, true, true, xFactor);
        }

        if (!this.gameInProgress) {
            this.gameInProgress = true;
            this.bounce(this.props.stageWidth - 50, coordinateX, coordinateY, true, true, xFactor);
        }
        //Alert.alert(vecticalFactor.toString() + "coordinate x: "+ coordinateX.toString())
        
        //animations for vertical movement
        //this.props.moveStage(this.distanceFactor, this.speedFactor)

        let distanceFactor =  this.distanceFactor;
        let speedFactor = this.speedFactor;

       
        
        if(this.isInitialLaunch){
           // this.props.moveStage(this.distanceFactor, this.speedFactor);
            // setInterval(() => { this.props.updateHeigthLabel( parseInt(  this.objectLocation.y._value)) }, 1000);
            this.startDate = new Date();
            this.isInitialLaunch = false;
            distanceFactor = this.distanceFactor*2;
            speedFactor =  this.speedFactor*2;
          //  Alert.alert(parseInt(  (timeDiff/this.speedFactor) ).toString())
            this.props.updateHeigthLabel( parseInt( distanceFactor )) 

        } else{
            //Alert.alert(parseInt( this.distanceFactor * (timeDiff/this.speedFactor) ).toString())
            this.props.updateHeigthLabel( parseInt( this.objectLocation.y._value + this.distanceFactor * (this.timeDiff/this.speedFactor) )) 
        }

        
        //this.props.updateHeigthLabel( parseInt( this.objectLocation.y._value)) 
        this.setState({isFoxGoingUp: true});

        this.currentFallAnimation = Animated.timing(
            this.objectLocation.y,
            {
                toValue: this.objectLocation.y._value + (distanceFactor),//(this.distanceFactor*xFactor)
                duration: speedFactor, //this.speedFactor * xFactor
                easing: Easing.out(Easing.ease)
            }
        );
       // Alert.alert(this.objectLocation.y._value.tostring())
        this.currentFallAnimation.start((response) => {
            if (response.finished) {
                this.setState({isFoxGoingUp: false});
                this.currentFallAnimation = Animated.timing(
                    this.objectLocation.y,
                    {
                        toValue:  this.objectLocation.y._value - this.props.stageHeigth - 300,
                        duration: speedFactor * this.props.stageHeigth / this.distanceFactor,
                        easing: Easing.in(Easing.ease)
                    }
                );
                this.currentFallAnimation.start((result) => {
                    if (result.finished) {
                        //Alert.alert("Ive touched the floor ")
                        //Alert.alert((this.currentFallAnimation == null).toString())
                        this.currentFallAnimation = null;
                        this.gameInProgress = false;
                        this.currentBounceAnimation.stop();
                        //Alert.alert("Game Over!")
                    }
                });
            }
        })
    }

    render() {
        const widthRange = this.props.stageWidth;
        const widthHeight = this.props.stageWidth;

        const bottomDist = this.objectLocation.y.interpolate({
            inputRange: [-widthRange, widthRange],
            outputRange: [-widthRange, widthRange]
        })
        const leftDist = this.objectLocation.x.interpolate({
            inputRange: [-widthHeight, widthHeight],
            outputRange: [-widthHeight, widthHeight]
        })

        const backgroundCol = this.state.backgroundCol;

        return (
            <Animated.View style={{ width: 78, height: 86, zIndex:1, marginLeft: leftDist, marginBottom: bottomDist }}>
                <View style={{ width: 78, height: 86 }}>

                    <TouchableOpacity onPress={this.handlePress} style={{ width: 78, height: 86, alignSelf: 'center' }}>
                        {this.state.isFoxGoingUp?
                            <Image style={{ width: 78, height: 86 }} source={require("../../images/fox_going_up.png")}/>:
                            <Image style={{ width: 78, height: 86 }} source={require("../../images/fox_going_down.png")}/>
                        }
                    </TouchableOpacity>

                </View>  
               
            </Animated.View>

        )
    }

}

const styles = {
    square: {
        borderWidth: 1,
        borderColor: '#d6d7da',
        backgroundColor: 'black',
        marginTop: 400,
        width: 50,
        height: 50
    }
}

export default Square;