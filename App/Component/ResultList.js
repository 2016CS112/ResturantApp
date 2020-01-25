import React from 'react';
import {View , Text , StyleSheet , FlatList, TouchableOpacity} from 'react-native';
import ResultDetail from './ResultDetail';
//import {withNavigation} from 'react-navigation' /// Function that 
//Help to wrap up with the navigation Props

const ResultList = ({title , results , navigation}) =>{
    return(
        <View style = {Style.container}>
            <Text style = {Style.title}>
                {title}
                </Text>
                {/* <Text>
                    Results: {results.length}
                    </Text> */}
                    <FlatList
                    showsHorizontalScrollIndicator = {false}
                    horizontal = {true}
                    data = {results}
                    keyExtractor = {(res)=>res.id}
                    renderItem= {({item}) => {
                        return(
                            <TouchableOpacity onPress = {()=>navigation.navigate('ShowResult' , {id:item.id})}>
                            <ResultDetail result = {item} />
                            </TouchableOpacity>
                        )
                        
                    }}
                    />
        </View>
    )
}

const Style = StyleSheet.create({
    title:{
        marginBottom:5,
        fontSize:18,
        fontWeight:'bold',
        marginLeft:15
    },
    container:{
        marginBottom:10
    }
})


export default ResultList;