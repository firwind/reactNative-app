import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  Image
} from 'react-native'

const { height, windowWidth } = Dimensions.get('window')

class GearsIndicator extends Component {

  constructor(props) {
    super(props)
    this.state = {animating: false}
  }

  componentWillMount() {
    this._gearOneTranslate = new Animated.ValueXY()
    this._gearTwoTranslate = new Animated.ValueXY()
    this._gearThreeTranslate = new Animated.ValueXY()
    this._gearFourTranslate = new Animated.ValueXY()
    this._gearFiveTranslate = new Animated.ValueXY()

    this._gearThreeRotate = new Animated.Value(0)
  }

  triggerAnimation(cb) {
    this.setState({animating: true})

    Animated.parallel([
      Animated.timing(this._gearOneTranslate, {
       toValue: { x: 100, y: 100 },
       duration: 1000
     }),
     Animated.timing(this._gearTwoTranslate, {
       toValue: { x: 200, y: -100 },
       duration: 1000
     }),
     Animated.timing(this._gearFourTranslate, {
       toValue: { x: -300, y: 100 },
       duration: 1000
     }),
     Animated.timing(this._gearFiveTranslate, {
       toValue: { x: -100, y: -200 },
       duration: 1000
     }),
     Animated.timing(this._gearThreeRotate, {
       toValue: 200,
       duration: 3000
     })
    ]).start(cb)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshing && !this.state.animating) {
      return this.triggerAnimation(() => {
        this._gearOneTranslate.setValue({x: 0, y:0})
        this._gearTwoTranslate.setValue({x: 0, y:0})
        this._gearThreeTranslateY.setValue({x: 0, y:0})
        this._gearFourTranslate.setValue({x: 0, y:0})
        this._gearFiveTranslate.setValue({x: 0, y:0})
        this._gearThreeRotate.setValue(0)
        this.setState({ animating: false })
      })
    }
  }

  render() {
    let interpolateRotateClockwise = this.props.scrollY.interpolate({
      inputRange: [-200, 0],
      outputRange: ['0deg', '360deg']
    });

    let interpolateRotateAntiClockwise = this.props.scrollY.interpolate({
      inputRange: [-200, 0],
      outputRange: ['0deg', '-360deg']
    });

    const interpolatedGearThreeRotation = this._gearThreeRotate.interpolate({
      inputRange: [0,200],
      outputRange: ['0deg', '3000deg']
    })

    return (
      <View style = {styles.background}>
        <Animated.Image style = {[
            styles.gearOne,
            {
              transform: [
                {rotate: interpolateRotateAntiClockwise},
                {translateX: this._gearOneTranslate.x},
                {translateY: this._gearOneTranslate.y}
            ]}
          ]} source = {require('../img/prImg/GearOne.png')}></Animated.Image>

        <Animated.Image style = {[
            styles.gearTwo,
            {
              transform: [
                {rotate: interpolateRotateClockwise},
                {translateX: this._gearTwoTranslate.x},
                {translateY: this._gearTwoTranslate.y}
            ]}
          ]} source = {require('../img/prImg/GearTwo.png')}></Animated.Image>

        <Animated.Image style = {[
            styles.gearThree,
            {
              transform: [
                {rotate: this.state.animating ? interpolatedGearThreeRotation: interpolateRotateAntiClockwise},
                {translateX: this._gearThreeTranslate.x},
                {translateY: this._gearThreeTranslate.y}
            ]}
          ]} source = {require('../img/prImg/GearThree.png')}></Animated.Image>

        <Animated.Image style = {[
            styles.gearFour,
            {
              transform: [
                {rotate: interpolateRotateClockwise},
                {translateX: this._gearFourTranslate.x},
                {translateY: this._gearFourTranslate.y}
            ]}
          ]} source = {require('../img/prImg/GearFour.png')}></Animated.Image>

        <Animated.Image style = {[
            styles.gearFive,
            {
              transform: [
                {rotate: interpolateRotateAntiClockwise},
                {translateX: this._gearFiveTranslate.x},
                {translateY: this._gearFiveTranslate.y}
            ]}
          ]} source = {require('../img/prImg/GearFive.png')}></Animated.Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#24589A',
    height: 130,
    alignItems: 'center',
    overflow: 'hidden'
  },

  gearOne: {
    position: 'absolute',
    top: -35,
    left: 10
  },

  gearTwo: {
    position: 'absolute',
    bottom: -25,
    left: 60
  },

  gearThree: {
    marginTop: 45
  },

  gearFour: {
    position: 'absolute',
    top: -35,
    right: 80
  },
  gearFive: {
    position: 'absolute',
    bottom: -25,
    right: 30
  }
})

export default GearsIndicator;
