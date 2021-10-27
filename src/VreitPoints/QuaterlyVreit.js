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

export default function QuaterlyVreit({navigation}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [item,setItem]=useState('');
    const [index,setIndex]=useState('');
    const [expanded,setExpanded]=useState(false)
    const [opacity,setOpacity]=useState("");
    const [packagetype,setPackagetype]=useState('');
    const [packageprice,setPackageprice]=useState('');
    const [vreitprice,setVreitprice]=useState('');
    const [avamount,setAvamount]=useState('');
    const [avpoints,setAvpoints]=useState('');
    const [abamount,setAbamount]=useState('');
    const [abpoints,setAbpoints]=useState('');
    const [asamount,setAsamount]=useState('');
    const [aspoints,setAspoints]=useState('');
    const [purchases,setPurchases]=useState([]);
    const [quaters,setQuaters]=useState([])
    const [shifted,setShifted]=useState('');
    const [showcard,setShowcard]=useState(false)
    const [loading, setLoading] = useState(true);



    useEffect(async()=>{await response()},[])
    const response=async()=>{
        const res=await GETAPI("/api/quarterly-vreits")
        setPackagetype(res.data.package.package_name)
        setPackageprice(res.data.package.package_price)
        setVreitprice(res.data.current_vreit_price)
        setAvamount(res.data.total_assigned_vreits.amount.toFixed(5))
        setAvpoints(res.data.total_assigned_vreits.points.toFixed(5))
        setAbamount(res.data.total_bonus_vreits.amount.toFixed(5))
        setAbpoints(res.data.total_bonus_vreits.points)
        setAsamount(res.data.total_shifted_vreits.amount.toFixed(5))
        setAspoints(res.data.total_shifted_vreits.points)
        setPurchases(res.data.purchases)
        setShowcard(true)
        setLoading(false)
        console.log(res.data.current_vreit_price)
    }

    const DATA = [
        { title: "Package", value: packageprice, type:packagetype,color:"white" },
        { title: "Assigned",  value: avamount, value1:"( "+avpoints+"*"+vreitprice+" )",color:"transparent"},
        { title: "Bonus",  value: abamount, value1:"( "+abpoints+"*"+vreitprice+" )",color:"transparent"},
        { title: "Total Shifted Verits",  value: asamount, value1:"( "+aspoints+"*"+vreitprice+" )",color:"transparent"},
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
           <ActivityIndicator animating={loading} size="large" color="black" style={styles.activityind} />
           { showcard===true ? <View>
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
           </View>:<View></View>}
           <View style={{flex:1,marginBottom:10}}>
           <FlatList data={purchases} renderItem={({ item, index }) => (
            <View style={styles.invoicecontainer}>
                <View style={styles.invoiceheader}>
                <Text>{index+1} : Invoice : </Text>
                    <Text style={styles.invoiceheadervalue}>( ${parseFloat(item.purchase_price).toFixed(5)} )</Text>
                </View>
                <TouchableOpacity style={styles.invoicebtncontainer} onPress={()=>{setModalVisible(true),setItem(item),setIndex(index)}}>
                    <Ionicons name="newspaper-outline" color="white" size={18} style={styles.invoicebtnicon}/>
                    <Text style={styles.invoicebtntext}>Invoice</Text>
                </TouchableOpacity>

                <List.Section style={styles.listcontainer}>
                    <List.Accordion title="Quaterly Bonus VREITS" titleStyle={styles.listtitlestyle}>
                        <FlatList data={item.quarters} renderItem={({ item, index }) => (
                                <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,marginVertical:5,backgroundColor:item.shifted==1?"#bfbfbf":"transparent"}}>
                                    <View style={styles.listimageconstainer}>
                                        <Image source={require('../Assets/Logo.png')} style={styles.listimage}/>
                                    </View>
                                    <View style={styles.listquaterconatiner}>
                                        <Text style={styles.quaterdate}>Quater Date:</Text>
                                        <Text style={styles. quaterdatevalue}>{item.date}</Text>
                                    </View>
                                    <View style={styles.listquaterconatiner}>
                                        <Text style={styles.listvreit}>VREIT: {item.quarter_vreits}</Text>
                                        {item.shifted===1&& <TouchableOpacity onPress={()=>{navigation.navigate("Vreit Withdrwal")}}>
                                            <Text style={{backgroundColor:item.shifted==1?"#635e5e":"green",color:"white", borderRadius:5,alignSelf:"flex-start",paddingHorizontal:10}}>Vreit Shifted</Text>
                                        </TouchableOpacity>}

                                    </View>
                                </View>
                            )}/>
                    </List.Accordion>
                </List.Section>
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
                       <Text>{index+1} : Invoice : </Text>
                       <Text style={styles.invoiceheadervalue}>( ${parseFloat(item.purchase_price).toFixed(5)} )</Text>
                   </View>
                   <MText text1={"Start At"} text2={item.start_at} backgroundColor={"#bfbfbf"} />
                   <MText text1={"Assigned VREITS"} text2={item.assigned_vreits}  />
                   <MText text1={"Bonus VREITS"} text2={item.bonus_vreits} backgroundColor={"#bfbfbf"} />
                   <MText text1={"Shifted VREITS"} text2={item.shifted_vreits}  />
                   <MText text1={"Expiry At"} text2={item.expiry_date} backgroundColor={"#bfbfbf"} />
               </View>
           </Modal>

       </SafeAreaView>
    )
}
