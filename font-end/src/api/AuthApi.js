import axios from "../config/axios";


export const test = input => axios.get('/register', input);