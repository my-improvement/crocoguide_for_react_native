[Back to main page](../readme.md)
[Back to previous page](./readme.md)

## Guide For

> #### React-Native-Image-Picker
## Install

```
npm install react-native-image-picker
```
⚠️ If you need to support React Native < 0.40, you must install this package: `react-native-image-picker@0.24`.

## Post-install Steps

### iOS

For iOS 10+:

Add the `NSPhotoLibraryUsageDescription`, `NSCameraUsageDescription`, `NSPhotoLibraryAddUsageDescription` and `NSMicrophoneUsageDescription` (if allowing video) keys to your `Info.plist` with strings describing why your app needs these permissions.

**Note: You will get a SIGABRT crash if you don't complete this step**

```xml
<plist version="1.0">
  <dict>
    ...
    <key>NSPhotoLibraryUsageDescription</key>
    <string>$(PRODUCT_NAME) would like access to your photo gallery</string>
    <key>NSCameraUsageDescription</key>
    <string>$(PRODUCT_NAME) would like to use your camera</string>
    <key>NSPhotoLibraryAddUsageDescription</key>
    <string>$(PRODUCT_NAME) would like to save photos to your photo gallery</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>$(PRODUCT_NAME) would like to use your microphone (for videos)</string>
  </dict>
</plist>
```

⚠️ If you are planning on submitting your application to app store:

To be compliant with Guideline 5.1.1 - Legal - Privacy - Data Collection and Storage, the permission request alert should specify how your app will use this feature to help users understand why your app is requesting access to their personal data.

```
$(PRODUCT_NAME) would like access to your photo gallery to change your profile picture
```


### Android

Add the required permissions in `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

### Android (Optional)

If you've defined _[project-wide properties](https://developer.android.com/studio/build/gradle-tips.html)_ (**recommended**) in your root `build.gradle`, this library will detect the presence of the following properties:

```groovy
buildscript {...}
allprojects {...}

/**
  + Project-wide Gradle configuration properties
  */
ext {
    compileSdkVersion   = 27
    targetSdkVersion    = 27
    buildToolsVersion   = "27.0.3"
}
```

Customization settings of dialog `android/app/res/values/themes.xml` (`android/app/res/values/style.xml` is a valid path as well):

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="DefaultExplainingPermissionsTheme" parent="Theme.AppCompat.Light.Dialog.Alert">
        <!-- Used for the buttons -->
        <item name="colorAccent">@color/your_color</item>

        <!-- Used for the title and text -->
        <item name="android:textColorPrimary">@color/your_color</item>

        <!-- Used for the background -->
        <item name="android:background">@color/your_color</item>
    </style>
</resources>
```
