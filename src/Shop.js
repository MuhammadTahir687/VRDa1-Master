import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Dimensions,
    Button, Alert, Image, KeyboardAvoidingView, ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./StyleSheet/Style";
import RBSheet from "react-native-raw-bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import ModalTab from "./Modal";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-crop-picker";
import { GETAPI, POSTAPI } from "./API/APIResponse";
import RowText from "./Components/RowText";
import RowTextHighlight from "./Components/RowTextHighLight";
import RBText from "./Components/RBText";
import RBTextHighLight from "./Components/RBTextHighLight";
import Item from "./Components/Item";
import Submit from "./Components/Submit";
import Select from "./Components/Upload";
import RBModal from "./Components/RBModel";
import Toast from "react-native-simple-toast";
import Clipboard from '@react-native-community/clipboard';

export default function Shop() {
 const Deviceheight=Dimensions.get('window').height;
  const refRBSheet = useRef();
  const [copiedText, setCopiedText] = useState('');
  const [isModalVisible, setModalVisible] = useState();
  const [data, setData] = useState([]);
  const [getdata, setGetdata] = useState("");
  const [show, setShow] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');
  const [btn,setBtn]=useState(0);
  const [filePath, setFilePath] = useState([]);
  const [paymentformdata, setPaymentformdata] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [details, setDetails] = useState("");
  const [modalmsg,setModalmsg]=useState('')
  const [detailvalidation,setDetailvalidation]=useState('');
  const [uploadfilevalidation,setUploadfilevalidation]=useState('');
  const [isloading,setLoading]=useState(true);

  const Button=[{id:1,title:"Package Details"},{id:2,title:"Proceed Order"}]

  useEffect(async () => {await packages()}, []);

  const packages = async () => {
    try {
      const response = await GETAPI("/api/buy-a-package");
      setLoading(false)
      setData(response.data);
    } catch (e) {console.log(e)}
  };
  const paymentform = async ({itemValue}) => {
      setLoading(true)
    const data = { package_id: getdata.id, value: itemValue };
    const response = await POSTAPI("/api/get-payment-form", data);
    if(itemValue=='bank') {await setPaymentformdata(response.data.data.bank_form);}
    else if(itemValue=='usdt'){await setPaymentformdata(response.data.data.usdt_form)}
    else if(itemValue=='wallet'){await setPaymentformdata(response.data.data.wallet_form)}
    else if(itemValue=='vreit'){await setPaymentformdata(response.data.data.vreit)}
    setLoading(false)
  };

  const submit = async () => {
    if(details==""){setDetailvalidation("Add Payment Details")}
    else if(filePath==""){setUploadfilevalidation("Select a File")}
    else {
      const data = new FormData();
      data.append('package_id', getdata.id,);
      data.append("proceed_with", selectedValue);
      data.append("payment_details", details);
      data.append("picture", { uri: filePath, name: "photo.jpg", type: `image/jpg`, });
      const response = await POSTAPI('/api/shop-proceed-payments', data)
      setModalmsg(response.data.success)
      setModalVisible(true)
      // Toast.show(response.data.success)
    }
  }
  const takephotofromgallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setFilePath(image.path);
      }).catch((error) => {
      console.log("error");
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator animating={isloading} size="large" color="black" style={styles.activityind} />
        <FlatList data={data}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <LinearGradient colors={["#0c0808", "#a49f9f"]} style={styles.item}>
                    <TouchableOpacity onPress={() => {setGetdata(item);refRBSheet.current.open();}}>
                      <View style={styles.itemheadercontainer}>
                        <Text style={styles.itemtitle}>{item.title}</Text>
                        <Text style={styles.itemprice}>${item.price}</Text>
                      </View>
                      <View style={styles.subscriptionbutton}>
                        <Text style={styles.subscriptiontext}>Subscription <Text
                          style={styles.subscriptionprice}>$50</Text></Text>
                      </View>
                      <View style={styles.itemfootercontainer}>
                        <Text style={styles.itempoints}>{item.extra_tokens}% </Text>
                        <Text style={styles.itempointtext}>VERIT Bonus Points</Text>
                      </View>
                    </TouchableOpacity>
                  </LinearGradient>
                )}
      />
      {/*  End of FlatList*/}
      <RBSheet
        ref={refRBSheet}
        height={Deviceheight/1.5}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          wrapper: { backgroundColor: "transparent",},
          container:{borderTopRightRadius:20,borderTopLeftRadius:20}
        }}>
        <View style={{ flex: 0.25 }}>
          <View style={styles.sheetitemcontainer}>
            <Text style={styles.sheetitemtitle}>{getdata.title}</Text>
            <TouchableOpacity onPress={() => {refRBSheet.current.close(),setSelectedValue('')}} style={{ marginTop: 8 }}>
              <Ionicons name="close-circle" color="grey" size={28} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsheetcontainer}>
            {Button.map((item,index)=>(<Item key={index} onPress={()=>{setBtn(index)}} color={index==btn?"white":"black"} backgroundColor={index==btn?"black":"white"} text1={item.title}/>))}
          </View>
        </View>
        {btn == 0 ?
          <View style={{ flex: 1 }}>
            <RowText text1={"Price"} text2={getdata.price} iconname={"checkmark-circle-outline"} backgroundColor={"transparent"}/>
            <RowText text1={"Subscription Fee"} text2={"$50"} iconname={"checkmark-circle-outline"} backgroundColor={"#bfbfbf"}/>
            <RowText text1={"Business Volume"} text2={getdata.business_volume} iconname={"checkmark-circle-outline"}backgroundColor={"transparent"}/>
            <RowText text1={"Escrow Time"} text2={getdata.escroll_time} text3={"days"} iconname={"checkmark-circle-outline"}backgroundColor={"#bfbfbf"}/>
            <RowText text1={"Direct Commission"} text2={getdata.direct_commission} text3={"%"} iconname={"checkmark-circle-outline"}backgroundColor={"transparent"}/>
            <RowText text1={"Binary Comission"} text2={getdata.binary_commission} text3={"%"} iconname={"checkmark-circle-outline"}backgroundColor={"#bfbfbf"}/>
            <RowText text1={"Maxout Per Week"} text2={getdata.maxout} iconname={"checkmark-circle-outline"}backgroundColor={"transparent"}/>
            <RowText text1={"Extra Tokens"} text2={getdata.extra_tokens} iconname={"checkmark-circle-outline"} backgroundColor={"#bfbfbf"}/>
          </View>
          :
          //Second Layout
          <View style={{ flex: 1 }}>
            <View style={styles.pdh}>
              <Text style={styles.pickerabove}>Proceed With</Text>
            </View>
            <View style={styles.pickerbottom}>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 40, width: "100%"}}
                onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue),paymentform({itemValue})}}>
                <Picker.Item label="Please Select" value="" />
                <Picker.Item label="Bank" value="bank" />
                <Picker.Item label="Vreit" value="vreit" />
                <Picker.Item label="USDT" value="usdt" />
                <Picker.Item label="Wallet" value="wallet" />
              </Picker>
            </View>
            {selectedValue=="bank"?
              <ScrollView style={{flex:1}}>
              <RBText text1={"Account Name"} text2={paymentformdata.account_name} />
              <RBText text1={"Bank Name"} text2={paymentformdata.bank_name} backgroundColor={"#bfbfbf"}/>
              <RBText text1={"Account Number"} text2={paymentformdata.account_number} />
              <RBText text1={"IBAN"} text2={paymentformdata.iban} backgroundColor={"#bfbfbf"}/>
              <RBText text1={"Swift Code"} text2={paymentformdata.swift_code}/>
              <RBText text1={"CIF Number"} text2={paymentformdata.cif_number} backgroundColor={"#bfbfbf"}/>
              <RBText text1={"Branch Name"} text2={paymentformdata.branch_name}/>
              <RBText text1={"Branch Code"} text2={paymentformdata.branch_code} backgroundColor={"#bfbfbf"}/>
              <Select text1={"Upload File"} iconname={"images"} onPress={()=>{takephotofromgallery(),setUploadfilevalidation('')}}/>
                {uploadfilevalidation!=''&&<Text style={styles.shoperror}>{uploadfilevalidation}</Text>}
              <TextInput
                style={styles.rbsinput}
                value={details}
                placeholder="Add Payment Details"
                onChangeText={(text)=>{setDetails(text),setDetailvalidation('')}}
              />
                {detailvalidation!=''&&<Text style={styles.shoperror}>{detailvalidation}</Text>}
              <Submit text={"Submit"} onPress={()=>{submit()}}/>
              <RBModal text1={modalmsg} iconname={"close"} text2={isModalVisible} onPress={()=>{setModalVisible(false)}}/>
            </ScrollView>
              : selectedValue=="usdt"?
              <ScrollView style={{flex:1}}>
                  <View style={styles.shopusdttrc}><Text style={styles.shopusdttrctext}>TRC20</Text></View>
                  <View style={{flex:1}}>
                <Image source={{uri: paymentformdata.image}} style={styles.rbusdtimage}/>
                <Text style={styles.rbwalletmsg}>{paymentformdata.code}</Text>
                      <TouchableOpacity style={styles.copy} onPress={()=>{Clipboard.setString(paymentformdata.code)}}>
                          <Text style={styles.copytext}>Copy!</Text>
                      </TouchableOpacity>
                  </View>
                      <View style={styles.shopusdtimpnote}>
                      <Text style={styles.shopusdtnoteh}>Important Note</Text>
                          <Text style={styles.shopusdtnotetext}>Send only USDT to this deposit address.</Text>
                          <Text style={styles.shopusdtnotetext1}>* Sending coins or tokens other than USDT to this address may result in the loss of your deposit.</Text>
                          <Text style={styles.shopusdtnotetext1}>* Package will be update or upgrade after confirmation.</Text>
                  </View>
                  <Select text1={"Upload File"} iconname={"images"} onPress={()=>{takephotofromgallery(),setUploadfilevalidation('')}}/>
                  {uploadfilevalidation!=''&&<Text style={styles.shoperror}>{uploadfilevalidation}</Text>}
                  <View style={styles.shopusdtimgnote}>
                        <Text style={styles.shopusdtnoteh1}>Note:</Text>
                        <Text style={styles.shopusdtnotetext2}><Text style={{fontWeight:"bold"}}>Files Allowed: </Text>.jpg, .png, .gif, .txt, .doc, .xlx, .pdf</Text>
                        <Text style={styles.shopusdtnotetext2}><Text style={{fontWeight:"bold"}}>Max file siz: </Text>2MB allowed</Text>
                    </View>
                  <TextInput
                      style={styles.rbsinput}
                      value={details}
                      placeholder="User Notes"
                      onChangeText={(text)=>{setDetails(text),setDetailvalidation('')}}
                  />
                  {detailvalidation!=''&&<Text style={styles.shoperror}>{detailvalidation}</Text>}
                  <Submit text={"Submit"} onPress={()=>{submit()}}/>
                  <RBModal text1={modalmsg} iconname={"close"} text2={isModalVisible} onPress={()=>{setModalVisible(false)}}/>
              </ScrollView>
              : selectedValue=="vreit"?
              <View style={{flex:1}}>
                <Text style={styles.rbwalletmsg}>{paymentformdata.message}</Text>
              </View>
              : selectedValue=="wallet"?
              <View style={{flex:1}}>
                <Text style={styles.rbwalletmsg} >{paymentformdata.message}</Text>
              </View>
              :<View></View>}
          </View>
        }
      </RBSheet>
    </SafeAreaView>
  );
}

