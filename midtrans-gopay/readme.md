[Back to main page](../readme.md)

## Guide For

> #### Midtrans Go-Pay
> Implement transaction using Midtrans Go-Pay.

<details>
  <summary style = 'font-size: 20px; font-weight: bold;'>Usage</summary>

```
import React from 'react'
import { NativeModules, Platform, Text, TouchableOpacity, View } from 'react-native'

export default class extends React.Component {
    render() {
        return (
            <View
                style = {{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center'
                }}
            >
                <TouchableOpacity
                    onPress = {() => this.startGoPayTransaction()}
                    style = {{
                        backgroundColor: 'deepskyblue',
                        borderRadius: 5,
                        padding: 10
                    }}
                >
                    <Text
                        style = {{
                            color: 'white',
                            fontSize: 24,
                            fontWeight: 'bold'
                        }}
                    >
                        Start Midtrans Go-Pay Transaction
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    startGoPayTransaction() {
        const token = "YOUR_MIDTRANS_ORDER_TOKEN"

        const MyBridgingTest = NativeModules.MyBridgingTest

        if(Platform.OS == "android") {
            MyBridgingTest.StartGojekAppActivity(
                token,
                (error) => {
                    console.error(error)
                }, 
                (status) => {
                    alert(status)
                }
            )
        } else if(Platform.OS == "ios") {
            MyBridgingTest.StartGojekAppActivity(
                token,
                (error, status) => {
                    if (error) {
                        console.error(error)
                    } else {
                        alert(status)
                    }
                }
            )
        }
    }
}
```
</details>

<details>
    <summary style = 'font-size: 20px; font-weight: bold;'>Bridging</summary>

<details>
    <summary style = 'font-size: 18px; font-weight: bold;'>Android</summary>
    
- Add the dependency in **app/build.gradle**

```
dependencies {
    //previous existing dependencies, then...

    implementation 'com.midtrans:uikit:1.21.2' //add this
}
```

- Add repositories sources in **build.gradle**

```
allprojects {
    repositories {
        //previous existing repositories sources, then...

        maven { url "https://jitpack.io" } //add this if this not added yet
        maven { url "http://dl.bintray.com/pt-midtrans/maven" } //and add this
    }
}
```

- Register package in **MainApplication.java**

import first
```
import com.midtrans.sdk.corekit.callback.TransactionFinishedCallback;
import com.midtrans.sdk.corekit.models.snap.TransactionResult;
import com.midtrans.sdk.uikit.SdkUIFlowBuilder;
```

register the package

```packages.add(new MyBridgingTestPackage());```

then add this to onCreate function

```
SdkUIFlowBuilder.init()
.setClientKey("MIDTRANS_CLIENT_KEY") //client_key is mandatory
.setContext(this) // context is mandatory
.setTransactionFinishedCallback(new TransactionFinishedCallback() { //set transaction finish callback (sdk callback)
    @Override
    public void onTransactionFinished(TransactionResult transactionResult) {
    }
})
.setMerchantBaseUrl("https://app.midtrans.com/snap/v1/") //set merchant url (required)
.enableLog(true) //enable sdk log (optional)
/*.setColorTheme( //set theme. it will replace theme on snap theme on MAP ( optional)
    CustomColorTheme(
        "#FFE51255",
        "#B61548",
        "#FFE51255"
    )
)*/
.buildSDK();
```

Create your bridging package file, for example in **android/app/src/main/java/com/your/packagename/MyBridgingTestPackage.java**
like this

```
package com.your.packagename;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyBridgingTestPackage implements ReactPackage  {
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new MyBridgingTest(reactContext));

        return modules;
    }

}
```

Create your bridging handling file, for example in **android/app/src/main/java/com/your/packagename/MyBridgingTest.java**
you can copy the functional feature from this

```
package com.your.packagename;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.midtrans.sdk.corekit.callback.GetTransactionStatusCallback;
import com.midtrans.sdk.corekit.callback.TransactionCallback;
import com.midtrans.sdk.corekit.core.MidtransSDK;
import com.midtrans.sdk.corekit.models.TransactionResponse;
import com.midtrans.sdk.corekit.models.snap.TransactionStatusResponse;

public class MyBridgingTest extends ReactContextBaseJavaModule implements ActivityEventListener {
    Callback activityCallback;

    public MyBridgingTest(
        ReactApplicationContext reactContext
    ) {
        super(reactContext);

        reactContext.addActivityEventListener(this);
    }

    @ReactMethod
    public void StartGojekAppActivity(
        String token,
        Callback errorCallback,
        Callback successCallback
    ) {
        try {
            activityCallback = successCallback;

            MidtransSDK.getInstance().setAuthenticationToken(token);

            MidtransSDK.getInstance().paymentUsingGoPay(token, new TransactionCallback() {
                @Override
                public void onSuccess(TransactionResponse transactionResponse) {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(transactionResponse.getDeeplinkUrl()));
                    getReactApplicationContext().startActivityForResult(intent, 100, null);
                }

                @Override
                public void onFailure(TransactionResponse transactionResponse, String s) {

                }

                @Override
                public void onError(Throwable throwable) {

                }
            });

        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @Override
    public String getName() {
        return "MyBridgingTest";
    }


    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

        if(requestCode == 100) {

            String token = MidtransSDK.getInstance().readAuthenticationToken();

            MidtransSDK.getInstance().getTransactionStatus(token, new GetTransactionStatusCallback() {
                @Override
                public void onSuccess(TransactionStatusResponse transactionStatusResponse) {
                    activityCallback.invoke("Success");
                }

                @Override
                public void onFailure(TransactionStatusResponse transactionStatusResponse, String s) {
                    activityCallback.invoke("Failure");
                }

                @Override
                public void onError(Throwable throwable) {
                    activityCallback.invoke("Error");
                }
            });
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
```
</details>
</details>