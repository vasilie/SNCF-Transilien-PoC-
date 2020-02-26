import React, { Component } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, ImageBackground, Image } from 'react-native'
import { Animated, Easing } from 'react-native';

import BarChart from './BarChart'
import BarChartAndroid from './BarChartAndroid'
const AnimatedBar = Animated.createAnimatedComponent(BarChart);

export default class CustomCharts extends Component<Props> {
    constructor(props){
        super(props);

    }
  
    animate = () => {
        Animated.timing(
            this.state.animValue,
            {
                toValue: 2,
                duration: 500,
                easing: Easing.inOut(Easing.quad),
                loop: true
            }
        ).start(()=>{
            // setInterval(()=>{console.log(this.state.animValue)}, 100)
        });
    }
    render() {
    const data = [
      { label: '2014', value: 235 },
      { label: '2015', value: Math.floor(Math.random() * 235) },
      { label: '2016', value: Math.floor(Math.random() * 235) },
      { label: '2017', value: Math.floor(Math.random() * 235) },
      { label: '2018', value: Math.floor(Math.random() * 235) },

    ]
    return (
            <View >
                <BarChart style={styles.barChart} data={data} value={21} round={100} unit="€"/>
                <BarChartAndroid />

            </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'tp[',
    alignItems: 'center',
    // backgroundColor: "#333333",
  },
  backgoundImage: {
      position: "absolute",
      width:"100%"

  },

})