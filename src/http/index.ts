import axios from 'axios';

const $api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000'
})

$api.defaults.headers.get['Accept'] = 'application/json';
$api.defaults.headers.post['Accept'] = 'application/json';

export default $api