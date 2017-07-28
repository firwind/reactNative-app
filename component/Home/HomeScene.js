import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList } from 'react-native'
import api from '../api'
import GroupPurchaseCell from './GroupPurchase/GroupPurchaseCell'
import HomeMenuView from './HomeMenuView'
import HomeGridView from './HomeGridView'
import { Heading1, Heading2, Paragraph } from '../widget/Text'
import { color, Button, NavigationItem, SearchBar, SpacingView} from '../widget'
import { screen, system } from '../common'

class HomeScene extends React.PureComponent {
    state: {
        discounts: Array <Object> ,
        dataList: [Object], 
        refreshing: boolean
    }

    static navigationOptions = ({navigation}) => ({
      headerTitle: (
        <TouchableOpacity style = {styles.searchBar}>
          <Image source={require('../img/Home/search_icon.png')} style = {styles.searchIcon}></Image>
          <Paragraph>一点点</Paragraph>
        </TouchableOpacity>
      ),
      headerRight: (
        <NavigationItem
          icon={require('../img/Home/icon_navigationItem_message_white@2x.png')}
          onPress={() => {

          }}
        />
      ),
      headerLeft: (
        <NavigationItem
          title='青岛'
          titleStyle = {{color: 'white'}}
          onPress = {() => {}}
        />
      ),
      headerStyle: { backgroundColor: color.theme }
    })

    constructor(props: Object) {
        super(props)
        this.state = {
            discounts: [],
            dataList: [],
            refreshing: false
        }
    }

    componentDidMount() {
      this.requestData()
    }

    requestData() {
      this.setState({refreshing: true})
      this.requestDiscount()
      this.requestRecomment()
    }

    keyExtractor(item: Object, index: number) {
      return item.id
    }

    async requestRecomment() {
      try {
          let response = await fetch(api.recommend)
          let json = await response.json()
          let dataList = json.data.map(
              (info) => {
                  return {
                      id: info.id,
                      imageUrl: info.squareimgurl,
                      title: info.mname,
                      subtitle: `[${info.range}]${info.title}`,
                      price: info.price
                  }
              }
          )

          this.setState({
              dataList: dataList,
              refreshing: false,
          })
        } catch (error) {
            this.setState({ refreshing: false })
        }
    }

    async requestDiscount() {
      try {
        let response = await fetch(api.discount)
        let json = await response.json()
        this.setState({ discounts: json.data})
      } catch (error) {
        alert(error)
      }
    }

    renderCell(info: Object) {
      console.log(this);
      return (
        <GroupPurchaseCell info = {info.item} onPress = {this.onCellSelected}/>
      )
    }

    renderHeader() {
      return (
        <View>
          <HomeMenuView menuInfos = {api.menuInfo}/>
          <SpacingView />

          <HomeGridView infos = {this.state.discounts} onGridSelected = {(this.onGridSelected)}/>

          <SpacingView />
          <View style = {styles.recommendHeader}>
            <Heading2>猜你喜欢</Heading2>
          </View>
        </View>
      )
    }

    onCellSelected(info) {
      StatusBar.setBarStyle('default', false)
      
    }

    render() {
      return (
        <View style = {styles.container}>
          <FlatList
            data = {this.state.dataList}
            keyExtractor = {this.keyExtractor.bind(this)}
            onRefresh = {this.requestData.bind(this)}
            refreshing = {this.state.refreshing}
            ListHeaderComponent = {this.renderHeader.bind(this)}
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
        backgroundColor: color.background
    },
    recommendHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    },
    searchBar: {
        width: screen.width * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    }
})

export default HomeScene;
