import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function useAuth () {
    return useContext(AuthContext);   
}
//  auth = {verfied: false,
//          unique_ID: "",
//          userName: ""}

export function AuthProvider({children}) {
    
    const [auth, setAuth] = useState([]);

        return (
            
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}