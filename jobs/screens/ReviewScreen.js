import React, { Component } from 'react';
import {
    ScrollView,
    Platform,
    Button,
    View,
    Text,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import { Card, Icon } from 'react-native-elements';
import { MapView } from 'expo';

class ReviewScreen extends Component {
    // noinspection JSUnusedGlobalSymbols
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Review Jobs',
            headerRight: (
                <Button
                    title="Settings"
                    onPress={() => navigation.navigate('settings')}
                />
            ),
            headerStyle: {
                marginTop: Platform.OS === 'android' ? 24 : 0
            },
            tabBarIcon: ({ tintColor }) => {
                return (
                    <Icon
                        name='favorite'
                        size={25}
                        color={tintColor}
                    />
                )
            }
        }
    };

    renderLikedJobs(){
        return this.props.likedJobs.map(job => {
            const { id, company, url, title } = job;
            return (
                <Card
                    key={id}
                    title={title}
                >
                    <View style={{ height: 200 }}>
                        <MapView
                            scrollEnabled={false}
                            style={{ flex: 1 }}
                            cacheEnabled={true}
                            initialRegion={{ latitude: 30, longitude: -97, latitudeDelta: 0.045, longitudeDelta: 0.02 }}
                        />
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italicsStyle}>{company}</Text>
                            <Text style={styles.italicsStyle}>10 days ago</Text>
                        </View>
                        <View style={{ backgroundColor: "#03A9F4" }}>
                            <Button
                                title="Apply Now"
                                color="white"
                                onPress={() => Linking.openURL(url)}
                            />
                        </View>
                    </View>
                </Card>
            )
        })
    }

    render(){
        return(
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        )
    }
}

const styles = {
    detailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    italicsStyle: {
        fontStyle: 'italic'
    }
};

const mapStateToProps = (state) => {
    return { likedJobs: state.likedJobs }
};

export default connect(mapStateToProps)(ReviewScreen);

