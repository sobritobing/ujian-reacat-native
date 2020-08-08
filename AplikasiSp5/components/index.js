import React from 'react'
import {ImageBackground, StyleSheet, Text, View, ImageBackgroundBase} from 'react-native';
import {createStackNavigator } from '@react-navigation/stack';


const image={uri : "https://pbs.twimg.com/media/EWREGQsUcAEBwcn.jpg"};
const HomeStact = createStackNavigator()

export default function Header(){
    return (
        <View style={styles.header}>
        <Text style={styles.title}>Aplikasi Pemersatu Bangsa</Text>
        </View>
    )
}
const styles =StyleSheet.create({
    Header:{
        height:80,
        width: 420,
        backgroundColor:'yellow'
    },
    title:{
        textAlign:'center',
        alignItems: 'center',
        color:'red',
        fontSize:20,
        fontWeight:'bold',
        fontFamily:'sans-serif'
    },
    image:{
        flex:1,
        resizeMode:"cover",
        justifyContent:"center"
    }
});