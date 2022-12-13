import { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext()

export function AuthProvider(props) {

    const tokenLocalStorage = localStorage.getItem('token')
    const [token, setToken] = useLocalStorage('token', tokenLocalStorage === null ? '' : tokenLocalStorage)

    function addToken(token) {
        setToken(token)
    }

    function removeToken() {
        setToken('')
    }

    return (
        <AuthContext.Provider value={{token, addToken, removeToken}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}