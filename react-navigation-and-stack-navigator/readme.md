[Back to main page](../readme.md)

## Guide For

> #### React-Navigation And Stack Navigator
> Set up core navigation and create basic app navigation with stack navigator.

### Installation
```
npm install @react-navigation/native
```

#### Installing dependencies into a bare React Native project
```
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```
If you're on a Mac and developing for iOS, you need to install the pods (via Cocoapods) to complete the linking.
```
npx pod-install ios
```

#### Installing Stack Navigator
```
npm install @react-navigation/stack
```

#### To finalize installation of react-native-gesture-handler, add the following at the top (make sure it's at the top and there's nothing else before it) of your entry file, such as index.js or App.js:
```
import 'react-native-gesture-handler';
```

#### Usage
```
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
```
