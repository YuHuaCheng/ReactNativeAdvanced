import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
    FACEBOOK_LOGIN_SUCCESS
} from './types';

import { FACEBOOK_APPLICATION_ID } from '../config';


export const facebookLogin = () => async dispatch => {
        // without curly brace we can omit return keyword
        let token = await AsyncStorage.getItem('fb_token');
        if (token) {
            // Dispatch an action saying FB login is done
            dispatch({
                type: FACEBOOK_LOGIN_SUCCESS,
                payload: token
            })
        } else {
            // Start up FB login success
            doFacebookLogin();
        }
};

export const doFacebookLogin = async () => {
    let result = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APPLICATION_ID);
};
