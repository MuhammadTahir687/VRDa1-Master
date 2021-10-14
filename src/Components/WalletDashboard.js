import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import styles from '../StyleSheet/Style';
import Ionicons from "react-native-vector-icons/Ionicons";

const WH = ({ text,value,backgroundColor,color}) => {
  return (
    <View style={[styles.wvaluesbcolorcontainer,{backgroundColor}]}>
      <Text style={[styles.wvaluesbtext,{color}]}>{text}</Text>
      <Text style={[styles.wvaluesbvalues,{color}]}>{value}</Text>
    </View>
  )
}
export default WH
