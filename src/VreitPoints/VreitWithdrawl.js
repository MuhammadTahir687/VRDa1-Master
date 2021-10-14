import React from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput,Dimensions} from 'react-native';
import styles from "../StyleSheet/Style";
import Textarea from 'react-native-textarea';
import {backgroundColor} from "react-native-calendars/src/style";

export default  VreitWithdrawl=()=>{

    const Devicewidth=Dimensions.get('window').width;
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView  contentContainerStyle={{flexGrow:1}}>
        <View style={{flex:1,alignItems:"center",marginVertical:10}}>
            <Text style={{fontWeight:"bold",fontSize:18,textDecorationLine:"underline"}}>VREIT Points Withdrawal</Text>
        </View>
            <View style={{flex:1,flexDirection:"row",justifyContent:"center",backgroundColor:"white",marginHorizontal:10,borderRadius:10,marginTop:10,paddingVertical:10,elevation:10,borderWidth:4}}>
                <Text style={{alignSelf:"center", color:"black",fontWeight:"bold",marginHorizontal:10}}>Total Vreit Amount: </Text>
                <Text style={{paddingHorizontal:10,paddingVertical:5,alignSelf:"center",backgroundColor:"black",color:"white",borderRadius:5}}> $64.87000 </Text>
            </View>
            <View style={{flex:1,flexDirection:"row",justifyContent:"center",backgroundColor:"white",marginHorizontal:10,borderRadius:10,marginTop:10,paddingVertical:10,elevation:10,borderWidth:4}}>
                <Text style={{alignSelf:"center", color:"black",fontWeight:"bold",marginHorizontal:10}}>Total Vreit Points: </Text>
                <Text style={{paddingHorizontal:10,paddingVertical:5,alignSelf:"center",backgroundColor:"black",color:"white",borderRadius:5}}> $219.74932 </Text>
            </View>
            <View style={{flex:1,marginHorizontal:10,backgroundColor:"#d4d0d0",marginVertical:10}}>
                <Text style={{backgroundColor:"black",color:"white",paddingLeft:10,paddingVertical:10,fontWeight:"bold",borderTopLeftRadius:5,borderTopRightRadius:5}}>Swap into Fieat Currency</Text>

            <View style={{flex:1,marginVertical:10,borderWidth:1,borderColor:"black",borderRadius:5,marginHorizontal:10}}>
                  <Text style={{flex:1,backgroundColor:"#828080",color:"white",paddingLeft:10,fontWeight:"bold",paddingVertical:5}}>Holder Name</Text>
                  <Text style={{flex:1,backgroundColor:"transparent",color:"black",paddingLeft:10,fontWeight:"bold",paddingVertical:5}}>VRDa1</Text>
            </View>

                <View style={{flex:1,marginVertical:10,borderWidth:1,borderColor:"black",borderRadius:5,marginHorizontal:10}}>
                    <TextInput
                        style={{backgroundColor:"white",marginTop:10,marginHorizontal:10,borderRadius:5}}
                        placeholder="Enter Ammount for Transfer"

                    />
                    <TextInput
                        style={{backgroundColor:"white",marginTop:10,marginHorizontal:10,borderRadius:5,textAlignVertical: 'top'}}
                        placeholder="Notes"
                        multiline = {true}
                        numberOfLines = {10}

                    />
                    <Text style={{backgroundColor:"#828080",marginTop:10,marginHorizontal:10,color:"white",paddingLeft:10,paddingVertical:10,fontWeight:"bold",borderRadius:5}}>2% swap charges will be applicable.</Text>
                    <TouchableOpacity  style={{ flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"black",marginVertical:10,marginHorizontal:10,borderRadius:5}}>
                        <Text style={{color:"white",paddingLeft:10,paddingVertical:10,fontWeight:"bold"}}>Transfer To Web Wallet</Text>
                    </TouchableOpacity>

                </View>

            </View>
            </ScrollView>
        </SafeAreaView>

    )
}
