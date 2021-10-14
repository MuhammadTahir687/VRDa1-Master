import React, {useState} from "react";
import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Dimensions} from 'react-native';
import styles from "../StyleSheet/Style";
import Textarea from 'react-native-textarea';
import {backgroundColor} from "react-native-calendars/src/style";
import VBtn from "../Components/VreitLogsBtn";

export default VreitLogs = () => {
    const [btn, setBtn] = useState(0);
    const Button = [{id: 1, title: "Shifted"}, {id: 2, title: "Swapped"}, {id: 3, title: "Wallet"}, {id: 4, title: "Purchased"}, {id: 5, title: "Transfer"}, {id: 6, title: "Recieved"}]

    return (
        <SafeAreaView>
            <ScrollView horizontal={true}>
                <View style={{flexDirection: "row",marginVertical:10,}}>
                    {Button.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{height: 30, borderWidth: 1, width: 80, alignItems: "center", justifyContent: "center", marginHorizontal: 5, borderRadius:5,backgroundColor:(index==btn)?"black":"white"}}
                            onPress={()=>{setBtn(index)}}>
                            <Text style={{color:(index==btn)?"white":"black"}}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            {btn==0?<Text>Shifted</Text>:
                btn==1?<Text>Swapped</Text>:
                    btn==2?<Text>Wallet</Text>:
                        btn==3?<Text>Purchased</Text>:
                            btn==4?<Text>Transfer</Text>:
                                btn==5?<Text>Recieved</Text>:<View></View>
            }
        </SafeAreaView>

    )
}
