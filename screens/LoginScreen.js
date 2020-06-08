import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from "@expo/vector-icons"

export default class LoginScreen extends Component {
state = {
  name: ""
}

continue = () => {
  this.props.navigation.navigate("Chat", {name: this.state.name})
}

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> LoginScreen </Text>
        <View>
          <Text>Username</Text>
          <TextInput 
          placeholder='enter username'
          onChangeText={name => {
            this.setState({name})
          }}
          value={this.state.name}
          />

        </View>
        <View>
          <TouchableOpacity onPress={this.continue}>
            <Ionicons name="md-arrow-round-forward" size={24} color="purple"/>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}
