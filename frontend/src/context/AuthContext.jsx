import { createContext, useContext, useEffect, useState } from "react"
import API from "../utils/api"

const AuthContext = createContext( null )

export const AuthProvider = ( { children } ) => {
    const [ user, setUser ] = useState( null )
    const [ loading, setLoading ] = useState( true )

    // App start hone pe profile fetch karo — backend cookies use karta hai (httpOnly)
    // isliye sirf fetchProfile kafi hai, token check ki zarurat nahi
    useEffect( () => {
        fetchProfile()
    }, [] )

    const fetchProfile = async () => {
        try {
            const res = await API.get( "/user/profile" )
            // Backend response: { data: { data: userObject } }
            setUser( res.data.data.data )
        } catch {
            setUser( null )
        } finally {
            setLoading( false )
        }
    }

    // Normal login / passkey login ke baad call karo
    // userData seedha set karo agar available hai
    // token bhi save karo Authorization header ke liye (backup)
    const login = ( userData, accessToken ) => {
        if ( accessToken ) {
            localStorage.setItem( "accessToken", accessToken )
            // axios interceptor mein bhi update karo
            API.defaults.headers.common[ "Authorization" ] = `Bearer ${ accessToken }`
        }
        if ( userData ) {
            setUser( userData )
        } else {
            // userData nahi hai (e.g. 2FA / passkey) — cookies set ho chuki hain backend se
            // fresh profile fetch karo
            fetchProfile()
        }
    }

    const logout = async () => {
        try {
            await API.post( "/auth/logout" )
        } catch { }
        localStorage.removeItem( "accessToken" )
        delete API.defaults.headers.common[ "Authorization" ]
        setUser( null )
    }

    return (
        <AuthContext.Provider value={ { user, setUser, login, logout, loading, fetchProfile } }>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext( AuthContext )