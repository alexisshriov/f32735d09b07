import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image, ImageBackground, Animated } from 'react-native';
import AnimateNumber from 'react-native-animate-number'
import Square from './Square'
import Dimensions from 'Dimensions';

class Stage extends React.Component {

    constructor() {
        super();
        this.state = { 
            stageHeigth: new Animated.Value(0), 
            sunHeigth: new Animated.Value(-50), 
            moonHeigth: new Animated.Value(-550), 
            displayedHeight: 0 
        }
        this.windowWidth = Dimensions.get('window').width;
        this.windowHeigth = Dimensions.get('window').height;
        this.temp = 0;
    }

    moveStage = (distanceFactor, speedFactor) => {
        Animated.timing(
            this.state.stageHeigth,
            {
                toValue: this.state.stageHeigth._value + distanceFactor,
                duration: speedFactor * 2
            }).start();

        Animated.timing(
            this.state.sunHeigth,
            {
                toValue: this.state.sunHeigth._value + distanceFactor/32,
                duration: speedFactor * 2
            }).start();

        Animated.timing(
            this.state.moonHeigth,
            {
                toValue: this.state.moonHeigth._value + distanceFactor/32,
                duration: speedFactor * 2
            }).start();
    }

    updateHeigthLabel = (newHeigth) => {
        //Alert.alert(newHeigth.toString())
     let totalHeigth = this.state.displayedHeight + newHeigth;
     //Alert.alert((this.state.displayedHeight +" _ "+newHeigth+ "_" +totalHeigth).toString())
     //if (newHeigth > this.state.displayedHeight) {
           this.setState({ displayedHeight: totalHeigth });
      // }
    }

    reload = () => {
        // alert("reloaded?")
        // this.forceUpdate();
    }

    render() {
        let backgroundColor = this.state.stageHeigth.interpolate({
            inputRange: [0, 20000, 40000, 60000],
            outputRange: ['rgb(0,150,255)', 'rgb(0,84,199)', 'rgb(0,64,152)', 'rgb(0,18,43)']
        });

        return (
            <Animated.View style={{ height: this.windowHeigth, backgroundColor: backgroundColor }}>
                {/* <Text style={{ fontSize: 50, zIndex:2, color: "red", alignSelf: 'center', marginTop: 10 }}>{(this.state.displayedHeight)}</Text> */}
                <AnimateNumber 
                    formatter={(val) => {return parseFloat(val).toFixed(0) + 'm'}} 
                    style={{ fontSize: 50, zIndex: 2, color: "white", alignSelf: 'center', marginTop: 10 }} 
                    value={this.state.displayedHeight} 
                    timing={(interval, progress) => {
                      return 15
                    }}             
                />    
                <Animated.View style={{ width: this.windowWidth, height: this.windowHeigth, marginTop: this.state.stageHeigth }}>
                    <ImageBackground source={require("../../images/stage.png")} style={{ flex: 1, position: 'absolute', width: this.windowWidth, height: this.windowHeigth - 127, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Square stageWidth={this.windowWidth} stageHeigth={this.windowHeigth} initialLaunch={this.initialLaunch} updateHeigthLabel={this.updateHeigthLabel} moveStage={this.moveStage} reload={this.reload} />
                    </ImageBackground>
                </Animated.View>
  
                    {/* <Animated.View style={{ top: -1000 + this.state.displayedHeight / 32, position: 'absolute', alignSelf: 'center', height: 50, width: 50, backgroundColor: 'red' }}></Animated.View>
                    <Image source={require("../../images/sun.png")} style={{ top: -50 + this.state.displayedHeight / 32, position: 'absolute', marginLeft: 50, height: 400, width: 400 }} />
                    <Image source={require("../../images/moon.png")} style={{ top: -550 + this.state.displayedHeight / 32, position: 'absolute', marginLeft: 50, height: 150, width: 150 }} />  */}
                    <Animated.Image source={require("../../images/sun.png")} style={{ top: this.state.sunHeigth, position: 'absolute', marginLeft: 50, height: 400, width: 400 }} />
                    <Animated.Image source={require("../../images/moon.png")} style={{ top: this.state.moonHeigth, position: 'absolute', marginLeft: 50, height: 200, width: 200 }} /> 
                </Animated.View>
        )
    }
}
const styles = {
    squareStyle: {
    }
}

export default Stage;