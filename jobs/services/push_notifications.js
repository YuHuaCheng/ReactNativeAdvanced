import axios from 'axios';
import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';

const PUSH_TOKEN_KEY = 'push_token';
const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    let previousToken = await AsyncStorage.getItem(PUSH_TOKEN_KEY);

    if (previousToken){
        return null;
    } else {
        let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (status !== 'granted'){
            return null;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        await axios.post(PUSH_ENDPOINT, { token: { token } });
        console.log(token);
        AsyncStorage.setItem(PUSH_TOKEN_KEY, token);
    }
};