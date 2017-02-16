/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';
import User from 'stores/User';
import { styles, colors } from 'styles';
import { Actions } from 'react-native-router-flux';
import Button from 'components/Button';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      register: props.register,
    };
  }

  _handleLogin() {
    dismissKeyboard();
    User.login();
  }

  get submitButton() {
    const { register } = this.state;
    const label = register ? 'Register' : 'Login';

    return (
      <Button onPress={() => register ? User.register() : User.login()} title={label} />
    );
  }

  get navigationButton() {
    const { register } = this.state;
    const label = register ? 'Login' : 'Sign up';

    return (
      <Button
        onPress={
            () => register ? Actions.tabLogin() : Actions.tabRegister({ register: true })
        }
        title={label}
        transparent
      />
    );
  }

  render() {
    return (
      <View style={mainStyles.container}>
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
          <Image source={{ uri: 'bg_image' }} style={{ flex: 1 }}>
            <View style={{ marginHorizontal: 25, marginTop: 320 }}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="white"
                autoCapitalize="none"
                keyboardType="email-address"
                onEndEditing={() => this.password.focus()}
                onChange={e => (User._user.email = e.nativeEvent.text)}
                autoCorrect={false}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry
                ref={(c) => { this.password = c; }}
                onChange={e => (User._user.password = e.nativeEvent.text)}
              />
              {this.submitButton}
              {this.navigationButton}
            </View>
          </Image>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

Login.propTypes = {
  register: PropTypes.bool,
};

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#dfe3eb',
  },
  buttonLarge: {
    backgroundColor: colors.actionColor,
    paddingVertical: 16,
    paddingBottom: 16,
  },
});
