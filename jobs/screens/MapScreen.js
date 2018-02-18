import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';

import { fetchJobs } from '../actions'

class MapScreen extends Component {
    state = {
        region: { // initial region when the view is loaded
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    };

    onRegionChangeComplete = (region) => {
        this.setState({ region });
    };

    onButtonPress = () => {
        const { fetchJobs, navigation } = this.props;
        fetchJobs(this.state.region, () => {
            navigation.navigate('deck');
        });
    };

    render(){
        return(
            <View style={{ flex: 1 }}>
                <MapView
                    region={this.state.region}
                    style={{ flex: 1 }}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Search This Area"
                        backgroundColor="#009688"
                        icon={{ name: 'search' }}
                        onPress={this.onButtonPress}
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 50,
        right: 50
    }
};

export default connect(null, { fetchJobs })(MapScreen);

