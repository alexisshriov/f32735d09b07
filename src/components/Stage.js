import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';
import Square from './Square'
import Dimensions from 'Dimensions';



class Stage extends React.Component {



    render() {
        const windowWidth = Dimensions.get('window').width;
        const windowHeigth = Dimensions.get('window').height;

        return (
            <View style={{ justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#7EC0EE', width: windowWidth, height: windowHeigth }}>
                <View>
                    <Text style={{fontSize: 50, color: "red", top: 30}}>10 m</Text>
                </View>
                
                <View style={{ width: windowWidth, height: windowHeigth-100, backgroundColor: "red" }}>

                    <ImageBackground source={require("../../images/stage.png")} style={{ marginTop: 300, flex: 1, position: 'absolute', width: windowWidth, height: windowHeigth, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Square stageWidth={windowWidth} stageHeigth={windowHeigth} />
                    </ImageBackground>
                </View>

            </View>
        )
    }
}
// const styles = {
//     squareStyle: {

//     }

// }

export default Stage;