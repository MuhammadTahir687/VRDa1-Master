import React, {Component, useEffect, useRef, useState} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from '../StyleSheet/Style';
import Ionicons from "react-native-vector-icons/Ionicons";
import {Tooltip} from "react-native-elements";

const MD = ({ text1,text2,backgroundColor,paddingRight}) => {
    return (
        <View style={{marginLeft:15,marginRight:10,marginTop:10}}>
            <Text style={{fontWeight:'bold'}}>{text1}</Text>
            <Text style={{textAlign:"justify"}}>{text2}</Text>
        </View>
    )
}
export default MD
