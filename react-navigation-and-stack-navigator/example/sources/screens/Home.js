```
import React, { Component } as React from 'react';
import { View, Text } from 'react-native'

export default class App extends Component {
  componentDidMount() {
    setTimeout(() => this.props.navigation.replace("Home"), 1500)        
  }
  return (
    <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Splashscreen
      </Text>
    </View>
  );
```
