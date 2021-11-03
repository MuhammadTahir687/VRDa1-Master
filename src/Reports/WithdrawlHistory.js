import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Button,
    ScrollView,
    Dimensions,
    ActivityIndicator
} from "react-native";
import styles from "../StyleSheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { ProgressBar } from "react-native-paper";
import * as Progress from "react-native-progress";
import { GETAPI } from "../API/APIResponse";
import MText from "../Components/ModalText";
import MCText from "../Components/ModalColorText";
import RH from '../Components/ReportHeading'
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigation } from "@react-navigation/native";
import MD from "../Components/ModalDetails";

export default function WithdrawlHistory() {
  const [isModalVisible, setModalVisible] = useState();
  const [data,setdata]=useState([]);
  const [item,setItem]=useState('');
  const [show, setShow] = useState(false);
  const [selecteditem,setSelecteditem]=useState('');
    const [loading, setLoading] = useState(true);

  useEffect(async () => {await response()}, []);
  const response = async () => {
    try {
      const response= await GETAPI("/api/withdrawals")
        setLoading(false)
      console.log(response.data)
      setdata(response.data)
    } catch (e) {console.log(e)}
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator animating={loading} size="large" color="black" style={styles.activityind} />
      <RH text={"Withdraw History"}/>
      <FlatList data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => {setItem(item),setShow(true),setModalVisible(true)}} style={styles.allcomreportlist}>
                      <Text style={styles.comitem1}>Ref.Code {item.code}</Text>
                      <Text style={styles.comitem1}>Price {item.amount}</Text>
                      <Text style={styles.comitem1}>Status {item.status}</Text>
                      <Text style={styles.comitem1}>Creation Date {item.created_at}</Text>
                  </TouchableOpacity>
                )}
      />
      {show==true?
        <Modal isVisible={isModalVisible}>
            <View style={styles.modalmaincontainer}>
                <MD text1={"Admin Note"}  text2={item.adminNotes?item.adminNotes:"Not Available"}/>
              <ScrollView style={{marginVertical:20}}>
            <View style={styles.modaluser}>
              <View style={styles.modalh}>
                <Ionicons name="person" size={15} color="white" />
                <Text style={styles.modalhtext}>User</Text>
              </View>
              <TouchableOpacity style={styles.modaliconclose} onPress={() => {setShow(false),setModalVisible(false)}}>
                <Ionicons name="close" size={15} color="white" style={{ margin: 5, borderRadius: 50 }} />
              </TouchableOpacity>
            </View>
            <MText text1={"Ref.Code"} text2={item.code?item.code:""} backgroundColor={"transparent"}/>
            <MText text1={"Amount"} text2={item.amount?item.amount:""} backgroundColor={"#bfbfbf"}/>
            <MText text1={"Status"} text2={item.status?item.status:""} backgroundColor={"transparent"}/>
            {/*<MText text1={"Notes For Admin"} text2={item.adminNotes?item.adminNotes:""} backgroundColor={"transparent"} paddingRight={"1%"}/>*/}
            <MText text1={"Date"} text2={item.created_at?item.created_at:""} backgroundColor={"#bfbfbf"} paddingRight={"1%"}/>
              </ScrollView>
          </View>
        </Modal> : <View></View> }
    </SafeAreaView>
  );
}
