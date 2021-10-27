import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Button,ActivityIndicator } from "react-native";
import styles from "./StyleSheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { ProgressBar } from "react-native-paper";
import * as Progress from "react-native-progress";
import CountDown from "react-native-countdown-component";
import axios from "axios";
import Clock from "./Components/CountDown";
import { GETAPI } from "./API/APIResponse";
import MText from "./Components/ModalText";
import MCText from "./Components/ModalColorText";
import PText from "./Components/ProgressText";

export default function Comission() {

  const [isModalVisible, setModalVisible] = useState(false);
  const [getdata, setGetdata] = useState([]);
  const [item,setItem]=useState('');
  const [show,setShow]=useState(false);
  const [time,setTime]=useState(0);
  const [loading, setLoading] = useState(true);
  const [showclock,setShowclock]=useState(false);

    useEffect(async () => {await response();}, []);

  const response = async () => {
    try {
      const response= await GETAPI("api/closing-commissions-logs")
      setLoading(false)
        var a=response.data.next_second;
        var b=18000;
       setTime(a-b);
       setShowclock(true)
       console.log('jhbh')
      const res = response.data;
      const array=Object.values(res.logs)
      setGetdata(array)
    } catch (e) {console.log(e)}
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator animating={loading} size="large" color="black" style={styles.activityind} />
      <View style={styles.timerhcontainer}>
        <Text style={styles.timerh}>Next Commissions</Text>
      </View>
        {showclock &&
        <CountDown
            size={30}
            until={time}
            onFinish={() => alert('Finished')}
            digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#000'}}
            digitTxtStyle={{color: '#000'}}
            timeLabelStyle={{color: 'black', fontWeight: 'bold'}}
            separatorStyle={{color: '#000'}}
            timeToShow={['D','H', 'M', 'S']}
            timeLabels={{m: "Min", s: "Sec",h:"Hours",d:"Days"}}
            showSeparator
        />
        }

      <View style={{ marginVertical: 10 }}>
        <FlatList data={getdata}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {setItem(item),setModalVisible(true)}} style={styles.allcomreportlist}>
                      <Text style={styles.comitem}>Transaction ({item.transactions})</Text>
                      <Text >Closing Date: {item.closing_date}</Text>
                      {/*<Ionicons name="eye" size={18}/>*/}
                    </TouchableOpacity>
                  )}
        />
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalcontainer}>
          <View style={styles.modaluser}>
            <View style={styles.modalh}>
              <Ionicons name="person" size={15} color="white" />
              <Text style={styles.modalhtext}>User</Text>
            </View>
            <TouchableOpacity style={styles.modaliconclose} onPress={() => {setModalVisible(false)}}>
              <Ionicons name="close" size={15} color="white" style={styles.closeicon} />
            </TouchableOpacity>
          </View>
          <MText text1={"Transaction"} text2={item.transactions?item.transactions:""} />
          <MText text1={"Total (50)"} text2={item.total?item.total:""} backgroundColor={"#bfbfbf"} />
          <MText text1={"70% (900)"} text2={parseFloat(item.percent_70).toFixed(1)+'%'?item.percent_70:""} />
          <MText text1={"30% (400)"} text2={parseFloat(item.percent_30).toFixed(1)+'%'?item.percent_30:""} backgroundColor={"#bfbfbf"}  />
          <View style={styles.  modaldatacontainers}>
            <Text style={styles.modaldatatexts}>Status</Text>
            <Progress.Bar progress={0.8} color="#39f108" style={styles.pgbarmodal} width={100} />
          </View>
          <MText text1={"Closing Date"} text2={item.closing_date} backgroundColor={"#bfbfbf"} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
