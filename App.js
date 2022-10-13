import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SearchCity from './src/components/searchCity.js';

const App = () => {
  return (
    <View>
      <SearchCity />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;