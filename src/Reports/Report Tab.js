import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MyPurchase from "./MyPurchase";
import OwnershipPurchase from "./OwnershipPurchase";
import TeamSale from "./TeamSale";
import PurchaseRequest from "./PurchaseRequest";
import TransferHistory from "./TransferHistory";
import RecieveHistory from "./RecieveHistory";
import WithdrawlHistory from "./WithdrawlHistory";
const Tab = createBottomTabNavigator();
export default function ReportTab() {
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'My Purchase') {return(<Image source={require('../Assets/MyPurchase.png')} style={{width:27,height:27}}/>)}
          else if (route.name === 'Ownership Purchases') {return(<Image source={require('../Assets/OwnershipPurchase.png')} style={{width:27,height:27}}/>)}
          else if (route.name === 'Team Sale') {return(<Image source={require('../Assets/TeamSale.png')} style={{width:27,height:27}}/>)}
          else if (route.name === 'Purchase Request') {return(<Image source={require('../Assets/purchaseRequest.png')} style={{width:27,height:27}}/>)}
          else if (route.name === 'Transfer History') {return(<Image source={require('../Assets/TransferHistory.png')} style={{width:27,height:27}}/>)}
          else if (route.name === 'Recieve History') {return(<Image source={require('../Assets/ReceiveHistory.png')} style={{width:27,height:27}}/>)}
          else if (route.name === 'WithDraw History') {return(<Image source={require('../Assets/WithdrawHistory.png')} style={{width:27,height:27}}/>)}
        },
        scrollEnabled: true,headerShown:false, tabBarActiveTintColor: 'black', tabBarInactiveTintColor: '#797777', tabBarStyle:{padding:5}
      })}>
      <Tab.Screen name="My Purchase"  component={MyPurchase} options={{tabBarLabel:""}}/>
      <Tab.Screen name="Ownership Purchases"  component={OwnershipPurchase}  options={{tabBarLabel:""}} />
      <Tab.Screen name="Team Sale"  component={TeamSale}  options={{tabBarLabel:""}} />
      <Tab.Screen name="Purchase Request"  component={PurchaseRequest}  options={{tabBarLabel:""}} />
      <Tab.Screen name="Transfer History"  component={TransferHistory}  options={{tabBarLabel:""}}  />
      <Tab.Screen name="Recieve History"  component={RecieveHistory}  options={{tabBarLabel:""}} />
      <Tab.Screen name="WithDraw History"  component={WithdrawlHistory}  options={{tabBarLabel:""}}  />
    </Tab.Navigator>
  );
}
