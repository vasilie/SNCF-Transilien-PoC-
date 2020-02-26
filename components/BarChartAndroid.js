import React, { Component } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, ImageBackground, Image } from 'react-native';
import { Svg, G, Line, Rect, Text, Path } from 'react-native-svg';
import { Button } from 'react-native-elements';
import { Animated, Easing } from 'react-native';
import Androw from 'react-native-androw';
import BarChart from './BarChart'
const AnimatedBar = Animated.createAnimatedComponent(BarChart);
import { NeomorphBox } from 'react-native-neomorph-shadows';

function elevationShadowStyle(elevation) {
    return {
      elevation,
      shadowColor: '#ff0000',
      shadowOffset: { width: 20, height: 0},
      shadowOpacity: 22,
      shadowRadius: 0.8 * elevation
    };
  }

function getInitialState() {
    const anim = new Animated.Value(0);
    const path = anim.interpolate({
        inputRange: [0, 1],
        outputRange: ['M20,20L20,80L80,80L80,20Z', 'M40,40L33,60L60,60L65,40Z'],
      });
    const strokeDashOffset = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [700, 120],
      });
    return { anim, path, strokeDashOffset};
 }



const AnimatedPath = Animated.createAnimatedComponent(Path);
export default class CustomCharts extends Component<Props> {
    state = getInitialState();
    componentDidMount() {
        const { anim } = this.state;
        Animated.timing(anim, {
          toValue: 1,
          duration: 1350,
          useNativeDriver: true,
        }).start();
    }
    animate = value => {
        this.forceUpdate();
        this.state.anim.setValue(0);
        Animated.timing(this.state.anim,
          {
              useNativeDriver: true,
              duration: 1350,
              easing: Easing.inOut(Easing.quad),
              toValue: value,
              loop: true
    }).start();
  }
    render() {
        const {path, anim, strokeDashOffset} = this.state;
        return (
            <View
                style={{
                    shadowOpacity: 1,
                    shadowRadius: 5,
                    shadowColor: '#ffa6e4',
                    shadowOffset: { height: 0, width: 0 },
                    position: 'absolute',
                    shadowOpacity: 1,
                    shadowRadius: 4,
                    width: '100%',
                    top: 220,
                }}
            > 
                <Svg height="210" width="400" key={'sfa'}>
                    {/* <Path d="M150 0 L75 200 L225 200 Z" /> */}
                    <AnimatedPath fill="none" stroke='white' strokeLinecap="round" strokeWidth={7} strokeDashoffset={strokeDashOffset} strokeDasharray="700" d={'M 50, 50 m -37.5, 0 a 37.5,37.5 0 1,0 75,0 a 37.5,37.5 0 1,0 -75,0'}/>
                </Svg>
                <View style={{marginTop:10, width: 100, height: 200}} >
                  <Button title={'restart'}  color={'white'} onPress={()=>this.animate(this.props.value)}></Button>
                  </View>
            </View>
        )


    }

}
const styles = StyleSheet.create({
    svg: {
        // flex:1,
    },
    barChart: {
        flex:1,
        flexDirection:'column',
        justifyContent: 'space-between',
        height: '20%'
    },
    shadow: {
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: '#ffa6e4',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
        width: '100%',
        top: 0,
    },
    box: {
        width: 10,
        height: 10,
        backgroundColor: 'red',
        elevation: 2,
        ...elevationShadowStyle(22)
    }
  })