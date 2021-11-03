import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ComissionReport from "../Comission Report";
import BinaryComission from "./Binary Commission";
import DirectComission from "./Direct Commission";

const Tab = createBottomTabNavigator();
export default function ComissionAppTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'All') {return(<Image source={require('../Assets/all.png')} style={{width:27,height:27}}/>)}
        else if (route.name === 'Binary Commission') {return(<Image source={require('../Assets/binary.png')} style={{width:27,height:27}}/>)}
        else if (route.name === 'Direct Commission') {return(<MaterialCommunityIcons   size={25} name={"sack-percent"}/>)}

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerShown:false,
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: '#797777',
      tabBarStyle:{paddingBottom:5}
    })}>
      <Tab.Screen name="All"  component={ComissionReport}  />
      <Tab.Screen name="Binary Commission"  component={BinaryComission}  />
      <Tab.Screen name="Direct Commission"  component={DirectComission}  />

    </Tab.Navigator>

  );
}
