import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image, ImageBackground, Animated } from 'react-native';
import Square from './Square'
import Dimensions from 'Dimensions';

class Stage extends React.Component {

    constructor(){
        super();
        this.state = { stageHeigth: new Animated.Value(50), displayedHeight: 0 }
        this.windowWidth = Dimensions.get('window').width;
        this.windowHeigth = Dimensions.get('window').height;
        this.temp = 0;
    }

    moveStage = ( distanceFactor, speedFactor ) => {
        Animated.timing(
            this.state.stageHeigth,
            {
                toValue: this.state.stageHeigth._value + distanceFactor,
                duration: speedFactor*2
            }).start();
    }

    updateHeigthLabel = ( newHeigth ) => {
        //Alert.alert("sad")
        if(newHeigth > this.state.displayedHeight){
            this.setState({ displayedHeight: newHeigth });
        }
    }

    render() {
        return (

            <View style={{ height: this.windowHeigth, backgroundColor: "blue" }}>
                <Text style={{ fontSize: 50, zIndex:2, color: "red", alignSelf: 'center', marginTop: 10 }}>{(this.state.displayedHeight)}</Text>
                <Animated.View style={{ width: this.windowWidth, height: this.windowHeigth, marginTop: this.state.stageHeigth }}>
                    <ImageBackground source={require("../../images/stage.png")} style={{  flex: 1, position: 'absolute', width: this.windowWidth, height: this.windowHeigth-130, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Square stageWidth={this.windowWidth} stageHeigth={this.windowHeigth} initialLaunch={this.initialLaunch} updateHeigthLabel = {this.updateHeigthLabel} moveStage = {this.moveStage} />
                    </ImageBackground>
                </Animated.View>
                <Animated.View style={{top: -1000 + this.state.displayedHeight/16, position:'absolute', alignSelf:'center', height:50, width:50, backgroundColor: 'red'}}></Animated.View>
                <Image source={require("../../images/moon.png")} style={{top: -50 + this.state.displayedHeight/16, position:'absolute', marginLeft: 150, height:200, width:200}}/>
                <Animated.View style={{top: -550 + this.state.displayedHeight/16, position:'absolute', height:50, width:50, backgroundColor: 'white'}}></Animated.View>
            </View>

        )
    }
}
const styles = {
    squareStyle: {
    }
}

export default Stage;