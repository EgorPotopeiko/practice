import axios from 'axios';

const $api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api'
})

$api.defaults.headers.get['Accept'] = 'application/json';
$api.defaults.headers.post['Accept'] = 'application/json';

// $api.interceptors.request.use((config: any) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config;
// })

export default $api