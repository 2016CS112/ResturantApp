import React , {Component } from 'react';
import {Text,StyleSheet , View,TextInput } from 'react-native';
import {Feather} from '@expo/vector-icons';

const  SearchBar = ({ontermChange , onEnd , term}) =>{
        return(
             <View style={Style.background}>
                 <Feather name = "search"  style= {Style.iconstyle} />
                    <TextInput 
                    style= {Style.txtStyle}
                    placeholder = "Search Here!" 
                    value = {term}
                    onChangeText = {term => ontermChange(term)}
                    onEndEditing = {() =>onEnd()}
                    >
                    </TextInput>
                </View>
        
        )    
}


export default  SearchBar;

const Style = StyleSheet.create({
    background:{
        backgroundColor:'#808e9b',
        borderRadius:5,
        marginHorizontal:10,
        height:50, 
        flexDirection:'row',
        marginTop:10,
        marginBottom:10
    },
    txtStyle:{
        flex:1,
        fontSize:18 
    },
    iconstyle:{
        fontSize:35,
        alignSelf:'center'
    }
})