import React from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, Alert, Image } from 'react-native';

class Square extends React.Component {
    constructor(props) {
        super(props)
        // this.marginBottomValue = new Animated.Value(0);
        // this.marginRightValue = new Animated.Value(0);
        this.objectLocation = new Animated.ValueXY({ x: 0, y: 0 });
        this.state = { backgroundCol: '#0000ff' };
        this.currentFallAnimation;
        this.currentBounceAnimation;
        this.gameInProgress = false;
        this.speedFactor = 1000;
        this.distanceFactor = 300;
        //this.backgroundCol = new Animated.Value('#0000ff');
        //Alert.alert('some title',' ' + this.marginBottomValue);
    }

    handlePress = (evt) => {
        let x = evt.nativeEvent.locationX;
        let y = evt.nativeEvent.locationY;

        if (x > 25) {
            this.setState({ backgroundCol: '#000000' })
        }
        else {
            this.setState({ backgroundCol: '#d3d3d3' })
        }

        this.throw(x, y);

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

        if (this.currentFallAnimation) {
            this.currentFallAnimation.stop();
        }

        if (!this.gameInProgress) {
            this.gameInProgress = true;
            this.bounce(this.props.stageWidth - 50, coordinateX, coordinateY, true, true, xFactor);
        }
        //Alert.alert(vecticalFactor.toString() + "coordinate x: "+ coordinateX.toString())
        
        //animations for vertical movement
        this.currentFallAnimation = Animated.timing(
            this.objectLocation.y,
            {
                toValue: this.objectLocation.y._value + (this.distanceFactor),//(this.distanceFactor*xFactor)
                duration: this.speedFactor, //this.speedFactor * xFactor
                easing: Easing.out(Easing.ease)
            }
        ).start((response) => {
            if (response.finished) {
                this.currentFallAnimation = Animated.timing(
                    this.objectLocation.y,
                    {
                        toValue: 0,
                        duration: this.speedFactor * (this.objectLocation.y._value / this.distanceFactor),
                        easing: Easing.in(Easing.ease)
                    }
                ).start((result) => {
                    if (result.finished) {
                        //Alert.alert("Ive touched the floor ")
                        this.currentFallAnimation = null;
                        this.gameInProgress = false;
                        this.currentBounceAnimation.stop();
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
            <Animated.View style={{ width: 78, height: 86, marginLeft: leftDist, marginBottom: bottomDist }}>
                <TouchableOpacity onPress={this.handlePress}>
                    <View style={{ width: 78, height: 86 }}>
                        <Image style={{width: 78, height: 86 }} source={require("../../images/fox_going_down.png")}/>
                    </View>  
                </TouchableOpacity>
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