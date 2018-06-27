import axios from 'axios'

// https://review-lifter-test-api.herokuapp.com/
export const HTTP = axios.create({
<<<<<<< HEAD
  baseURL: `https://review-lifter-prod-api.herokuapp.com/`
=======
  baseURL: `https://review-lifter-test-api.herokuapp.com/`
>>>>>>> 1a1e0a21198786eb93f9829a0d4ac31a0ae5036c
})

export const intercept = HTTP.interceptors.response.use(null, (error) => {
  if (error.response.status === 401) {
    alert('You session has expired. Please logout and log back in.')
    // store.dispatch('signOut')
  }
})
