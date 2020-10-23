[Back to main page](../readme.md)

## Guide For

> #### React-Native-Firebase Messaging + React-Native-Push-Notification
> Retrieve messages and display notifications.

### Installation
```
# Install & setup the app module
npm i @react-native-firebase/app

# Install the messaging module
npm i @react-native-firebase/messaging

# Install push notification
npm i --save react-native-push-notification

# If you're developing your app using iOS, run this command
cd ios/ && pod install
```

### Usage
change **Index.js** like this:
```
import PushNotification from 'react-native-push-notification'

PushNotification.createChannel(
    {
      channelId: 'default', // (required)
      channelName: 'default', // (required)
      channelDescription: 'Default notifications channel', // (optional) default: undefined.
      soundName: 'default', // (optional) See soundName parameter of localNotification function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
)

PushNotification.configure(
    {
        onNotification: async(notification) => {
            console.log(JSON.stringify(notification, null, 2))
        }
    }
)

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

```


>change App.js like this:
```
import React from 'react'
import { AsyncStorage, View } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification'

export default class App extends React.Component {
    async startListeningMessage() {
        const isPermitted = await this.getPermissionSuccessState()

        if (isPermitted) {
            const token = await messaging().getToken()

            AsyncStorage.setItem('token', token)

            this.unsubcribeForegroundListener = messaging().onMessage(remoteMessage => {                    
                PushNotification.localNotification({
                    title: remoteMessage.notification?.title,
                    message: remoteMessage.notification?.body,
                    channelId: 'default',
                    playSound: true,
                    soundName: 'default',
                    importance: "high",
                    priority: 'high',
                    vibrate: true,
                    userInfo: remoteMessage.data,
                    group: "group",
                    groupSummary: true
                })          
            })
        }
    }    

    async getPermissionSuccessState() {
        let isPermitted = false 
        await messaging().hasPermission().then((hasPermission) => {
            isPermitted = hasPermission ? true : false
        })
        
        if (!isPermitted) {
            await messaging().requestPermission().then(() => isPermitted = true)
        }

        return isPermitted
    }
    componentDidMount() {
        this.startListeningMessage()
    }
    render() {
        return (
            <View/>
        )
    }
}
```
