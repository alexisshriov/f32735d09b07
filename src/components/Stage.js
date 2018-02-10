import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image, ImageBackground, Animated } from 'react-native';
import Square from './Square'
import Dimensions from 'Dimensions';



class Stage extends React.Component {

    constructor(){
        super();
        this.state = { stageHeigth: new Animated.Value(0), displayedHeight: 0 }
        this.windowWidth = Dimensions.get('window').width;
        this.windowHeigth = Dimensions.get('window').height;


    }

    initialLaunch = () => {
        setInterval(() => {this.setState( {displayedHeight: parseInt(this.state.stageHeigth._value)})}, 10);
        Animated.timing(
            this.state.stageHeigth,
            {
                toValue: this.windowHeigth,
                duration: 2000
            }).start();
    }

    render() {
       

        return (
            <View style={{ justifyContent: 'flex-start', height: this.windowHeigth }}>
                <Animated.View style={{ height: this.state.stageHeigth, backgroundColor: '#7EC0EE', alignItems: 'center', marginTop: 25  }}>
                    <Animated.Text style={{ fontSize: 50, color: "red" }}>{(this.state.displayedHeight)}</Animated.Text>
                </Animated.View>
                <View style={{ width: this.windowWidth, height: this.windowHeigth, backgroundColor: "red" }}>
                    <ImageBackground source={require("../../images/stage.png")} style={{ marginTop: -100, flex: 1, position: 'absolute', width: this.windowWidth, height: this.windowHeigth, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Square stageWidth={this.windowWidth} stageHeigth={this.windowHeigth} initialLaunch={this.initialLaunch} />
                    </ImageBackground>
                </View>

            </View>
        )
    }
}
const styles = {
    squareStyle: {
        
    }

}

export default Stage;