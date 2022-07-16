import { useToasty } from "../../context/toastify/ToastContext"
import { useEffect, useState } from "react";
import { Text, Box } from "@chakra-ui/react"
import { getOrdersList } from "../../api/Producer-apis/Orders-api"

import Loading from "../../components/shared/loading/Loading"
import PurchaseHistory from "./PurchseComponent/PurchaseComponent"


export default function PurchasHistoryPage() {

    const [orders, setorders] = useState(null)
    const { successToast, errorToast } = useToasty();


    //get payment status
    let params = (new URL(document.location)).searchParams;
    let status = params.get('redirect_status') // null or string


    useEffect(() => {
        // if its backurl from stripe show successToast
        if (status == 'succeeded') successToast("payment successfull")
        getPurchseList()
    }, [])


    const getPurchseList = async () => {
        let result = await getOrdersList()
        if(result != null ){
            setorders(result)
        }
    }
    
    return (<>
        {orders == null
            ?
            <Loading />
            :
            <>
                {(orders.length == 0)
                    ?
                    <Text color='white'  w='100%'textAlign='center' fontSize='20px' fontWeight='600'>No Order</Text>
                    :
                    <Box w='100%' px={{ base: "20px", md: "80px" }}>
                        <Box w='100%' maxW='800px' m='auto'>
                            <Text
                                color='white'
                                fontSize={{ base: "30px", md: '40px' }}
                                fontWeight='600'
                                textAlign='center'
                                mb='40px'
                            >
                                Purchase History
                            </Text>
                            {orders.map((order, i) => {
                                return <PurchaseHistory key={i} order={order} />
                            })}
                        </Box>
                    </Box>
                }
            </>
        }

    </>)
}