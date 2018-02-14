import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-onetimepassword-6922c.cloudfunctions.net';

class SignUpForm extends Component {

    // ES7 syntax, equivalent to assign this in constructor
    state = { phone: '' };

    handleSubmit = async () => { // ES7 syntax, with it we don't have to do .bind(this) if passing to a callback function!!
        const { phone } = this.state;

        // some another cool ES7 syntax called async / await
        try {
            await axios.post(`${ROOT_URL}/createUser`, { phone });
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone })
        } catch (err) {
            this.setState({ error: 'Something went wrong.' })
        }
        // without using async / await ...
        // axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
        //     .then(() => {
        //         axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
        //     })
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
                <Button onPress={this.handleSubmit} title="Sign Up" />
            </View>

        )
    }
}

export default SignUpForm;