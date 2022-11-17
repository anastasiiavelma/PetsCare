import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000'
})

axios.get('/articles')

export default instance
