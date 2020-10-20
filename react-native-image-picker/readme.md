[Back to main page](../readme.md)

## Guide For

> #### React-Native-Image-Picker
> Pick images from camera or gallery.


## Getting Started

```
yarn add react-native-image-picker
or
npm install react-native-image-picker

# RN >= 0.60
npx pod-install

# RN < 0.60
react-native link react-native-image-picker
```
You will also need to add `UsageDescription` on iOS and some permissions on Android, refer to the [Install doc](./install.md).

## Usage

```javascript
import ImagePicker from 'react-native-image-picker';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */
ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };

    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source,
    });
  }
});
```

Then later, if you want to display this image in your render() method:

```javascript
<Image source={this.state.avatarSource} style={styles.uploadAvatar} />
```

### Directly Launching the Camera or Image Library

To Launch the Camera or Image Library directly (skipping the alert dialog) you can
do the following:

```javascript
// Launch Camera:
ImagePicker.launchCamera(options, (response) => {
  // Same code as in above section!
});

// Open Image Library:
ImagePicker.launchImageLibrary(options, (response) => {
  // Same code as in above section!
});
```
