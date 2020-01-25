import React from 'react';
import {Image, View , Text, StyleSheet} from 'react-native';

const ResultDetail = ({result}) =>
{
    return(
            <View style = {Style.container}> 
                <Image style = {Style.image} source={{uri: result.image_url }}/>
                <Text style = {Style.txt}>
                    {result.name}
                </Text>
                <Text>
                    {result.rating} Stars , {result.review_count} Review
                </Text>
            </View>
        
    )
}

const Style = StyleSheet.create(
    {
        container:
        {
            marginLeft:15
        },
        image:{
            height:150,
            width:200,
            borderRadius:4,
           
        },
        txt:
        {
            fontWeight:'bold'
        }
    }
);


export default ResultDetail;