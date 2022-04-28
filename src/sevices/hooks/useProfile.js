import { useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';

export const useProfile = () => {
   
    const ctx = useContext(ProfileContext)

    return {
        ...ctx
    }
}