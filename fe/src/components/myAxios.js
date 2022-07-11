import axios from "axios";
let token = JSON.parse(localStorage.getItem("token"));

var myAxios = axios.create({
    baseURL: 'https://shopuwuh.herokuapp.com',
    timeout: 1000,
    headers: { 'Authorization': `Bearer ${token}` }
});

export default myAxios;