[Back to main page](../readme.md)

## Guide For

> #### React-Native-Firebase Messaging + React-Native-Push-Notification
> Retrieve messages and display notifications.

### Installation
```
# Install & setup the app module
npm i @react-native-firebase/app --save-exact

# Install the messaging module
npm i @react-native-firebase/messaging --save-exact

# Install push notification
npm i react-native-push-notification --save-exact
```

If you're on a Mac and developing for iOS, you need to install the pods (via Cocoapods) to complete the linking.
```
npx pod-install ios
```

### If you use remote notifications
Make sure you have installed setup Firebase correctly.
In ``` android/build.gradle ```
```gradle
buildscript {
    ...
    dependencies {
        ...
        classpath('com.google.gms:google-services:4.3.3')
        ...
    }
}
```
In the bottom of ``` android/app/build.gradle ``` add
```
apply plugin: 'com.google.gms.google-services'
```
Then put your ```google-services.json``` in ```android/app/```.

### Usage
>for sample usage you can follow [this example folder](./example)
