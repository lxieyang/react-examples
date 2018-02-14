import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-ff530.firebaseio.com/'
});

export default instance;