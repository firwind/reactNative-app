import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList, TouchableHighlight} from 'react-native'
import { screen } from '../common'
import { color } from '../widget'

class AnimationScene extends React.PureComponent {
    state: {
        dataList: [Object], 
    }

    constructor(props: Object) {
        super(props)
        this.state = {
            dataList: ["SimpleAnimation", "ScrollAnimation", "PanAnimation", "LayoutAnimation", "PullToRefreshScene", "StaggerAnimationScene"],
        }
    }

    componentDidMount() {
    }

    keyExtractor(item: Object, index: number) {
      return item.id
    }

    _onPress = ( (info) => {
      if (info == 0) {
          this.props.navigation.navigate('Animation1Screen')
      } else if (info == 1) {
        this.props.navigation.navigate('ScrollAnimationScene')
      } else if (info == 2) {
        this.props.navigation.navigate('PanAnimationScene')
      } else if (info == 3) {
        this.props.navigation.navigate('LayoutAnimationScene')
      } else if (info == 4) {
        this.props.navigation.navigate('PullToRefreshScene')
      } else if (info == 5) {
        this.props.navigation.navigate('StaggerAnimationScene')
      }
    })

    renderCell = ((item) => {
      return (
        <TouchableOpacity style = {{borderBottomWidth: screen.onePixel, borderColor: color.border}} onPress = {() => this._onPress(item.index)}>
            <View style = {{flexDirection: 'row',height: 44, alignItems: 'center', marginLeft: 20}}>
              <Text style = {{fontSize: 20, fontWeight: 'normal'}}>{this.state.dataList[item.index]}</Text>
            </View>
        </TouchableOpacity>);
    })

    onCellSelected(info) {
      StatusBar.setBarStyle('default', false)
    }

    render() {
      return (
        <View style = {styles.container}>
          <FlatList
            data = {this.state.dataList}
            // ListHeaderComponent = {this.renderHeader.bind(this)}
            // renderItem = {this.renderCell.bind(this)}
            renderItem = {this.renderCell}
          />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: 'white'
    },
    row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  text: {
    flex: 1,
  },
})

export default AnimationScene;
