import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions,
    FlatList,
    ActivityIndicator
} from 'react-native';
import styles from "../StyleSheet/Style";
import Textarea from 'react-native-textarea';
import {backgroundColor} from "react-native-calendars/src/style";
import VBtn from "../Components/VreitLogsBtn";
import {GETAPI} from "../API/APIResponse";
import Ionicons from "react-native-vector-icons/Ionicons";
import MText from "../Components/ModalText";
import Modal from "react-native-modal";
import MD from "../Components/ModalDetails";

export default VreitLogs = () => {
    const [btn, setBtn] = useState(0);
    const [apivalue,setApivalue]=useState('shifted')
    const [data,setData]=useState([])
    const [item,setItem]=useState('')
    const [isModalVisible, setModalVisible] = useState(false);
    const [shiftdata,setShiftdata]=useState([])
    const [swappdata,setSwapdata]=useState([])
    const [transferdata,setTransferdata]=useState([])
    const [walletdata,setWalletdata]=useState([])
    const [purchaseddata,setPurchaseddata]=useState([])
    const [recievedata,setRecievedata]=useState([])
    const [loading, setLoading] = useState(true);
    const Button = [{id: 1, title: "Shifted",value:"shifted"}, {id: 2, title: "Swapped",value:"swapped"}, {id: 3, title: "Wallet",value: "wallet"}, {id: 4, title: "Purchased",value: "purchased"}, {id: 5, title: "Transfer",value: "transfer"}, {id: 6, title: "Recieved",value: "recieved"}]
   useEffect(async ()=>{
       await response();
   },[])
    const response =async () => {

            const shift = await GETAPI('/api/vreits-logs/shifted');
            setLoading(false)
            setShiftdata(shift.data.shifted)
            const swapp = await GETAPI('/api/vreits-logs/swapped');
            setSwapdata(swapp.data.swapped)
            const transfer = await GETAPI('/api/vreits-logs/transfer');
            setTransferdata(transfer.data.transfer)
            const wallet = await GETAPI('/api/vreits-logs/wallet');
            setWalletdata(wallet.data.wallet)
            const purchase = await GETAPI('/api/vreits-logs/purchased');
            setPurchaseddata(purchase.data.purchased)
            const recieve = await GETAPI('/api/vreits-logs/received');
            setRecievedata(recieve.data.received)

    }
    return (
        <SafeAreaView style={{flex:1}} >
            <View>
            <ScrollView horizontal={true}>
                <View style={{flexDirection: "row",marginVertical:10}}>
                    {Button.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{height: 40, borderWidth: 1, width: 80, alignItems: "center", justifyContent: "center", marginHorizontal: 5, borderRadius:5,backgroundColor:(index==btn)?"black":"white"}}
                            onPress={()=>{setBtn(index),setApivalue(item.value),response()}}>
                            <Text style={{color:(index==btn)?"white":"black",fontSize:15}}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
            </View>
            </ScrollView>
            </View>
            {btn==0?
                    <FlatList data={shiftdata}
                              renderItem={({ item }) => (
                                  <TouchableOpacity onPress={() => {setItem(item),setModalVisible(true)}} style={styles.allcomreportlist}>
                                      <Text style={styles.comitem}>Code ({item.code})</Text>
                                      <Text>Shifted At: {item.shifted_at}</Text>
                                  </TouchableOpacity>
                              )}
                    />
                : btn==1?
                        <FlatList data={swappdata}
                                  renderItem={({ item }) => (
                                      <TouchableOpacity onPress={() => {setItem(item),setModalVisible(true)}} style={styles.allcomreportlist1}>
                                          <Text style={styles.comitem}>Code ({item.code})</Text>
                                          <Text>Swapped At: {item.swapped_at}</Text>
                                      </TouchableOpacity>
                                  )}
                        />
                   : btn==2?
                            <FlatList data={walletdata}
                                      renderItem={({ item }) => (
                                          <TouchableOpacity onPress={() => {setItem(item),setModalVisible(true)}} style={styles.allcomreportlist}>
                                              <Text style={styles.comitem}>Code ({item.code})</Text>
                                              <Text>Wallet At: {item.wallet_at}</Text>
                                          </TouchableOpacity>
                                      )}
                            />

                        : btn==3?
                            <View style={{ marginVertical: 10, }}>
                                <FlatList data={purchaseddata}
                                          renderItem={({ item }) => (
                                              <TouchableOpacity onPress={() => {setItem(item),setModalVisible(true)}} style={styles.allcomreportlist}>
                                                  <Text style={styles.comitem}>Code ({item.code})</Text>
                                                  <Text>Purchased At: {item.purchased_at}</Text>
                                              </TouchableOpacity>
                                          )}
                                />
                            </View>
                            : btn==4?
                                    <FlatList data={transferdata}
                                              renderItem={({ item }) => (
                                                  <TouchableOpacity onPress={() => {setItem(item),setModalVisible(true)}} style={styles.allcomreportlist}>
                                                      <Text style={styles.comitem}>Code ({item.code})</Text>
                                                      <Text>Transfer At: {item.transfer_at}</Text>
                                                  </TouchableOpacity>
                                              )}
                                    />
                                : btn==5?
                                    <FlatList data={recievedata}
                                              renderItem={({ item }) => (
                                                  <TouchableOpacity onPress={() => {setItem(item),setModalVisible(true)}} style={styles.allcomreportlist}>
                                                      <Text style={styles.comitem}>Code ({item.code})</Text>
                                                      <Text>Received At: {item.received_at}</Text>
                                                  </TouchableOpacity>
                                              )}
                                    />
                               :<View></View>
            }
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalmaincontainer}>
                    {btn==1?
                        <View>
                            <MD text1={"Details"} text2={item.details?item.details:"Not Available"} />
                            <MD text1={"Feedback"} text2={item.admin_feed?item.admin_feed:"Not Available"} />
                        </View>
                        : btn==2?
                            <View>
                                <MD text1={"Details"} text2={item.details?item.details:"Not Available"} />
                                <MD text1={"Feedback"} text2={item.admin_feed?item.admin_feed:"Not Available"} />
                            </View>
                            : btn==3?
                                <MD text1={"Details"} text2={item.details?item.details:"Not Available"} />
                                : btn==4?
                                    <View>
                                        <MD text1={"Details"} text2={item.details?item.details:"Not Available"} />
                                        <MD text1={"Feedback"} text2={item.admin_feed?item.admin_feed:"Not Available"} />
                                    </View>:
                                    btn==5?<MD text1={"Details"} text2={item.details?item.details:"Not Available"} />:<View></View>
                    }
                    <ScrollView style={{marginBottom:20,}}>
                    <View style={styles.modaluser}>
                        <View style={styles.modalh}>
                            <Ionicons name="person" size={15} color="white" />
                            <Text style={styles.modalhtext}>User</Text>
                        </View>
                        <TouchableOpacity style={styles.modaliconclose} onPress={() => {setModalVisible(false)}}>
                            <Ionicons name="close" size={15} color="white" style={{ margin: 5, borderRadius: 50 }} />
                        </TouchableOpacity>
                    </View>
                        {
                        btn==0?
                            <View>
                            <MText text1={"Code"} text2={item.code?item.code:""}/>
                            <MText text1={"Quarter Date"} text2={item.quarter_date?item.quarter_date:""} backgroundColor={'#d4d0d0'}/>
                            <MText text1={"Points"} text2={item.vreit_points?item.vreit_points:""}/>
                            <MText text1={"Token Price"} text2={item.vreit_price?item.vreit_price:""} backgroundColor={'#d4d0d0'}/>
                            <MText text1={"Est Amount"} text2={item.vreit_amount?item.vreit_amount:""}/>
                            <MText text1={"Shifted At"} text2={item.shifted_at?item.shifted_at:""} backgroundColor={'#d4d0d0'}/>
                            </View>
                            : btn==1?
                            <View>
                            <MText text1={"Code"} text2={item.code?item.code:""} backgroundColor={'#d4d0d0'}/>
                            <MText text1={"Points"} text2={parseFloat(item.vreit_points?item.vreit_points:"").toFixed(2)} />
                            <MText text1={"Token Price"} text2={item.vreit_price?item.vreit_price:""}  backgroundColor={'#d4d0d0'}/>
                            <MText text1={"Est Amount"} text2={item.vreit_amount?item.vreit_amount:""}/>
                                <MText text1={"Type"} text2={item.type?item.type:""} backgroundColor={'#d4d0d0'}/>
                                <MText text1={"Action By"} text2={item.action_by_name?item.action_by_name:""} />
                                {/*<MText text1={"Details"} text2={item.details?item.details:""} backgroundColor={'#d4d0d0'}/>*/}
                                {/*<MText text1={"Feedback"} text2={item.admin_feed?item.admin_feed:""}/>*/}
                            <MText text1={"Swapped At"} text2={item.swapped_at?item.swapped_at:""} backgroundColor={'#d4d0d0'}/>
                            </View>
                            :btn==2?
                                    <View>
                                        <MText text1={"Code"} text2={item.code?item.code:""} backgroundColor={'#d4d0d0'}/>
                                        <MText text1={"Points"} text2={item.vreit_points?item.vreit_points:""} />
                                        <MText text1={"Token Price"} text2={item.vreit_price?item.vreit_price:""} backgroundColor={'#d4d0d0'}/>
                                        <MText text1={"Est Amount"} text2={item.vreit_amount?item.vreit_amount:""} />
                                        {/*<MText text1={"Details"} text2={item.details?item.details:""} backgroundColor={'#d4d0d0'}/>*/}
                                        <MText text1={"Status"} text2={item.status?item.status:""} backgroundColor={'#d4d0d0'}/>
                                        <MText text1={"Action By"} text2={item.action_by?item.action_by:""} />
                                        {/*<MText text1={"Feedback"} text2={item.admin_feed?item.admin_feed:""}/>*/}
                                        <MText text1={"Swapped At"} text2={item.wallet_at?item.wallet_at:""} backgroundColor={'#d4d0d0'}/>
                                    </View>
                                    :btn==3?
                                    <View>
                                        <MText text1={"Code"} text2={item.code?item.code:""} backgroundColor={'#d4d0d0'}/>
                                        <MText text1={"Package"} text2={item.packaage?item.package:""}  />
                                        <MText text1={"Points"} text2={item.vreit_points?item.vreit_points:""} backgroundColor={'#d4d0d0'}/>
                                        <MText text1={"Token Price"} text2={item.vreit_price?item.vreit_price:""} />
                                        <MText text1={"Est Amount"} text2={item.vreit_amount?item.vreit_amount:""} backgroundColor={'#d4d0d0'}/>
                                        {/*<MText text1={"Details"} text2={item.details?item.details:""}  backgroundColor={'#d4d0d0'} />*/}
                                        <MText text1={"Status"} text2={item.status?item.status:""} />
                                        <MText text1={"Purchased At"} text2={item.purchased_at?item.purchased_at:""} backgroundColor={'#d4d0d0'}/>
                                    </View>
                                    :btn==4?
                                        <View>
                                            <MText text1={"Code"} text2={item.code?item.code:""} backgroundColor={'#d4d0d0'}/>
                                            <MText text1={"Reciever"} text2={item.v_wallet_id?item.v_wallet_id:""} />
                                            <MText text1={"Points"} text2={item.vreit_points?item.vreit_points:""} backgroundColor={'#d4d0d0'}/>
                                            <MText text1={"Token Price"} text2={item.vreit?item.vreit:"_price?:"} />
                                            <MText text1={"Est Amount"} text2={item.vreit_amount?item.vreit_amount:""} backgroundColor={'#d4d0d0'}/>
                                            <MText text1={"Status"} text2={item.status?item.status:""} />
                                            {/*<MText text1={"Action By"} text2={item.vreit_amount} backgroundColor={'#d4d0d0'}/>*/}
                                            {/*<MText text1={"Details"} text2={item.details?item.details:""} backgroundColor={'#d4d0d0'}/>*/}
                                            {/*<MText text1={"Feedback"} text2={item.admin_feed?item.admin_feed:""}/>*/}
                                            <MText text1={"Transfer At"} text2={item.transfer_at?item.transfer_at:""} backgroundColor={'#d4d0d0'}/>

                                        </View>
                                            :btn==5?
                                            <View>
                                                <MText text1={"Code"} text2={item.code?item.code:""} />
                                                <MText text1={"Sender"} text2={item.user_name?item.user_name:""} backgroundColor={'#d4d0d0'} />
                                                <MText text1={"Points"} text2={item.vreit_points?item.vreit_points:""} />
                                                <MText text1={"Token Price"} text2={item.vreit_price?item.vreit_price:""} backgroundColor={'#d4d0d0'}/>
                                                <MText text1={"Est Amount"} text2={item.vreit_amount?item.vreit_amount:""} />
                                                {/*<MText text1={"Details"} text2={item.details?item.details:""} />*/}
                                                <MText text1={"Recieved At"} text2={item.vreit_amount?item.vreit_amount:""} backgroundColor={'#d4d0d0'}/>
                                            </View>:<View></View>
                    }
                    </ScrollView>
                </View>
            </Modal>
            <ActivityIndicator animating={loading} size="large" color="black" style={styles.activityind} />
        </SafeAreaView>

    )
}
