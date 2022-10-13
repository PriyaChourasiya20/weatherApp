import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const WeatherInfo = ({city}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.boxwrapper}></View>
      <Text style={styles.text}>Current Weather</Text>
      <View style={styles.city}>
        <Text style={styles.cityname}>{city}</Text>
        <Icon name="down" size={24} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '40%',
    // width: deviceWidth,
    backgroundColor: 'yellow',
    padding: 10,
    margin: 10,
  },
  boxwrapper: {},
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
  },
  city: {
    flexDirection: 'row',
    margin: 5,
    display: 'flex',
  },
  cityname: {
    color: 'white',
    margin: 5,
    fontSize: 20,
  },
});
export default WeatherInfo;
