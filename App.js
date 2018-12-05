/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import AppCenter, {CustomProperties} from 'appcenter';
import Crashes from "appcenter-crashes";
import Analytics from "appcenter-analytics";
import Push from 'appcenter-push';
import {Platform, StyleSheet, Text, View, Button, AppState, Alert,} from 'react-native';

Analytics.trackEvent("Event1", { Category: "Music", FileName: "favorite.avi" });
async function ClickBtn() {
    const installId = await AppCenter.getInstallId();
    alert(installId);
}

function ChangeDisable() {
   // try
   // {
	   // var i=1/0;
   // }
   // catch(err)
   // {
	   // Crashes.TrackError(err);
   // }
     throw new Error("This is a test javascript crash!");
    //Crashes.create();
}
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
         <Button
                onPress={ClickBtn}
                title="Learn More"
                color="green"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={ChangeDisable}
                title="change"
                color="gray"
                accessibilityLabel="Learn more about this purple button"
            />
      </View>
    );
  }
}
  Push.setListener({
    onPushNotificationReceived: function (pushNotification) {
      let message = pushNotification.message;
      let title = pushNotification.title;

      if (message === null) {
        // Android messages received in the background don't include a message. On Android, that fact can be used to
        // check if the message was received in the background or foreground. For iOS the message is always present.
        title = 'Android background';
        message = '<empty>';
      }

      // Custom name/value pairs set in the App Center web portal are in customProperties
      if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
        message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
      }

      if (AppState.currentState === 'active') {
        Alert.alert(title, message);
      }
      else {
        // Sometimes the push callback is received shortly before the app is fully active in the foreground.
        // In this case you'll want to save off the notification info and wait until the app is fully shown
        // in the foreground before displaying any UI. You could use AppState.addEventListener to be notified
        // when the app is fully in the foreground.
      }
    }
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
