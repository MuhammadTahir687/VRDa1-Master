import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import VreitWithdrawl from "./VreitWithdrawl";
import VreitLogs from "./VreitLogs";
import VreitTransferC2C from "./VreitTransferC2C";
import QuaterlyVreit from "./QuaterlyVreit";

const Tab = createBottomTabNavigator();
export default function VreitAppTab() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Vreit Withdrwal') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'Binary Commission') {
                        iconName = focused ? 'cash' : 'cash-outline';
                    } else if (route.name === 'Direct Commission') {
                        iconName = focused ? 'cash' : 'cash-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown:false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: '#797777',
                tabBarStyle:{paddingBottom:5}
            })}>
            <Tab.Screen name="Quaterly VREIT"  component={QuaterlyVreit}  />
            <Tab.Screen name="Vreit Withdrwal"  component={VreitWithdrawl}  />
            <Tab.Screen name="Vreit Logs"  component={VreitLogs}  />
            <Tab.Screen name="Vreit Transfer C2C"  component={VreitTransferC2C}  />

        </Tab.Navigator>

    );
}
