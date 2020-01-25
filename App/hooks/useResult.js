import {useEffect,useState} from 'react';
import yelp from '../api/yelp';

export default () => {
    const [results , setresults] = useState([]);
    const [errMessage , setErrMessage] = useState('');

    const searchApi= async (searchterm) =>
    {
        try{
            const res = await yelp.get('/search' , {
                params:{
                    limit:50,
                    term:searchterm,
                    location:'san jose'
                }
            });
            setresults(res.data.businesses);
        }catch(err){
            setErrMessage('Something went wrong...');
        }
    }

    useEffect(()=>{
        searchApi('pasta');
    }, []);

    return [searchApi , results , errMessage]

}