import axios from 'axios';

export default axios.create({
    baseURL:'https://api.yelp.com/v3/businesses',
    headers:{
        Authorization:'Bearer 1XJ0ly2p2kaOAjiwfDaT6KScj5yi6NkttknO3wZROAtaMfOfXIXyE4k399aGDR2nhO4UFvaxBOXXFfiIZNjbNkV6EJt1YF0qA6ThQO7LwGwiAJka6FSeM65XokghXnYx'
    }
})