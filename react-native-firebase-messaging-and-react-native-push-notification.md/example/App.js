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
