import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, SafeAreaView, ImageBackground, Image } 
from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import CustomCharts from './components/CustomCharts';

const Stack = createStackNavigator();

export default function App(){
  return (
    <ImageBackground
      style={{ width: '100%', height: '100%',  resizeMode: 'contain', display: 'flex', }}
      source={require('./assets/img/Fond2.jpg' )}
    >
      <Image
          style={{ width: '100%', position: 'absolute', top:0, left: 0, }}
          source={require('./assets/img/topOpacity.png' )}
      />
      <Image
          style={{ width: '100%',  resizeMode: 'contain', position: 'absolute', top: 0,  left: 0}}
          source={require('./assets/img/Logo2.png' )}
      />
      <Image
          style={{ width: '100%',  position: 'absolute', bottom: 0,  left: 0}}
          source={require('./assets/img/bottom.png' )}
      />
      <SafeAreaView style={styles.container}>
        <CustomCharts></CustomCharts>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});