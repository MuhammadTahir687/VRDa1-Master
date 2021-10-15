import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import styles from '../StyleSheet/Style';
import Ionicons from "react-native-vector-icons/Ionicons";

const SH = ({ text }) => {
    return (
        <View style={styles.shcontainer}>
            <Text style={styles.shtext}>{text}</Text>
        </View>
    )
}
export default SH
