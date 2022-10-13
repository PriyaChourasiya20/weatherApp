import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
} from 'react-native';
import WeatherInfo from './weatherInfo.js';
import Icon from 'react-native-vector-icons/AntDesign';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const places = 'AIzaSyAe0Smi4vjCN8FEvU8VDYRmtjFFM8FUPhg';

const controller = new AbortController();
const signal = controller.signal;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const SearchCity = () => {
  const [city, setCity] = useState('');
  const [lat, setLat] = useState(43.6532);
  const [long, setLong] = useState(-79.3832);
  const [weather, setWeather] = useState({});

  API_KEY = '9ae2447983447457a57564703f4382ac';
  const fetchLatLongHandler = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`,
    )
      .then(res => res.json())
      .then(data => {
        setLat(data.coord.lat);
        setLong(data.coord.lon);
      });
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`,
      {signal},
    )
      .then(res => res.json())
      .then(data => {
        console.log(setWeather(data));
      })
      .catch(err => {
        console.log('error', err);
      });
    return () => controller.abort();
  }, [lat, long]);

  return (
    <SafeAreaView style={styles.container}>
      <WeatherInfo city={city} />
      <View style={styles.searchBoxView}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search City"
          onChangeText={newText => setCity(newText)}
          defaultValue={city}
        />

        <TouchableOpacity
          style={styles.searchIcon}
          onPress={fetchLatLongHandler}>
          <Icon name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* <GooglePlacesAutocomplete
        placeholder="Type a place"
        query={{
          key: places,
          language: 'en',
        }}
        fetchDetails={true}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
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
