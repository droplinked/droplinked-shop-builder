import { createContext, useReducer } from 'react';
import { ProflieReduser } from './ProfileReducer';
import { useState } from "react"

export const ProfileContext = createContext()



const ProfileContextProvider = ({children}) => {
   
const [profile , setProfile] = useState({})
    //const [profile, dispatch] = useReducer(ProflieReduser, {}  ) 
    
    const addProfile = payload => {
        setProfile(payload);
    }

    

    const contextValues = {
        addProfile,
        profile
    } 

    return ( 
        <ProfileContext.Provider value={contextValues} >
            { children }
        </ProfileContext.Provider>
     );
}
 
export default ProfileContextProvider;
