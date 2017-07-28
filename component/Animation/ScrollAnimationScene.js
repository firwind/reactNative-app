import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'
import {screen} from '../common'

class ScrollAnimationScene extends Component {
    state: {
      xOffset: Animated
    }

    constructor(props) {
      super(props)
      this.state = {
        xOffset: new Animated.Value(1.0)
      }
    }

    render() {
      return (
        <View style = {styles.container}>
          <ScrollView horizontal = {true}   // 水平滚动
                      showsHorizontalScrollIndicator = {false}
                      style = {{width: screen.width, height: screen.height}}
                      onScroll = {Animated.event([
                        {nativeEvent: {contentOffset: {x: this.state.xOffset}}}
                      ])}
                      scrollEventThrottle = {100}   // onScroll回调间隔
                      pagingEnabled = {true}
            >
              <Animated.View style = {{backgroundColor: 'red',
                              width: screen.width,
                              height: screen.height,
                              opacity:this.state.xOffset.interpolate({//映射到0.0,1.0之间
                                                  inputRange: [0,screen.width],
                                                  outputRange: [1.0, 0.0]
                                                })}}></Animated.View>

             <Animated.View style = {{backgroundColor: 'blue',
                              width: screen.width,
                              height: screen.height,
                              opacity:this.state.xOffset.interpolate({//映射到0.0,1.0之间
                                                  inputRange: [0, screen.width, screen.width * 2],
                                                  outputRange: [0, 1, 0]
                                                })}}></Animated.View>

             <Animated.View style = {{backgroundColor: 'green',
                              width: screen.width,
                              height: screen.height,
                              opacity:this.state.xOffset.interpolate({//映射到0.0,1.0之间
                                                  inputRange: [screen.width, screen.width * 2],
                                                  outputRange: [0, 1.0]
                                                })}}></Animated.View>

          </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ScrollAnimationScene;
