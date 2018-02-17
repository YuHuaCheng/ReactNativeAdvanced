import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';


const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {

    renderLastSlide(idx){
        if (idx === this.props.data.length -1){
            return (
                <View style={{ marginTop: 15 }}>
                    <Button
                        title="Onwards"
                        buttonStyle={styles.buttonStyle}
                        raised
                        onPress={this.props.onComplete}
                    />
                </View>
            )
        }
    }

    renderSlide(){
        return this.props.data.map((slide, idx) => {
            return (
                <View
                    key={slide.text}
                    style={[styles.slideStyle, {backgroundColor: slide.color}]}
                >
                    <Text style={styles.textStyle}>
                        {slide.text}
                    </Text>
                    {this.renderLastSlide(idx)}
                </View>
            )
        })
    }

    render() {
        return (
            <ScrollView
                horizontal
                style={{ flex: 1 }}
                pagingEnabled
            >
                {this.renderSlide()}
            </ScrollView>
        )
    }
}

const styles = {
    textStyle: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center'
    },
    slideStyle: {
        flex: 1,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
    }
};

export default Slides;