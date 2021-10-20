import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from "react-native";
import {ExpandableListView} from 'react-native-expandable-listview';
import styles from "../StyleSheet/Style";
import Ionicons from "react-native-vector-icons/Ionicons";

const quater=[
    {date:"jsnvajd",Vreit:"nvzjnvzj"},
    {date:"jsnvajd",Vreit:"nvzjnvzj"},
    {date:"jsnvajd",Vreit:"nvzjnvzj"},
    {date:"jsnvajd",Vreit:"nvzjnvzj"}
]
const CONTENT = [
    {
        id: '95',
        categoryName: 'Item 2',
        customItem: (
            <View style={{flex:1,flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={styles.invoicefootertext}>Quaterly Bonus VREITS</Text>
                <Ionicons name="chevron-down-circle-sharp" size={20}/>
            </View>
        ),
        subCategory: [{
            customInnerItem: (
                <FlatList data={quater} renderItem={({ item, index }) => (
                    <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,marginVertical:5}}>
                        <View style={{flex:1,marginVertical:10}}>
                            <Image source={require('../Assets/Logo.png')} style={{width:50,height:50,resizeMode:'contain'}}/>
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
            ),
            id: '1', name: 'Sub Item 1',title:"invoice"}],
    },
];
 export default function ExpComponent() {
    function handleItemClick({index}) {
        console.log(index);
    };

    function handleInnerItemClick({innerIndex, item, itemIndex}) {
    };

        return (
            <ExpandableListView
                data={CONTENT}
                animated={false}
                itemContainerStyle={{backgroundColor:"transparent"}}
            />
        );
}
