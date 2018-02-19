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
import { Card } from 'react-native-elements';

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
            }
        }
    };

    renderLikedJobs(){
        return this.props.likedJobs.map(job => {
            return (
                <Card key={job.id}>
                    <View style={{ height: 200 }}>
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italicsStyle}>{job.company}</Text>
                            <Text style={styles.italicsStyle}>10 days ago</Text>
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

