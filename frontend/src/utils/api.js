import axios from "axios"

const API = axios.create( {
  baseURL: "http://localhost:15000/api/v1",
  withCredentials: true,
} )

// Request interceptor
API.interceptors.request.use(
  ( config ) => {
    const token = localStorage.getItem( "accessToken" )
    if ( token ) {
      config.headers.Authorization = `Bearer ${ token }`
    }
    return config
  },
  ( error ) => Promise.reject( error )
)

// Response interceptor - auto refresh token on 401
API.interceptors.response.use(
  ( response ) => response,
  async ( error ) => {
    const original = error.config
    if ( error.response?.status === 401 && !original._retry ) {
      original._retry = true
      try {
        const res = await axios.post(
          "http://localhost:15000/api/v1/auth/refresh-token",
          {},
          { withCredentials: true }
        )
        const newToken = res.data.data.accessToken
        localStorage.setItem( "accessToken", newToken )
        original.headers.Authorization = `Bearer ${ newToken }`
        return API( original )
      } catch ( err ) {
        localStorage.removeItem( "accessToken" )
        window.location.href = "/login"
        return Promise.reject( err )
      }
    }
    return Promise.reject( error )
  }
)

export default API