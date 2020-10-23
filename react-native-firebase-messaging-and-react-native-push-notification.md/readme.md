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
In ``` android/app/build.gradle ```
```gradle
dependencies {
  ...
  implementation 'com.google.firebase:firebase-analytics:17.3.0'
  ...
}

apply plugin: 'com.google.gms.google-services'
```
Then put your ```google-services.json``` in ```android/app/```.

### Usage
>for sample usage you can follow [this example folder](./example)
