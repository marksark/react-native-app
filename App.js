/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  TextInput,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const jsonData = require('./database/database.json');

const convertData = (data = jsonData) => {
  const arr = [];
  for (const key in jsonData) {
    const obj = jsonData[key];
    arr.push({
      ...obj,
      key: key.toLowerCase(),
    });
  }
  return arr;
};

const allData = convertData();

const ItemSeparatorView = () => {
  return (
    <View style={{padding: 0.5, width: '100%', backgroundColor: '#c8c8c8'}} />
  );
};

// use native IOS one since we only care about IOS for this demo...
// const cancelButton = () => {
//   return <Text>X</Text>;
// };

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(allData);

  // when search term changes, update list
  useEffect(() => {
    // run filter
    if (searchTerm) {
      setFilteredData(
        allData.filter(data => {
          return data.text.toLowerCase().includes(searchTerm.toLowerCase());
        }),
      );
    } else {
      setFilteredData(allData);
    }
  }, [searchTerm]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginTop: 40,
        }}>
        <TextInput
          style={styles.textInputStyles}
          value={searchTerm}
          autoFocus={true}
          clearButtonMode="always"
          placeholder="Search"
          onChangeText={setSearchTerm}
        />
        <FlatList
          data={filteredData}
          ItemSeparatorComponent={ItemSeparatorView}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <Text
              style={{
                fontSize: 16,
                borderBottomWidth: 15,
                // borderWidth: 0.5,
                borderBottomColor: 'black',
                marginTop: 10,
              }}>
              {item.text}
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
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
  textInputStyles: {
    height: 30,
    borderWidth: 0.7,
    paddingLeft: 10,
    margin: 0,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
});

export default App;
