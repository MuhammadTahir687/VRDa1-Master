import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { Avatar, ListItem, Badge } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import {DrawerActions} from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { GETDATA } from "./AsyncStorage/AsyncStorage";
import Toast from "react-native-simple-toast";
import {GETAPI} from "./API/APIResponse";

export default DrawerContent = () => {
  const navigation=useNavigation();
  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
    const [image,setImage]=useState(null)

  useEffect(async()=>{
    const userdata= await GETDATA('user')
      setEmail(userdata.user.email)
      setName(userdata.user.name)
      console.log("user========",userdata.user.email)
      response()
  ;},[])

    const response = async() => {
      try{
          const response = await GETAPI('/api/profile')
          setImage(response.data.user.picture)
          console.log("sdbvasjhd",response.data.user.picture)
      }catch (e) {
          console.log(e)
      }
    }

  return (
    <LinearGradient colors={["#0c0808", "#a49f9f"]}  >
      <TouchableOpacity style={{flexDirection:"row-reverse",marginTop:10,right:25,position:"absolute"}} onPress={()=>{navigation.dispatch(DrawerActions.closeDrawer());}}>
        <Ionicons name="close" color="white" size={25} style={{backgroundColor:"#8b8686",borderRadius:20}}/>
      </TouchableOpacity>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginVertical: 10 }}>
          {image ==null?<Avatar
              size="xlarge"
              rounded
              icon={{ name: "user", type: "font-awesome", color: "#424141" }}
              activeOpacity={0.7}
              containerStyle={{ backgroundColor: "#a49f9f", borderRadius: 10,width:100,height:100,elevation:10,marginTop:10 }}
          />:
              <Avatar
                  size="xlarge"
                  icon={{ name: "user", type: "font-awesome", color: "#424141" }}
                  activeOpacity={0.7}
                  source={{uri:image}}
                  containerStyle={{ backgroundColor: "#a49f9f",borderRadius: 10,width:100,height:100,elevation:10,marginTop:10,borderWidth:4,borderColor:"white" }}
              />}

      </View>
      <View style={{ marginHorizontal: 10, justifyContent: "center", marginBottom: 10 }}>
        <Text style={{ color: "white", fontSize: 16,alignItems:"center",textAlign:"center" }}>{name}</Text>
        <Text style={{ color: "white",textAlign:"center" }}>{email}</Text>
      </View>
      </View>

</LinearGradient>

  )
}
