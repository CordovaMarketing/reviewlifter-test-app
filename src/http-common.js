import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `https://review-lifter-test-api.herokuapp.com/`
})
