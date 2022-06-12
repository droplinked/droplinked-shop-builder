import { useContext } from 'react';
import { toastValue } from "../context/Toast-context"

export function useToasty(){

    const toast = useContext(toastValue);

    return { ...toast }

}