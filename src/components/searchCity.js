import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import WeatherInfo from './weatherInfo.js';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const SearchCity = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [location, setLocation] = useState({
    lat: 28.4599567,
    lng: 77.5048482,
  });
  const [showapiErr, setShowApiErr] = useState(false);
  API_KEY = '9ae2447983447457a57564703f4382ac';

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location?.lat}&lon=${location?.lng}&units=metric&appid=9ae2447983447457a57564703f4382ac&exclude=current,minutely,hourly,alerts`,
    )
      .then(res => res.json())
      .then(data => {
        setWeather(data);
      })
      .catch(err => {
        console.log('error', err);
      });
  }, [location]);

  return (
    <SafeAreaView style={styles.container}>
      {weather?.cod == '400' && showapiErr ? (
        <Text style={{color: 'red'}}>weather api is not working</Text>
      ) : null}
      <WeatherInfo
        cityName={city?.data?.description || ''}
        currentTemp={(weather?.daily && weather?.daily[0]?.temp?.day) || ''}
        currentWeather={
          (weather?.daily && weather?.daily[0]?.weather[0]?.main) || ''
        }
        dailyData={weather?.daily?.slice(0, 4) || []}
      />
      <GooglePlacesAutocomplete
        placeholder="Search City"
        onPress={(data, details = null) => {
          setCity({data, details});
          city?.details?.geometry?.location &&
            setLocation(city?.details?.geometry?.location);
          setShowApiErr(true);
        }}
        textInputProps={{
          placeholderTextColor: 'grey',
        }}
        suppressDefaultStyles
        styles={{
          textInputContainer: {
            backgroundColor: '#fff',
            borderWidth: 3,
            borderColor: '#3399ff',
            color: 'black',
            borderRadius: 5,
            margin: 10,
            width: '80%',
          },
          textInput: {
            backgroundColor: '#ffff',
            paddingLeft: 10,
            height: 50,
            borderRadius: 5,
            fontSize: 15,
            color: 'black',
          },
        }}
        fetchDetails
        query={{
          key: 'AIzaSyClbU7bq9Dv3bHNkSmtXKT-Q8bXdcYWoIM',
          language: 'en',
          components: 'country:in',
        }}
        renderDescription={data => data.description || data.vicinity}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: 'grey',
  },
  searchBoxView: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchBox: {
    height: '100%',
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    color: 'black',
    marginTop: 30,
    padding: 5,
  },
  searchIcon: {
    marginLeft: '5%',
    height: 50,
    width: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SearchCity;
