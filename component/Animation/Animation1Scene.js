import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'

class Animation1Scene extends Component {

  state: {
    fadeAnim: Animated,
    currentAlpha:number,
  };

  constructor(props: Object) {
      super(props)
      this.state = {//设置初值
        currentAlpha: 1.0,//标志位，记录当前value
        fadeAnim: new Animated.Value(1.0)
      };
  }

  startAnimation(){
    this.state.currentAlpha = this.state.currentAlpha == 1.0?0.0:1.0;
    Animated.timing(
      this.state.fadeAnim,
      {toValue: this.state.currentAlpha}
    ).start();
  }
  render() {
    return (
      <View style={styles.container}>
      <Animated.Text style={{opacity: this.state.fadeAnim, //透明度动画
                            transform: [//transform动画
                              {
                                translateY: this.state.fadeAnim.interpolate({
                                                  inputRange: [0, 1],
                                                  outputRange: [60, 0] //线性插值，0对应60，0.6对应30，1对应0
                                                }),
                              },
                              {
                                scale:this.state.fadeAnim
                              },
                               ],
                          }}>
          Welcome to React Native!
      </Animated.Text>
      <TouchableOpacity onPress = {()=> this.startAnimation()} style={styles.button}>
          <Text>Start Animation</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center'
    },

    button: {
      marginTop: 30,
      backgroundColor: 'blue',
      width: 150,
      height: 60,
    }
  })

  export default Animation1Scene;
