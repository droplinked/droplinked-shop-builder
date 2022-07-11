import { useContext } from 'react';
import { OrderContext } from '../context/OrdersContext';

export const useOrder = () => {
   
    const ctx = useContext(OrderContext)

    return {
        ...ctx
    }
}