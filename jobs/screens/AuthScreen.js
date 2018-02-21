import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { facebookLogin } from '../actions';

class AuthScreen extends Component {
    componentDidMount(){
        this.props.navigation.addListener(
            'didFocus',
            () => {
                this.props.facebookLogin();
            })
    }

    componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props){
        const { token, navigation } = props;
        if (token){
            navigation.navigate('map');
        }
    }

    render(){
        return(
            <View />
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return { token: auth.token }
};


export default connect(mapStateToProps, { facebookLogin })(AuthScreen);

