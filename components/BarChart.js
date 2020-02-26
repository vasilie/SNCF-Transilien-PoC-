import React, { PureComponent } from 'react'
import { Svg, G, Line, Rect, Text, Path } from 'react-native-svg'
import * as d3 from 'd3'
import {StyleSheet, Platform,  Animated, Easing, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import Androw from 'react-native-androw';
const GRAPH_MARGIN = 20
const GRAPH_BAR_WIDTH = 9
const colors = {
  axis: '#E4E4E4',
  bars: '#15AD13'
}
const AnimatedBar = Animated.createAnimatedComponent(Rect);
const AnimatedAndrow = Animated.createAnimatedComponent(Androw);
const AnimationNeomorphBox = Animated.createAnimatedComponent(NeomorphBox);
function elevationShadowStyle(elevation) {
    return {
      elevation,
      shadowColor: 'red',
      shadowOffset: { width: 0, height: 0},
      shadowOpacity: 0.75,
      shadowRadius: 0.8 * elevation
    };
  }
export default class BarChart extends PureComponent {
    
    state = {
        animValue: new Animated.Value(1),
        data: this.props.data
    }
    componentDidMount(){
        this.animate(this.props.value);
    }
    createData = () => {
        this.setState({
            data: [
                { label: '2014', value: Math.floor(Math.random() * 235) },
                { label: '2015', value: Math.floor(Math.random() * 235) },
                { label: '2016', value: Math.floor(Math.random() * 235) },
                { label: '2017', value: Math.floor(Math.random() * 235) },
                { label: '2018', value: Math.floor(Math.random() * 235) },
            ]
        });

        console.log(this.state.data);
    }
    animate = value => {
          this.createData();
          this.forceUpdate();
          this.state.animValue.setValue(1);
          Animated.timing(this.state.animValue,
            {
                useNativeDriver: true,
                duration: 750,
                easing: Easing.inOut(Easing.quad),
                toValue: value,
                loop: true
              }).start();
    }
  render() {
    // Dimensions
    const SVGHeight = 300
    const SVGWidth = 300
    const graphHeight = SVGHeight - 2 * GRAPH_MARGIN
    const graphWidth = SVGWidth - 2 * GRAPH_MARGIN
    let data = this.state.data;
    
    // X scale point
    const xDomain = data.map(item => item.label)
    const xRange = [0, graphWidth]
    const x = d3.scalePoint()
      .domain(xDomain)
      .range(xRange)
      .padding(1)

    // Y scale linear
    const maxValue = 235
    const topValue = Math.ceil(maxValue / this.props.round) * this.props.round
    const yDomain = [0, topValue]
    const yRange = [0, graphHeight]
    const y = d3.scaleLinear()
      .domain(yDomain)
      .range(yRange)

    // top axis and middle axis
    const middleValue = topValue / 2
    const { animValue } = this.state;

    return (
        <View>
        <Animated.View
            style={{

                marginTop: '30%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                // position: 'absolute',
                alignSelf: 'center',
                borderRadius: 10,
                width: "87%",
                display: 'flex',
                ...styles.barChart
            }}
        >   
          
            <Svg width={'100%'} height={SVGHeight} style={styles.svg} style={{top: 0, position:'absolute'}}viewBox={'0 0 320 200'} >
                <G y={graphHeight + GRAPH_MARGIN}>
                {/* Top value label */}
                <Rect
                    key={this.state.data}
                    x={0}
                    y={-310}
                    rx={10}
                    width={320}
                    height={113}
                    fill={'#212121aa'}
                />
                <Line
                    x1={73}
                    y1={-278}
                    x2={73}
                    y2={-228}
                    stroke={colors.axis}
                    strokeDasharray={[3, 3]}
                    strokeWidth="1"
                />
                <Line
                    x1={131}
                    y1={-278}
                    x2={131}
                    y2={-228}
                    stroke={colors.axis}
                    strokeDasharray={[3, 3]}
                    strokeWidth="1"
                />
                <Line
                    x1={189}
                    y1={-278}
                    x2={189}
                    y2={-228}
                    stroke={colors.axis}
                    strokeDasharray={[3, 3]}
                    strokeWidth="1"
                />
                <Line
                    x1={247}
                    y1={-278}
                    x2={247}
                    y2={-228}
                    stroke={colors.axis}
                    strokeDasharray={[3, 3]}
                    strokeWidth="1"
                />
                {/* middle axis */}
                <Line
                    x1={-20}
                    y1={0}
                    x2={60}
                    y2={400}
                    stroke={colors.axis}
                    strokeDasharray={[3, 3]}
                    strokeWidth="0.5"
                />

                {/* bottom axis */}
                <Line
                    x1="0"
                    y1="2"
                    x2={graphWidth}
                    y2="2"
                    stroke={colors.axis}
                    strokeWidth="0.5"
                />
                {/* bars */}
                {data.map((item, index) => (
                    <Rect
                        key={'ba2r' + item.label}
                        x={x(item.label) - (GRAPH_BAR_WIDTH / 2)-2 +15 *index}
                        y={y(maxValue) * -1 - 77}
                        rx={5.5}
                        width={GRAPH_BAR_WIDTH+4}
                        height={56}
                        fill={'#696b70'}
                    />
                ))}
                {/* labels */}
                {data.map((item, index) => (
                    <Text
                    key={'label' + item.label}
                    fontSize="8"
                    x={x(item.label) - (GRAPH_BAR_WIDTH / 2) + 5+14.7 *index}
                    y={-133 -80}
                    fill={'white'}
                    textAnchor="middle">{item.label}</Text>
                ))}
                {data.map((item, index) => (
                    <Text
                        key={'label' + item.label}
                        fontSize="8"
                        x={x(item.label) - (GRAPH_BAR_WIDTH / 2) + 5+14.7 *index}
                        y={-215 -72}
                        fill={'white'}
                        textAnchor="middle">{(item.value / 235 * 100).toFixed(1) + '%'}
                    </Text>
                ))}
                </G>
            </Svg>
           {Platform.OS === 'android' ? (
                    <View
                        style={{
                            //  shadowOpacity: 0.75,
                            //  shadowRadius: 5,
                            //  shadowColor: '#ffa6e4',
                            //  shadowOffset: { height: 0, width: 0 },
                             position: 'absolute',
                            //  shadowOpacity: 1,
                            //  shadowRadius: 4,
                             width: '100%',
                             top: 0,
                            // backgroundColor: 'red',
                        }}
                    > 
                        <Svg width={"100%"} height={SVGHeight}  viewBox={'0 0 320 200'} fill={'red'} >
                             {data.map((item, index) => (
                                <AnimatedBar
                                     key={'bar1221' + item.label}
                                     x={x(item.label) - (GRAPH_BAR_WIDTH / 2) +15 *index}
                                     y={Animated.add(Animated.multiply(animValue, -item.value * 0.0104), 53)}
                                     rx={3.7}
                                     width={GRAPH_BAR_WIDTH  }
                                     height={ Animated.multiply(animValue, item.value* 0.0104)}
                                     fill={'white'}
                                />
                            ))}
                        </Svg>
                    </View>
                
                ) : <View
                        style={{
                            shadowOpacity: 1,
                            shadowRadius: 5,
                            shadowColor: '#ffa6e4',
                            shadowOffset: { height: 0, width: 0 },
                            position: 'absolute',
                            shadowOpacity: 1,
                            shadowRadius: 4,
                            width: '100%',
                            top: 0,
                        }}
                    > 
                        <Svg width={"100%"} height={SVGHeight}  viewBox={'0 0 320 200'} fill={'red'} >
                            {data.map((item, index) => (
                                <AnimatedBar 
                                    key={'bar1221' + item.label}
                                    x={x(item.label) - (GRAPH_BAR_WIDTH / 2) +15 *index}
                                    y={Animated.add(Animated.multiply(animValue, -item.value * 0.0104), 53)}
                                    rx={3.7}
                                    width={GRAPH_BAR_WIDTH  }
                                    height={ Animated.multiply(animValue, item.value* 0.0104)}
                                    fill={'white'}
                                />
                            ))}
                        </Svg>
                    </View>
            }   
            
            <View
                style={{
                    shadowOpacity: 0.75,
                    shadowRadius: 5,
                    shadowColor: '#ffa6e4',
                    shadowOffset: { height: 0, width: 0 },
                    position: 'absolute',
                    shadowOpacity: 1,
                    shadowRadius: 4,
                    width: '100%',
                    top: 0,
                }}
            > 
                <Svg width={"100%"} height={SVGHeight}  viewBox={'0 0 320 200'} fill={'red'} >
                    {data.map((item, index) => (
                        <AnimatedBar
                            key={'bar1221' + item.label}
                            x={x(item.label) - (GRAPH_BAR_WIDTH / 2) +15 *index}
                            y={Animated.add(Animated.multiply(animValue, -item.value * 0.0104), 53)}
                            rx={3.7}
                            width={GRAPH_BAR_WIDTH  }
                            height={ Animated.multiply(animValue, item.value* 0.0104)}
                            fill={'white'}
                        />
                    ))}
                </Svg>
            </View>
        

            <View style={{marginTop:200, width: 100, height: 200}} >
                <Button title={'restart'}  color={'white'} onPress={()=>this.animate(this.props.value)}></Button>
            </View>
        </Animated.View>
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
        position: 'absolute',
        shadowOpacity: 1,
        shadowRadius: 4,
        width: '100%',
        top: 0,
    }
  })