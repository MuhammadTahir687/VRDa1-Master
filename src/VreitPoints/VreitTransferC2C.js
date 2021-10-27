import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import styles from "../StyleSheet/Style";
import LinearGradient from "react-native-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { CheckBox } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import Progress from "react-native-progress";
import { GETAPI, POSTAPI } from "../API/APIResponse";
import WH from "../Components/WalletDashboard";
import Check from "../Components/CheckBox";
import Item from "../Components/Item";
import RBModal from "../Components/RBModel";
import WS from "../Components/WalletSubmit";
import Card from "../Components/Card";
import Toast from "react-native-simple-toast";

export default function Wallet() {
    const [show, setShow] = useState(true);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValuevalidation, setSelectedValuevalidation] = useState('');
    const [selectedValue1validation, setSelectedValue1validation] = useState('');
    const [checkvalidation, setCheckvalidation] = useState('');
    const [check, setCheck] = useState(false);
    const [isModalVisible, setModalVisible] = useState();
    const [available,setAvailable]=useState(0);
    const [vreit,setVreit]=useState(0);
    const [shifted,setShifted]=useState(0);
    const [swaped,setSwaped]=useState(0);
    const [purchased,setPurchased]=useState(0);
    const [transfered,setTransfered]=useState(0)
    const [withdraw,setWithdraw]=useState(0);
    const [users,setUsers]=useState([]);
    const [btn,setBtn]=useState(0);
    const [details,setDetails]=useState('');
    const [modalmsg,setmodalmsg]=useState('');
    const [detailvalidation,setDetailvalidation]=useState('');
    const [loading, setLoading] = useState(true);
    const [amount,setAmount]=useState('')

    const Button=[{id:1,title:"Transfer Points"},{id:2,title:"Proceed Transfer"}]
    useEffect(async () => {await response()}, []);
    const response = async () => {
        try {
            const response= await GETAPI("/api/vreit-transfer-customer")
            setLoading(false);
            console.log("jdbfcjasd",response.vreit_transfer.shifted)
            setShifted(response.vreit_transfer.shifted)
            setSwaped(response.vreit_transfer.swapped.toFixed(2))
            setVreit(response.vreit_transfer.vreit)
            setPurchased(response.vreit_transfer.purchased)
            setTransfered(response.vreit_transfer.transfer)
            setWithdraw(response.vreit_transfer.receive)
            setAvailable(response.vreit_transfer.available.toFixed(2))
            setUsers(response.child_users)
        } catch (e) {console.log(e)}
    };

    const submit=async ()=>{
        if(selectedValue==''){setSelectedValuevalidation("Select Profile Account")}
        else if(amount==''){setSelectedValue1validation("Enter Amount to Tranfer")}
        else if(amount>available){setSelectedValue1validation("Maximum Amount is $"+available)}
        else if(details==''){setDetailvalidation("Add Transfer Details")}
        else if(check==false){setCheckvalidation("Agree on the Term of Conditions")}
        else {

            const data=new FormData();
            data.append('details', details,);
            data.append("points", amount);
            data.append("receiver_id", selectedValue);
            const response= await POSTAPI('/api/vreit-transfer-process',data)
            console.log(response.data)
            if(response.data.status==true) {
                setmodalmsg(response.data.message)
                setModalVisible(true)
            }else{
                Toast.show(response.data.message);
            }
        }
    }
    const DetailsValidation = () => {
        if(details==""){setDetailvalidation("Enter the Transfer Details")}
        else{setDetailvalidation('')}
    }
    const AccountValidation = () => {
        if(selectedValue==""){setSelectedValuevalidation("Select the Profile Account")}
        else{setSelectedValuevalidation('')}
    }
    const AmountValidation = () => {
        if(amount==""){setSelectedValue1validation("Enter the Points")}
        else{setSelectedValue1validation('')}
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.walletbuttoncontainer}>
                    {Button.map((item,index)=>(<Item key={index} onPress={()=>{setBtn(index)}} color={index==btn?"white":"black"} backgroundColor={index==btn?"black":"white"} text1={item.title}/>))}
                </View>
                {btn==0 ?
                    <View>
                        <WH text={"Shifted (+)"} value={shifted} backgroundColor={"#bfbfbf"}/>
                        <WH text={"Swapped (-)"} value={swaped} backgroundColor={"transparent"}/>
                        <WH text={"Vreit Wallet (-)"} value={vreit} backgroundColor={"#bfbfbf"}/>
                        <WH text={"Purchased (-)"} value={purchased} backgroundColor={"transparent"}/>
                        <WH text={"Transfered (-)"} value={transfered} backgroundColor={"#bfbfbf"}/>
                        <WH text={"Recieved (+)"} value={withdraw} backgroundColor={"transparent"}/>
                        <WH text={"Available (=)"} value={available} backgroundColor={"#585454"} color={"white"}/>
                    </View> :
                    <View>
                        <Text style={styles.wh}>Profile Account</Text>
                        <View style={styles.wpickercontainer}>
                            <Picker
                                onBlur={AccountValidation}
                                selectedValue={selectedValue}
                                style={{ height: 50, width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue),setSelectedValuevalidation('')}}>
                                <Picker.Item label="Choose One" value="" />
                                {users.sort((a, b) => a.name.localeCompare(b.name)).map((item,index)=>(<Picker.Item key={index} label={item.name} value={item.id} />))}
                            </Picker>
                        </View>
                        <Text style={styles.walleterror}>{selectedValuevalidation}</Text>
                        <Text style={styles.wh}>Proceed With</Text>
                        <TextInput style={styles.winput}
                                   placeholder="In Points"
                                   value={amount}
                                   keyboardType={"numeric"}
                                   onBlur={AmountValidation}
                                   onChangeText={(text)=>{setAmount(text),setSelectedValue1validation('')}}/>
                        <Text style={styles.walleterror}>{selectedValue1validation}</Text>
                        <Text style={styles.wh}>Withdraw Details</Text>
                        <TextInput style={styles.winput} value={details} onBlur={DetailsValidation} onChangeText={(text)=>{setDetails(text),setDetailvalidation('')}}/>
                        <Text style={styles.walleterror}>{detailvalidation}</Text>
                        <View>
                            <Check onPress={() => {setCheck(!check),setCheckvalidation('')}} checked={check}/>
                            <Text style={styles.walleterror}>{checkvalidation}</Text>
                        </View>
                        <WS text1={"Proceed Transfer"} onPress={()=>{submit()}}/>
                        <RBModal text1={modalmsg} iconname={"close"} text2={isModalVisible} onPress={()=>{setModalVisible(false)}}/>
                    </View>
                }
            </ScrollView>
            <ActivityIndicator animating={loading} size="large" color="black" style={styles.activityind} />
        </SafeAreaView>
    );
}
