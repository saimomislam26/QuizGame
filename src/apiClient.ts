import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/',
  headers: {
    'Content-type': 'application/json',
  },
})


// If user want to send any extra info with headers

// apiClient.interceptors.request.use(
//   async (config) => {
//     if (localStorage.getItem('userInfo'))
//       config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')!).token
//         }`

//     return config
//   },
//   (error) => {
//     Promise.reject(error)
//   }
// )

export default apiClient