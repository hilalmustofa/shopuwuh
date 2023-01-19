import axios from "axios";
let token = JSON.parse(localStorage.getItem("token"));

var myAxios = axios.create({
    baseURL: 'http://akuntesterwork-001-site1.ctempurl.com/api',
    headers: { 'Authorization': `Bearer ${token}` }
    
});


export default myAxios;