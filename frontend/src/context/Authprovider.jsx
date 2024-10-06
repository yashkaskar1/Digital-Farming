import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
export const AuthContext=createContext()
export const Authprovider = ({children}) => {
const [agriculture,setagriculture]=useState()
useEffect(()=>{
    const fetchagriculture=async () => {
        try {
            const response=await axios.get("http://localhost:4001/api/agrishare/all-farmingInfo")
            console.log(response)
            setagriculture(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchagriculture();
},[])


  return (
    <AuthContext.Provider value={{agriculture}}>{children}</AuthContext.Provider>
  );
};
export const useAuth=()=>useContext(AuthContext)
