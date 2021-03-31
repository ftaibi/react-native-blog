import axios from 'axios'

export default axios.create({
    // remeber this ngrok url expires 
    baseURL: 'http://1e9e4442801d.ngrok.io'
})