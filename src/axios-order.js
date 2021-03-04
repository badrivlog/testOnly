import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://badri-firegram.firebaseio.com/'
});

export default instance;