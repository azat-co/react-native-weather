import React from 'react';
import { StyleSheet, 
  Text, 
  View,
  TextInput
 } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {cityName: ''}
    this.handleCityChange = this.handleCityChange.bind(this)
    this.search = this.search.bind(this)
  }
  handleCityChange(text) {
    this.setState({cityName: text})
  }
  search() {
    console.log(this.state.cityName)
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&mode=json&appid=6ea35fbcd51d5e917b7d8309292bc51c`,{
      method: 'GET'})
      .then(response=>response.json())
      .then(data=>{
        console.log(data)
      })  
  }
  render() {
    return (
      <View style={styles.container}>
      <Text>Enter your city for the weather forecast</Text>
        <TextInput
          style={styles.citySearchStyle}
          placeholder="San Francisco"
          onChangeText={this.handleCityChange}
          onEndEditing={this.search}
          value={this.state.cityName}
          returnKeyType="search">
        </TextInput>

        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  citySearchStyle: {
    borderColor: '#8E8E93',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    height: 40,
    marginLeft:60,
    marginRight: 60,
    padding: 8
  }
});
