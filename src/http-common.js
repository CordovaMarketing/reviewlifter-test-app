import axios from 'axios'
import store from './store/store'

export const HTTP = axios.create({
  baseURL: `https://review-lifter-test-api.herokuapp.com/`
})

export const intercept = HTTP.interceptors.response.use(null, (error) => {
  if (error.response.status === 401) {
    alert('You session has expired. Please logout and log back in.')
    // store.dispatch('signOut')
  }
})