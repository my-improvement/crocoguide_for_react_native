[Back to main page](../readme.md)

## Guide For

> #### React Native Web View
>Displaying a web view in the react native app

### Installation
```
npm i react-native-webview
```

### Usage
Import the WebView component from react-native-webview and use it like so:
```
import React from 'react'
import { Text, View } from 'react-native'
import { WebView } from 'react-native-webview'

export default class MyWebComponent extends Component {
  render() {
    return <WebView source={{ uri: 'https://reactnative.dev/' }} />
  }
}
```
