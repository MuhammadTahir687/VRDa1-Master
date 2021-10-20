import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, Image, SafeAreaView, ActivityIndicator } from "react-native";
import { GETDATA } from "./AsyncStorage/AsyncStorage";

const Splash = ({ navigation }) => {
  useEffect(async() => {
    setTimeout(async () => {
      let Token = await GETDATA("token");
      if (Token == null) {
        navigation.replace('LoginMain')
      } else {
        navigation.replace("Drawer")
      }
    }, 3000);

  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require("./Assets/splash.png")} style={{ width: "100%", height: "100%" }}>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Splash;
