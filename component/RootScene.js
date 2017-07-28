import React, { PureComponent } from 'react'
import { StatusBar, View } from 'react-native'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import HomeScene from './Home/HomeScene'
// import AnimationScene from './Animation/AnimationScene'
// import Animation1Scene from './Animation/Animation1Scene'
import TabBarItem from './widget/TabBarItem'
import color from './widget/color'
import {AnimationScene, Animation1Scene, ScrollAnimationScene, PanAnimationScene, LayoutAnimationScene, PullToRefreshScene, StaggerAnimationScene} from './Animation'

class RootScene extends PureComponent {
    constructor() {
        super()
        StatusBar.setBarStyle('light-content')
    }

    render() {
        return (
          // <View></View>
        <Navigator/>
      );
    }
}

const Tab = TabNavigator(
    {
        Home: {
            screen: HomeScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '团购',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/pfb_tabbar_homepage@2x.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_homepage_selected@2x.png')}
                    />
                )
            }),
        },
        Animation: {
          screen: AnimationScene,
          navigationOptions: ({ navigation }) => ({
              tabBarLabel: '团购',
              tabBarIcon: ({ focused, tintColor }) => (
                  <TabBarItem
                      tintColor={tintColor}
                      focused={focused}
                      normalImage={require('./img/tabbar/pfb_tabbar_homepage@2x.png')}
                      selectedImage={require('./img/tabbar/pfb_tabbar_homepage_selected@2x.png')}
                  />
              )
          }),
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: color.theme,
            inactiveTintColor: '#979797',
            style: { backgroundColor: '#ffffff' },
        },
    }

);

const Navigator = StackNavigator(
    {
        Tab: {screen: Tab},
        Animation1Screen: {screen: Animation1Scene},
        ScrollAnimationScene: {screen: ScrollAnimationScene},
        PanAnimationScene: {screen: PanAnimationScene},
        LayoutAnimationScene: {screen: LayoutAnimationScene},
        PullToRefreshScene: {screen: PullToRefreshScene},
        StaggerAnimationScene: {screen: StaggerAnimationScene}
    }, {
      navigationOptions: {
          // headerStyle: { backgroundColor: color.theme }
          headerBackTitle: null,
          headerTintColor: '#333333',
          showIcon: true,
      },
    }
);

export default RootScene;
