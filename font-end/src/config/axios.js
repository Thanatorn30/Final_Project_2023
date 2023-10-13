import axios from 'axios';

const post = async (path,input)=>{
    try{
        axios.post(path,input)
        console.log('Post success');

    }catch(err){
        console.log(err)
    }
}

export default post

