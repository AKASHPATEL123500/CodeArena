import { createContext, useContext, useEffect, useState } from "react"
import API from "../utils/api"

const AuthContext = createContext( null )

export const AuthProvider = ( { children } ) => {
    const [ user, setUser ] = useState( null )
    const [ loading, setLoading ] = useState( true )

    useEffect( () => {
        fetchProfile()
    }, [] )

    // --- UPDATED fetchProfile ---
    const fetchProfile = async () => {
        try {
            const res = await API.get( "/user/profile" )
            setUser( res.data.data.data )
        } catch ( error ) {
            console.error( "Profile fetch failed, trying refresh...", error );

            // 🛑 AGAR PROFILE NA MILE, REFRESH TOKEN TRY KARO
            await tryRefreshToken();
        } finally {
            setLoading( false )
        }
    }

    // --- NEW Function: tryRefreshToken ---
    const tryRefreshToken = async () => {
        try {
            // Backend pe refresh route call karo
            await API.post( "/auth/refresh-token" );
            // Agar refresh ho gaya, toh profile dubara fetch karo
            const res = await API.get( "/user/profile" )
            setUser( res.data.data.data )
        } catch ( refreshError ) {
            console.error( "Refresh token failed, logging out.", refreshError );
            // 🛑 REFRESH BHI FAIL, TAB HI USER NULL KARO
            logout();
        }
    }

    const login = ( userData, accessToken ) => {
        if ( accessToken ) {
            localStorage.setItem( "accessToken", accessToken )
            API.defaults.headers.common[ "Authorization" ] = `Bearer ${ accessToken }`
        }
        if ( userData ) {
            setUser( userData )
        } else {
            fetchProfile()
        }
    }

    const logout = async () => {
        try {
            await API.post( "/auth/logout" )
        } catch ( e ) { console.error( "Logout API fail", e ) }
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