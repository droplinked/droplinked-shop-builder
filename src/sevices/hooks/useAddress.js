
import { useContext } from 'react';
import { AddressContext } from '../context/AddressContext';

export const useAddress = () => {
   
    const atx = useContext(AddressContext)

    return {
        ...atx
    }
}