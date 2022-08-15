import {  useEffect, useContext } from "react"
import { toastValue } from "../../context/toastify/ToastContext"
import { useParams, useNavigate } from "react-router-dom";
import { emailVerify } from "../../api/base-user/Auth-api"

import Loading from "../../components/shared/loading/Loading"

export default function EmailVerifyPage() {

    const nav = useNavigate()
    let token = useParams().token;
    const { successToast, errorToast } = useContext(toastValue);

    useEffect(() => {
        const verify = async () => {
           let result =  await emailVerify(token)
           if(result == true ){
            nav("/?modal=login")
            successToast("Your email has been verified, please login")
           }else{
            nav("/")
            errorToast(result)
           }
        }
        verify()
    }, [])

    return (<>
        <Loading />
    </>)
}



