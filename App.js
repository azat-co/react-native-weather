import React from 'react';
import { StyleSheet, 
  Text, 
  View,
  TextInput,
  FlatList
 } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {cityName: '', forecast: null}
    this.handleCityChange = this.handleCityChange.bind(this)
    this.search = this.search.bind(this)
  }
  handleCityChange(text) {
    this.setState({cityName: text})
  }
  search() {
    console.log(this.state.cityName)
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&mode=json&appid=6ea35fbcd51d5e917b7d8309292bc51c&units=imperial`,{
      method: 'GET'})
      .then(response=>response.json())
      .then(data=>{
        console.log(data)
        this.setState({forecast: data})
      })  
  }
  render() {
    let forecastItem = item=>{
      item = item.item
      console.log(item)
   return <Text>
      {item.dt_txt}-{item.main.temp}F-{item.weather[0].description}</Text>
    }
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

        {(this.state.forecast)?<FlatList
          data={this.state.forecast.list}
          renderItem={forecastItem}
        ></FlatList>:<Text/>}
        
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
