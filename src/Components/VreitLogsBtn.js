import React, { Component } from 'react'
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from '../StyleSheet/Style';
import Ionicons from "react-native-vector-icons/Ionicons";

const VBtn = ({ text1, onPress, backgroundColor, color }) => {
    return (
         <ScrollView horizontal={true}>
        <TouchableOpacity onPress={onPress} style={[styles.item2, {backgroundColor}]}>
            <Text style={[styles.item1title, {color}]}>{text1}</Text>
        </TouchableOpacity>
         </ScrollView>
    )
}
export default VBtn
