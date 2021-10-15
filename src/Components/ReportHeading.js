import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import styles from '../StyleSheet/Style';
import Ionicons from "react-native-vector-icons/Ionicons";

const RH = ({ text }) => {
    return (
        <View style={{alignSelf:"center",marginVertical:10}}>
            <Text style={styles.dashboardh2}>{text}</Text>
        </View>
    )
}
export default RH
