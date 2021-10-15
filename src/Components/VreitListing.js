import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import styles from '../StyleSheet/Style';
import Ionicons from "react-native-vector-icons/Ionicons";

const VL = ({ text1, text2 }) => {
    return (
        <View style={styles.vlcontainer}>
            <Text style={styles.vltext1}>{text1} </Text>
            <Text style={styles.vltext2}> {text2} </Text>
        </View>
    )
}
export default VL
