import React, {Component, useEffect, useRef, useState} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from '../StyleSheet/Style';
import Ionicons from "react-native-vector-icons/Ionicons";
import {Tooltip} from "react-native-elements";

const MText = ({ text1,text2,backgroundColor,paddingRight}) => {

        // const[hieghtsize,setHieghtsize]=useState(text2.length?text2.length:0)
        // const[widthsize,setWidthsize]=useState(text2.length?text2.length:0)


  return (
    <View style={[styles.  modaldatacontainers,{backgroundColor},{paddingRight}]}>
      <Text style={styles.modaldatatexts}>{text1}</Text>
      <Text style={styles.modaldatavaluess}>
          {text2.length > 15 ?
              <Tooltip
                  backgroundColor="grey"
                  highlightColor="grey"
                  pointerColor="orange"
                  width={300}
                  withOverlay={false}
                  withPointer={true}
                  popover={<Text style={{color:"white",textAlign:'center'}}>{text2}</Text>}
              >
                  <Text>{text2.slice(0, 14)+"..."}</Text>
              </Tooltip>
              : <Text>{text2}</Text>}
      </Text>
    </View>
  )
}
export default MText
