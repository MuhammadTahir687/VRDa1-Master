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
    ActivityIndicator, Image, Platform, UIManager, LayoutAnimation,
} from "react-native";
import styles from "../StyleSheet/Style";
import LinearGradient from "react-native-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { CheckBox } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import Progress from "react-native-progress";
import { GETAPI, POSTAPI } from "../API/APIResponse";
import Card from "../Components/Card";
import Toast from "react-native-simple-toast";
import MText from "../Components/ModalText";
import {ExpandableListView} from 'react-native-expandable-listview';
import { List } from 'react-native-paper';

export default function QuaterlyVreit() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [item,setItem]=useState('');
    const [index,setIndex]=useState('');
    const [expanded,setExpanded]=useState(false)
    const [opacity,setOpacity]=useState("");

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const changeLayout = ({item}) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        {opacity==item.id?setExpanded(!expanded):setExpanded(true)}
    }

    const DATA = [
        { title: "Package", value: '25,000', value1:"( "+"jsdsakd"+"*"+"shbhxsh"+" )", type:"Premium",color:"white" },
        { title: "Assigned",  value: '25,000', value1:"( "+"jsdsakd"+"*"+"shbhxsh"+" )",color:"transparent"},
        { title: "Bonus",  value: '25,000', value1:"( "+"jsdsakd"+"*"+"shbhxsh"+" )",color:"transparent"},
        { title: "Total Shifted Verits",  value: '25,000', value1:"( "+"jsdsakd"+"*"+"shbhxsh"+" )",color:"transparent"},
    ];
    const Data = [
        {id:1, title: "Invoice", value: '25,000', value1:"( "+"jsdsakd"+"*"+"shbhxsh"+" )", type:"Premium",color:"white" },
        {id:2, title: "Invoice",  value: '25,000', value1:"( "+"jsdsakd"+"*"+"shbhxsh"+" )",color:"transparent"},
        {id:3, title: "Invoice",  value: '25,000', value1:"( "+"jsdsakd"+"*"+"shbhxsh"+" )",color:"transparent"},
        {id:4, title: "Invoice",  value: '25,000', value1:"( "+"jsdsakd"+"*"+"shbhxsh"+" )",color:"transparent"},
        {id:5, title: "Invoice", value: '25,000', value1:"( "+"jsdsakd"+"*"+"shbhxsh"+" )", type:"Premium",color:"white" },
        {id:6, title: "Invoice",  value: '25,000', value1:"( "+"jsdsakd"+"*"+"shbhxsh"+" )",color:"transparent"},
        {id:7, title: "Invoice",  value: '25,000', value1:"( "+"jsdsakd"+"*"+"shbhxsh"+" )",color:"transparent"},
        {id:8, title: "Invoice",  value: '25,000', value1:"( "+"jsdsakd"+"*"+"shbhxsh"+" )",color:"transparent"},
    ];
    const quater=[
        {id :"12",date:"jsnvajd",Vreit:"nvzjnvzj"},
        {id :"13",date:"jsnvajd",Vreit:"nvzjnvzj"},
        {id :"14",date:"jsnvajd",Vreit:"nvzjnvzj"},
        {id :"15",date:"jsnvajd",Vreit:"nvzjnvzj"}
    ]

    return(
       <SafeAreaView style={{flex:1}}>
           <View>
           <FlatList horizontal={true} data={DATA} renderItem={({ item }) => (
               <LinearGradient colors={["#0c0808", "#8d8a8a"]} style={styles.vcardcontainer}>
                   <View style={styles.vcardvaluecontainer}>
                       <Text style={styles.vcardtext}>{item.title} </Text>
                       <Text style={{backgroundColor:item.color,color:"black",paddingVertical:1,paddingHorizontal:10,borderRadius:5}}>{item.type}</Text>
                   </View>
                       <Text style={styles.vcardformula}>{item.value1}</Text>
                       <Text style={styles.vcardvalue}>{item.value}</Text>
               </LinearGradient>
               )}/>
           </View>
           <View style={{flex:1,marginBottom:10}}>
           <FlatList data={Data} renderItem={({ item, index }) => (
            <View style={styles.invoicecontainer}>
                <View style={styles.invoiceheader}>
                <Text>{index+1} : {item.title} : </Text>
                    <Text style={styles.invoiceheadervalue}>( ${item.value} )</Text>
                </View>

                <TouchableOpacity style={styles.invoicebtncontainer} onPress={()=>{setModalVisible(true),setItem(item),setIndex(index)}}>
                    <Ionicons name="newspaper-outline" color="white" size={18} style={styles.invoicebtnicon}/>
                    <Text style={styles.invoicebtntext}>Invoice</Text>
                </TouchableOpacity>

                <List.Section style={styles.listcontainer}>
                    <List.Accordion title="Quaterly Bonus VREITS" titleStyle={styles.listtitlestyle}>
                        <FlatList data={quater} renderItem={({ item, index }) => (
                                <View style={styles.listviewcontainer}>
                                    <View style={styles.listimageconstainer}>
                                        <Image source={require('../Assets/Logo.png')} style={styles.listimage}/>
                                    </View>
                                    <View style={styles.listquaterconatiner}>
                                        <Text style={styles.quaterdate}>Quater Date:</Text>
                                        <Text style={styles. quaterdatevalue}>{item.date}</Text>
                                    </View>
                                    <View style={styles.listquaterconatiner}>
                                        <Text style={styles.listvreit}>VREIT: {item.Vreit}</Text>
                                        <Text style={styles.listvreitshifted}>Vreit Shifted</Text>
                                    </View>
                                </View>
                            )}/>
                    </List.Accordion>
                </List.Section>

                {/*<TouchableOpacity style={styles.invoicefooter}  onPress={()=>{setOpacity(item.id);changeLayout({item});}}>*/}
                {/*    <Text style={styles.invoicefootertext}>Quaterly Bonus VREITS</Text>*/}
                {/*    <Ionicons name="chevron-down-circle-sharp" size={20}/>*/}
                {/*</TouchableOpacity>*/}
                {/*<View style={{height:item.id===opacity && expanded ? null : 0, overflow:"hidden"}}>*/}
                {/*    <FlatList data={quater} renderItem={({ item, index }) => (*/}
                {/*        <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,marginVertical:5}}>*/}
                {/*            <View style={{flex:1,marginVertical:10}}>*/}
                {/*                <Image source={require('../Assets/Logo.png')} style={{width:50,height:50,resizeMode:'contain'}}/>*/}
                {/*            </View>*/}
                {/*            <View style={{flex:2}}>*/}
                {/*                <Text style={{fontWeight:'bold'}}>Quater Date:</Text>*/}
                {/*                <Text style={{color:"#666262"}}>{item.date}</Text>*/}
                {/*            </View>*/}
                {/*            <View style={{flex:2}}>*/}
                {/*                <Text style={{fontWeight:'normal'}}>VREIT: {item.Vreit}</Text>*/}
                {/*                <Text style={{backgroundColor:"green",color:"white", borderRadius:5,alignSelf:"flex-start",paddingHorizontal:10}}>Vreit Shifted</Text>*/}
                {/*            </View>*/}
                {/*        </View>*/}
                {/*    )}/>*/}
                {/*</View>*/}
            </View>
                )}/>
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
                   <View style={styles. invoicemodalheader}>
                       <Text>{index+1} : {item.title} : </Text>
                       <Text style={styles.invoiceheadervalue}>( ${item.value} )</Text>
                   </View>
                   <MText text1={"Start At"} text2={item.transactions} />
                   <MText text1={"Assigned VREITS"} text2={item.transactions} backgroundColor={"#bfbfbf"} />
                   <MText text1={"Bonus VREITS"} text2={item.total}  />
                   <MText text1={"Shifted VREITS"} text2={parseFloat(item.percent_70).toFixed(1)+'%'} backgroundColor={"#bfbfbf"} />
                   <MText text1={"Pin#"} text2={parseFloat(item.percent_30).toFixed(1)+'%'}  />
                   <MText text1={"Expiry At"} text2={item.closing_date} backgroundColor={"#bfbfbf"} />
               </View>
           </Modal>

       </SafeAreaView>
    )
}
