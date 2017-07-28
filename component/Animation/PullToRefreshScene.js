import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  ListView,
  View,
  Text,
  ScrollView
} from 'react-native'
import {screen} from '../common'
import GearIndicator from './GearsIndicator'

const MIN_PULLDOWN_DISTANCE = -140;
class PullToRefreshScene extends Component {
  
  constructor(props) {
    super(props)
    const rows = (new Array(10)).map((index, i) => `Item No.${i}`)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows(["1","1","1","1","1","1","1","1","1","1"]),
      refreshing: false,
      readyToRefresh: false,
      scrollY: new Animated.Value(0)
    }
  }

  componentDidMount() {
    this.state.scrollY.addListener((value) => this.handleScroll(value))
  }

  componentWillUnMount() {
    this.state.scrollY.removeAllListeners()
  }

  handleRealease() {
    if (this.state.readyToRefresh) {
      this.refs.PTRListView.scrollTo({y: -130})
      this.setState({ refreshing: true })

      setTimeout(() => {
        this.refs.PTRListView.scrollTo({y: 0})
        this.setState({ refreshing: false })
      }, 2000)
    }
    return this.setState({ readyToRefresh: false })
  }

  handleScroll(pullDownDistance) {
    if (pullDownDistance.value <= MIN_PULLDOWN_DISTANCE) {
      return this.setState({ readyToRefresh: true })
    }
  }

  render() {

    const event = Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: this.state.scrollY
          }
        }
      }
    ])

    return (
      <View style = {styles.container}>
        <View style = {styles.fillParent}>
          <GearIndicator
            scrollY = {this.state.scrollY}
            refreshing = {this.state.refreshing}
          />
        </View>
        <View style = {styles.fillParent}>
          <ListView style = {{flex: 1}}
            dataSource = {this.state.dataSource}
            renderRow = {(rowData) => {return (
              <View style={styles.row}><Text style={styles.text}>{rowData}</Text></View>
            )}}
            onScroll = {event}
            scrollEventThrottle = {16}
            ref='PTRListView'/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 10,
    height: 125,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    marginBottom:-1,
    borderBottomColor: '#E5EDF5',
    borderTopColor: '#E5EDF5',
    borderBottomWidth: 1,
  },
  text: {
    textAlign: 'center',
    color: '#A4C8D9'
  },

  fillParent: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default PullToRefreshScene;
