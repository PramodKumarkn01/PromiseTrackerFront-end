import React,{createContext, useState} from "react";

export const Authcontext = createContext ();

const AuthProvider = ({childern}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userToken, setUsertoken] = useState(null);
    const login = () =>{
        setUsertoken('sachi');
        setIsLoading(false);

    }
    const logout = () =>{
        setUsertoken(null);
        setIsLoading(false);
        
    }
    return(
        <AuthProvider.Provider value={{login, logout}}>
            {childern}
        </AuthProvider.Provider>
    );
}