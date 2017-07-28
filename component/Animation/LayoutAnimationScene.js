import React, { Component } from 'react';
import {
  Animated,
  LayoutAnimation,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'
import {screen} from '../common'

class LayoutAnimationScene extends Component {
  state: {
    marginBottom: number
  }

  constructor(props) {
    super(props)
    this.state = {
      marginBottom: 0
    }
  }

  textUp() {
    LayoutAnimation.spring()
    this.setState({marginBottom:this.state.marginBottom + 100})
  }

  render() {
    return (
      <View style = {styles.container}>
        <TouchableOpacity onPress = {()=>this.textUp()}
                      style={{  width:120,
                                height:40,
                                alignItems:'center',
                                marginBottom:this.state.marginBottom,
                                justifyContent:'center',
                                backgroundColor:'#00ffff',
                                borderRadius:20}}>
          <Text>Text UP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screen.width,
    height: screen.height,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default LayoutAnimationScene;
