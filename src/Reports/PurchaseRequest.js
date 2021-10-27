import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Button,
    Dimensions,
    ScrollView,
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
import MD from "../Components/ModalDetails";

export default function PurchaseRequest() {
  const [isModalVisible, setModalVisible] = useState();
  const [data,setdata]=useState([]);
  const [item,setItem]=useState('');
  const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

  useEffect(async () => {await response()}, []);
  const response = async () => {
    try {
      const response= await GETAPI("/api/my-requests")
        setLoading(false)
      setdata(response.data)
    } catch (e) {console.log(e)}
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator animating={loading} size="large" color="black" style={styles.activityind} />
      <RH text={"Purchase Request"}/>
      <FlatList data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => {setItem(item),setShow(true),setModalVisible(true)}} style={styles.allcomreportlist}>
                    <Text style={styles.comitem}>{item.package.title}</Text>
                    <Text style={styles.comitem}>{item.created_at}</Text>
                    <Ionicons name="eye" size={18} />
                  </TouchableOpacity>
                )}
      />
      {show==true?
        <Modal isVisible={isModalVisible}>
            <View style={styles.modalmaincontainer}>
                <MD text1={"Admin Notes"}  text2={item.admin_feedback?item.admin_feedback:"Not Available"}/>
                <MD text1={"User Notes"} text2={item.user_details?item.user_details:"Not Available"}/>
              <ScrollView style={{marginBottom:20}}>
            <View style={styles.modaluser}>
              <View style={styles.modalh}>
                <Ionicons name="person" size={15} color="white" />
                <Text style={styles.modalhtext}>User</Text>
              </View>
              <TouchableOpacity style={styles.modaliconclose} onPress={() => {setShow(false),setModalVisible(false)}}>
                <Ionicons name="close" size={15} color="white" style={{ margin: 5, borderRadius: 50 }} />
              </TouchableOpacity>
            </View>
            <MText text1={"Request Type"} text2={item.submission_type?item.submission_type:""} backgroundColor={"#bfbfbf"}/>
            <MText text1={"Package Name"} text2={item.package.title?item.package.title:""} backgroundColor={"transparent"}/>
            {/*<MText text1={"User Notes"} text2={item.user_details?item.user_details:"Not Available"} backgroundColor={"#bfbfbf"}/>*/}
            {/*<MText text1={"Admin Notes"} text2={item.admin_feedback?item.admin_feedback:"Not Available"} backgroundColor={"transparent"}/>*/}
            <MText text1={"Status"} text2={item.status?item.status:""} backgroundColor={"#bfbfbf"}/>
            <MText text1={"Create Date"} text2={item.created_at?item.created_at:""} backgroundColor={"transparent"}/>
            <MText text1={"Action Date"} text2={item.updated_at?item.updated_at:""} backgroundColor={"#bfbfbf"}/>
              </ScrollView>
          </View>
        </Modal> : <View></View> }
    </SafeAreaView>
  );
}
