import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const WeatherInfo = ({cityName, currentTemp, currentWeather, dailyData}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.boxwrapper}>
        <View>
          <Text style={styles.text}>Current Weather</Text>
          <View style={styles.city}>
            <Text numberOfLines={1} style={styles.cityname}>
              {cityName ? cityName : 'Noida, Uttar Pradesh'}
            </Text>
            <Icon name="down" size={20} color="white" />
          </View>
        </View>
        <View style={styles.tempWrapper}>
          <Text style={styles.tempText}>{currentTemp}°</Text>
          <View style={{marginLeft: 10}}>
            {currentWeather == 'Clouds' || currentWeather == 'Rain' ? (
              <Fontisto name="cloudy" size={30} color="white" />
            ) : (
              <Ionicons name="sunny" size={30} color="white" />
            )}

            <Text style={{color: '#fff'}}>{currentWeather}</Text>
          </View>
        </View>
        <View style={styles.dateWrapper}>
          <View style={styles.dateText}>
            <Text style={styles.date}>{moment(new Date()).format('DD')}</Text>
            <Ionicons name="calendar" size={20} color="blue" />
          </View>
          <Text style={styles.dayWrapper}>
            {moment(new Date()).format('ddd, YYYY')}
          </Text>
        </View>
      </View>
      <View style={styles.weekTemp}>
        {dailyData &&
          dailyData?.map((res, index) => {
            return (
              <View key={index}>
                {res?.weather[0]?.main == 'Clouds' ||
                res?.weather[0]?.main == 'Rain' ? (
                  <Fontisto name="cloudy" size={30} color="white" />
                ) : (
                  <Ionicons name="sunny" size={30} color="white" />
                )}
                <Text style={{color: '#fff'}}>{res?.weather[0]?.main}</Text>
              </View>
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '30%',
    backgroundColor: '#00ff99',
    paddingTop: 20,
    padding: 5,
  },
  boxwrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
  },
  tempWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  weekTemp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    marginTop: 30,
  },
  dayWrapper: {
    color: 'black',
    fontWeight: '400',
    fontSize: 15,
  },
  dateText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    color: 'green',
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 20,
  },
  city: {
    flexDirection: 'row',
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateWrapper: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  cityname: {
    color: 'white',
    margin: 5,
    fontSize: 15,
    width: 150,
  },
});
export default WeatherInfo;
