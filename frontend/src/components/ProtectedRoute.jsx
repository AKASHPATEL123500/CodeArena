import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ( { children } ) => {
    const { user, loading } = useAuth()

    if ( loading ) {
        return (
            <div
                style={ {
                    minHeight: "100vh",
                    background: "#0f0f0f",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#4ade80",
                    fontFamily: "'Segoe UI', sans-serif",
                    fontSize: 16,
                } }
            >
                Loading...
            </div>
        )
    }

    if ( !user ) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute