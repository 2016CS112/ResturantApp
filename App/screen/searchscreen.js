import React , {Component , useState } from 'react';
import {Text, StyleSheet , View,ScrollView } from 'react-native';
import SearchBar from '../Component/SeacrhBar';
import useResults from '../hooks/useResult';
import ResultList from '../Component/ResultList';

const SearchScreen = ({navigation}) =>
{    
    const [term, setterm] = useState('');
    
    const [searchApi , results , errMessage] = useResults();

    const filterByPrice = (price) =>
    {
        return results.filter(result=>{
            return result.price===price;
        });
    }

    
    return(
             <View style = {{flex:1}}>
                 <SearchBar term = {term}
                  ontermChange = {term=>setterm(term)}
                  onEnd = {()=>searchApi()}
                  />

                  {errMessage ? <Text> {errMessage} </Text> : null}
                 {/* <Text style = {{ marginBottom:10 , marginLeft :15}}>
                     We have result with length {results.length}
                      </Text> */}
                      <ScrollView>
                      <ResultList
                      navigation = {navigation} 
                      title = 'Cost Effective' 
                      results = {filterByPrice('$')}
                      />
                      <ResultList navigation = {navigation} title= 'Bit Pricier'     results = {filterByPrice('$$')}  />
                      <ResultList navigation = {navigation} title = 'Big Spender'    results = {filterByPrice('$$$')} />
                      </ScrollView>
                 </View>
        )
}


export default SearchScreen;

