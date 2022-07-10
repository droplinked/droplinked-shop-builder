import { useToasty } from "../../sevices/hooks/useToastify"
import { useEffect } from "react";



export default function PurchasHistoryPage(){

    const { successToast , errorToast } = useToasty();

    //get payment status
    let params = (new URL(document.location)).searchParams;
    let status = params.get('redirect_status') // null or string
    console.log(status); // succeeded

    useEffect(()=>{
        if(status == 'succeeded') successToast("payment successfull") 
    },[])

    return(<>
    </>)
}