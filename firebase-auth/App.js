import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import SignUpForm from './src/components/SignUpForm';
import SignInForm from './src/components/SignInForm'

export default class App extends React.Component {
    componentDidMount(){
        const config = {
            apiKey: "AIzaSyBmU4YUKNcvJzmH4I_peugcRcq4NeqD1x0",
            authDomain: "onetimepassword-6922c.firebaseapp.com",
            databaseURL: "https://onetimepassword-6922c.firebaseio.com",
            projectId: "onetimepassword-6922c",
            storageBucket: "onetimepassword-6922c.appspot.com",
            messagingSenderId: "539783150417"
        };
        firebase.initializeApp(config);
    }

    render() {
        return (
            <View style={styles.container}>
                <SignUpForm />
                <SignInForm />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
});
