import React, { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { Avatar } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import styles from "../StyleSheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { GETAPI } from "../API/APIResponse";
import Clipboard from "@react-native-community/clipboard";

export default function USDT({ navigation }) {
  const [usdtcaddress, setusdtcaddress] = useState();
  const [branchname, setBranchname] = useState();
  const [image, setImage] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [role, setrole] = useState();
  const [title, setTitle] = useState();
    const [qrimage,setQrimage]=useState()

  useEffect(async () => {await response()}, []);

  const response = async () => {
    try {
     const res= await GETAPI("/api/usdt-profile")
      setusdtcaddress(res.data.usdt)
        setQrimage("https://staging.vrda1.net/"+res.data.usdt_img)
      const response = await GETAPI("/api/profile");
      setFirstname(response.data.user.first_name);
      setLastname(response.data.user.last_name);
      setTitle(response.data.user.title);
      setImage(response.data.user.picture);
      setrole(response.data.user.role);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient colors={["#0c0808", "#a49f9f"]} style={{ flex: 1 }}>
          <ImageBackground source={require("../Assets/HEader.png")} style={styles.profilebackimg}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("PMain");
            }} style={{ flexDirection: "row", marginLeft: 10, alignItems: "center", marginTop: 30 }}>
              <Ionicons name="chevron-back-sharp" size={21} color="white" />
              <Text style={{ color: "white", fontSize: 18 }}>Profile</Text>
            </TouchableOpacity>
            <View style={styles.profilemaincontainer}>
              <View style={{ bottom: 55 }}>
                <View style={{ elevation: 12 }}>
                  <Image source={{uri:image}} style={styles.profileimgstyle} />
                </View>
                <Text style={styles.profilename}>{title} {firstname} {lastname}</Text>
                <Text style={styles.profiledesignation}>{role}</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate("UUSDT")}}>
                  <LinearGradient colors={["#0c0808", "#a49f9f"]} style={styles.bdbutton}>
                    <FontAwesome name="dollar" size={20} color="white" style={{marginRight:8}}/>
                    <Text style={styles.modalhtext}>Update USDT</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles. pdatacontainer1}>
                <Text style={{fontWeight:"bold",marginLeft:25}}>USDT</Text>
                  <Text style={styles.usdttrc}>TRC20</Text>
              </View>
                <View style={styles.warningcontainer}>
                    <Text style={styles.warningheading}>Warning !!!</Text>
                    <Text style={styles.warningtext}>* Upon transfer request kindly make sure your wallet is secured.</Text>
                    <Text style={styles.warningtext}>* Any wrong hash address can cause loss of funds.</Text>
                    <Text style={styles.warningtext}>* Other then TRC20 USDT address may result in loss of your funds.</Text>
                    <Text style={styles.warningtext}>* Funds will appear after 3rd party or block chain confirmation.</Text>
                    <Text style={styles.warningtext}>* VRDa1 is not responsible for any delay related to block chain confirmation time.</Text>
                </View>
              <View style={styles. pdatacontainer}>
                <Text style={styles.pddatatext}>QR Code</Text>
                  <Image style={styles.btcqrcodeimage} source={{uri:qrimage}}/>
              </View>
              <View style={styles. pdatacontainers}>
                <Text style={styles.pddatatexts}>USDT Address</Text>
                <Text style={styles.pddatavaluess}>{usdtcaddress}</Text>
              </View>
                <TouchableOpacity onPress={()=>{Clipboard.setString(usdtcaddress)}}>
                    <LinearGradient colors={["#0c0808", "#6c6868"]} style={styles.cpbutton}>
                        <Text style={{ padding: 5, color: "white" }}>Copy Address</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
          </ImageBackground>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}
