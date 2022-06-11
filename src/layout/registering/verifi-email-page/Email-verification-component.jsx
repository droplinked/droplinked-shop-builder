import {  useEffect, useContext } from "react"
import { toastValue } from "../../../sevices/context/Toast-context"
import { useParams, useNavigate } from "react-router-dom";
import { PostWithoutToken } from "../../../sevices/functoinal-service/CallApiService"

import Loading from "../../../components/features/loading/Loading"

export default function VerificationEmailPage() {

    const nav = useNavigate()
    let token = useParams().token;
    const { successToast, errorToast } = useContext(toastValue);

    useEffect(() => {
        PostWithoutToken("/email/verify", { token: token }, resHandler)
    }, [])

    const resHandler = (status, v) => {
        if (status) {
            nav("/?modal=login")
            successToast("Your account has been successfully verified. Please login again.")
        } else {
            nav("/")
            errorToast(v)
        }
    }

    return (<>
        <Loading />
    </>)
}



