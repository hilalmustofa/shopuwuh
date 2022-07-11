import axios from "axios";
let token = JSON.parse(localStorage.getItem("token"));

var myAxios = axios.create({
    headers: { 'Authorization': `Bearer ${token}` }
});

export default myAxios;