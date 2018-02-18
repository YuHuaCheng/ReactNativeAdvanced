import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import { FACEBOOK_APPLICATION_ID } from '../config';
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';

const FB_TOKEN_KEY = 'fb_token';

export const facebookLogin = () => async dispatch => {
        // without curly brace we can omit return keyword
        let token = await AsyncStorage.getItem(FB_TOKEN_KEY);
        if (token) {
            // Dispatch an action saying FB login is done
            dispatch({
                type: FACEBOOK_LOGIN_SUCCESS,
                payload: token
            })
        } else {
            // Start up FB login success
            await doFacebookLogin(dispatch);
        }
};

export const doFacebookLogin = async dispatch => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APPLICATION_ID, {
        permissions: ['public_profile']
    });

    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL })
    }

    await AsyncStorage.setItem(FB_TOKEN_KEY, token);
    dispatch({
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: token
    });
};
