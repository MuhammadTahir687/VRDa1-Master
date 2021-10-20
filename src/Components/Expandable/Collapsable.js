import React, {Component,useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
    TouchableOpacity,
    SafeAreaView, FlatList, Image,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Application () {
       const [expanded,setExpanded]=useState(false)

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }


   const changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded)
    }
    const quater=[
        {date:"jsnvajd",Vreit:"nvzjnvzj"},
        {date:"jsnvajd",Vreit:"nvzjnvzj"},
        {date:"jsnvajd",Vreit:"nvzjnvzj"},
        {date:"jsnvajd",Vreit:"nvzjnvzj"}
    ]
        return (
            <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.btnTextHolder}>
                    <TouchableOpacity style={styles.invoicefooter}>
                        <Text style={styles.invoicefootertext}>Quaterly Bonus VREITS</Text>
                        <Ionicons name="chevron-down-circle-sharp" size={20}/>
                    </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={changeLayout}
                    style={styles.Btn}>
                <Text style={styles.btnText}>Expand / Collapse</Text>
                </TouchableOpacity>
                <View style={{height: expanded ? null : 0, overflow: 'hidden'}}>
                    <FlatList data={quater} renderItem={({ item, index }) => (
                        <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,marginVertical:5}}>
                            <View style={{flex:1,marginVertical:10}}>
                                <Ionicons name="copy"/>
                                {/*<Image source={require('')} style={{width:50,height:50,resizeMode:'contain'}}/>*/}
                            </View>
                            <View style={{flex:2}}>
                                <Text style={{fontWeight:'bold'}}>Quater Date:</Text>
                                <Text style={{color:"#666262"}}>{item.date}</Text>
                            </View>
                            <View style={{flex:2}}>
                                <Text style={{fontWeight:'normal'}}>VREIT: {item.Vreit}</Text>
                                <Text style={{backgroundColor:"green",color:"white", borderRadius:5,alignSelf:"flex-start",paddingHorizontal:10}}>Vreit Shifted</Text>
                            </View>
                        </View>
                    )}/>
                </View>
            </View>
            </View>
            </SafeAreaView>
        );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    text: {fontSize: 17, color: 'black'},
    btnText: {textAlign: 'center', color: 'white', fontSize: 20},
    btnTextHolder: {borderWidth: 1, borderColor: 'rgba(0,0,0,0.5)'},
    Btn: {padding: 10, backgroundColor: 'rgba(0,0,0,0.5)'}
});
