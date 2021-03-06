import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Notifications } from 'expo';

import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingScreen from './screens/SettingScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
    componentDidMount() {
        registerForNotifications()
            .then(() => {}); // do nothing
        Notifications.addListener((notification) => {
            const { data: { text }, origin } = notification;

            if (origin === 'received' && text) {
                Alert.alert(
                    'New Pushed Notification',
                    text,
                    [{text: 'ok'}] // button to dismiss the notification
                )
            }
        });
    }

    render() {
        const MainNavigator = TabNavigator({
            welcome: { screen: WelcomeScreen },
            auth: { screen: AuthScreen },
            main: {
                screen: TabNavigator({
                    map: { screen: MapScreen },
                    deck: { screen: DeckScreen },
                    review: {
                        screen: StackNavigator({
                            review: { screen: ReviewScreen },
                            settings: { screen: SettingScreen }
                        })}
                }, {
                    tabBarPosition: 'bottom',
                    tabBarOptions: {
                        labelStyle: { fontSize: 10 }
                    }
                })
            }
        }, {
            navigationOptions: {
                tabBarVisible: false
            }
        });

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <MainNavigator />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});
