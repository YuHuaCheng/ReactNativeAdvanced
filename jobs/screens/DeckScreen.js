import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import HTML from 'react-native-render-html';

import { likeJob } from '../actions/job_actions';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {
    // noinspection JSUnusedGlobalSymbols
    static navigationOptions = {
        title: "Jobs",
        tabBarIcon: ({ tintColor }) => {
            return (
                <Icon
                    name='description'
                    size={25}
                    color={tintColor}
                />
            )
        }
    };


    renderCard = (job) => {
        return (
            <Card
                title={job.title}
            >
                <View style={{ height: 300 }}>
                    <MapView
                        scrollEnabled={false}
                        style={{ flex: 1 }}
                        cacheEnabled={true} // performance concern, by setting it true, the map will be rendered as a static image, so we can save some resource
                        initialRegion={{ latitude: 30, longitude: -97, latitudeDelta: 0.045, longitudeDelta: 0.02 }}
                    />
                </View>

                <View style={styles.detailWrapper}>
                    <Text>{job.company}</Text>
                    <Text>10 days ago</Text>
                </View>

                <ScrollView style={{ flex: 1 }}>
                    <HTML html={job.description} />
                </ScrollView>

            </Card>
        )
    };

    renderNoMoreCards = () => {
        const { navigation } = this.props;

        return (
            <Card title="No More Jobs">
                <Button
                    title='Back To Map'
                    large
                    icon={{ name: 'my-location' }}
                    backgroundColor="#03A9F4"
                    onPress={() => {navigation.navigate('map')}}
                />
            </Card>
        )
    };

    render(){
        return(
            <View style={{ marginTop: 10 }}>
                <Swipe
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    onSwipeRight={job => this.props.likeJob(job)}
                    keyProp="id"
                />
            </View>
        )
    }
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 10
    }
};

const mapStateToProps = ({ jobs }) => {
    return { jobs: jobs.results };
};

export default connect(mapStateToProps, { likeJob })(DeckScreen);

