import axios from 'axios'

export const login = async (body) => {
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
    ...body
  })
}
