import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Dimensions} from 'react-native';
import styles from "../StyleSheet/Style";
import Textarea from 'react-native-textarea';
import {backgroundColor} from "react-native-calendars/src/style";
import SH from '../Components/ScreenHeading'
import VL from "../Components/VreitListing";
import {GETAPI, POSTAPI} from "../API/APIResponse";
import {Picker} from "@react-native-picker/picker";
import {GETDATA} from "../AsyncStorage/AsyncStorage";
import RBModal from "../Components/RBModel";

export default VreitWithdrawl = () => {
 const [amount,setAmount]=useState(0);
 const [notes,setNotes]=useState('');
 const[amountvalidation,setAmountvalidation]=useState('');
 const[notesvalidation,setNotesvalidation]=useState('');
    const [loading, setLoading] = useState(true);
    const [vreitamount,setVreitamount]=useState(0);
    const [vreitpoint,setVreitpoint]=useState(0);
    const [selectedValue1, setSelectedValue1] = useState('swapped_withdrawal');
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalmsg,setModalmsg]=useState('')

    useEffect(async () => {await response()}, []);
    const response = async () => {
        try {
            const response= await GETAPI("/api/vreit-points-withdrawal")
            console.log(response.data.vreit_amount)
            setVreitamount(response.data.vreit_amount)
            setVreitpoint(response.data.vreit_points)
            setLoading(false);

        } catch (e) {console.log(e)}
    };

 const amountvaidator = () => {
     if(amount==''){setAmountvalidation("Enter the amount")}
     else{setAmountvalidation('')}
 }
 const notevaidator = () => {
     if(notes==''){setNotesvalidation("Enter the notes")}
     else{setNotesvalidation('')}
 }

    const Submit = async () => {
        if(amount==''){await setAmountvalidation("Enter the amount")}
        else if(amount>vreitamount){await setAmountvalidation("Maximum amount must "+vreitamount.toFixed(2))}
        else if(notes==''){await setNotesvalidation("Enter the notes")}
        else{
            const userdata= await GETDATA('user')
            const data={user_id:userdata.id,transfer_type:selectedValue1,amount:amount}
            const response= await POSTAPI('/api/vreit-amount-swapped-withdrawal',data)
            setModalVisible(true)
            setModalmsg(response.data.message)
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <SH text={"VREIT Points Withdrawal"}/>
                <View style={styles.wpickercontainer}>
                    <Picker
                        selectedValue={selectedValue1} style={{ height: 50, width: "100%" }}
                        onValueChange={(itemValue, itemIndex) => {setSelectedValue1(itemValue)}}>
                        <Picker.Item label="VREIT Amount" value="swapped_withdrawal" />
                        <Picker.Item label="VREIT Points" value="djbfjdb" />
                    </Picker>
                </View>
                {selectedValue1 =="swapped_withdrawal" ?
                    <View>
                        <VL text1={"Total Vreit Amount:"} text2={"$"+vreitamount.toFixed(2)}/>

                        <View style={styles.vwindowcontainer}>
                            <Text style={styles.vheading}>Swap into Fieat Currency</Text>

                            <View style={styles.v2container}>
                                <Text style={styles.v2containertext1}>Holder Name</Text>
                                <Text style={styles.v2continertext2}>VRDa1</Text>
                            </View>

                            <View style={styles.v3container}>
                                <TextInput
                                    style={styles.v3input1}
                                    placeholder="Enter Ammount for Transfer"
                                    keyboardType={"numeric"}
                                    value={amount}
                                    onChangeText={(text)=>{setAmount(text),setAmountvalidation('')}}
                                    onBlur={amountvaidator}
                                />
                                {amountvalidation!=''&&<Text style={styles.vreiterror}>{amountvalidation}</Text>}

                                <TextInput
                                    style={styles.v3input2}
                                    placeholder="Notes"
                                    multiline={true}
                                    numberOfLines={10}
                                    onChangeText={(text)=>{setNotes(text),setNotesvalidation('')}}
                                    onBlur={notevaidator}
                                />
                                {notesvalidation!=''&& <Text style={styles.vreiterror}>{notesvalidation}</Text>}

                                <Text style={styles.v3h}>2% swap charges will be applicable.</Text>

                                <TouchableOpacity style={styles.v3btn} onPress={()=>Submit()}>
                                    <Text style={styles.v3btntext}>Transfer To Web Wallet</Text>
                                </TouchableOpacity>
                                <RBModal text1={modalmsg} iconname={"close"} text2={isModalVisible} onPress={()=>{setModalVisible(false)}}/>

                            </View>
                        </View>
                    </View>:
                    <View style={{flex:40}}>
                            <VL text1={"Total Vreit Points:"} text2={"$"+vreitpoint.toFixed(2)}/>
                        <View style={{flex:40,borderWidth:1,marginHorizontal:10,marginVertical:10,justifyContent:"center",alignItems:'center',borderRadius:5}}>
                            <Text style={{fontWeight:"bold",color:"#6c6969",fontSize:20}}>Comming Soon</Text>
                        </View>
                    </View>
                }


            </ScrollView>
        </SafeAreaView>

    )
}
