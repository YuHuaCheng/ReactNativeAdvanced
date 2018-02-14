import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-onetimepassword-6922c.cloudfunctions.net';

class SignInForm extends Component {

    // ES7 syntax, equivalent to assign this in constructor
    state = { phone: '', code: '' };

    handleSubmit = async () => { // ES7 syntax, with it we don't have to do .bind(this) if passing to a callback function!!
        const { phone, code } = this.state;

        // some another cool ES7 syntax called async / await
        try {
            // Per Stephan, he uses let when awaiting a promise to be resolved into variable, but it's been debated on his course,
            // check out here, https://www.udemy.com/react-native-advanced/learn/v4/t/lecture/6853540
            let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, { phone, code });
            await firebase.auth().signInWithCustomToken(data.token)
        } catch (err) {
            this.setState({ error: 'Something went wrong.' })
        }
    };

    render() {
        return (
            <View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Phone Number</FormLabel>
                    <FormInput
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                    />
                </View>

                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Code</FormLabel>
                    <FormInput
                        value={this.state.code}
                        onChangeText={code => this.setState({ code })}
                    />
                </View>

                <Button onPress={this.handleSubmit} title="Sign In" />
            </View>

        )
    }
}

export default SignInForm;