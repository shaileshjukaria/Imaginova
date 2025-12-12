import React from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit , setCredit] = useState(0);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const loadCreditsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/credits', {
                headers: {token}});
            console.log('Credits API response:', data);
            if(data.sucess) {
                setCredit(data.credits);
                setUser(data.user);
            } else {
                console.error('API returned error:', data.message);
            }
        } catch (error) {
            console.log('Credits API error:', error);
            toast.error(error.message);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
        toast.success("Logged out successfully");
    }

    useEffect(() => {
        if(token){
            loadCreditsData();
        }
    }, [token]);


    const value = {
        user,setUser,showLogin,setShowLogin, backendUrl,
         token, setToken, credit, setCredit, loadCreditsData, logout
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;