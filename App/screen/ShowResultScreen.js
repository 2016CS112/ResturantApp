import React , {useState,useEffect} from 'react';
import {Text , View , StyleSheet ,FlatList , Image} from 'react-native';
import yelp from '../api/yelp';

const ShowResultScreen = ({navigation}) =>
{
    const id = navigation.getParam('id');

    const [results ,setresults] = useState(null);

    console.log(results);

    const getresult = async (id) =>
    {
        const res = await yelp.get(`/${id}`);
        setresults(res);
    }

    useEffect(()=>
    {
        getresult(id);
    }, []);

    if(!results)
    {
        return null;
    }


    return (
        <View> 
        <Text>{results.name}</Text>
        <FlatList
        showsVerticalScrollIndicator = {false}
        data= {results.photos}
        keyExtractor = {(item) => item }
        renderItem = {({item})=>{
        return <Image style = {Style.img} source = {{uri:item}}/>
        }
    }
        />
                </View>
    )
}


const Style = StyleSheet.create({
    img:{
        height:200,
        width:150
    }
})

export default ShowResultScreen;