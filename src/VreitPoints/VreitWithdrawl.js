import React, {useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Dimensions} from 'react-native';
import styles from "../StyleSheet/Style";
import Textarea from 'react-native-textarea';
import {backgroundColor} from "react-native-calendars/src/style";
import SH from '../Components/ScreenHeading'
import VL from "../Components/VreitListing";

export default VreitWithdrawl = () => {
 const [amount,setAmount]=useState('');
 const [notes,setNotes]=useState('');
 const[amountvalidation,setAmountvalidation]=useState('');
 const[notesvalidation,setNotesvalidation]=useState('');

 const amountvaidator = () => {
     if(amount==''){setAmountvalidation("Enter the amount")}
     else{setAmountvalidation('')}
 }
 const notevaidator = () => {
     if(notes==''){setNotesvalidation("Enter the notes")}
     else{setNotesvalidation('')}
 }

    const Submit = () => {
        if(amount==''){setAmountvalidation("Enter the amount")}
        else if(notes==''){setNotesvalidation("Enter the notes")}
        else{
            alert("Hello")
        }

    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <SH text={"VREIT Points Withdrawal"}/>
                <VL text1={"Total Vreit Amount:"} text2={"$64.87000"}/>
                <VL text1={"Total Vreit Points:"} text2={"$219.74932"}/>

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

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}
