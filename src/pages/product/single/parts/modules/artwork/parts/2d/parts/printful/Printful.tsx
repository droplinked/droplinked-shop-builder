import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useMutation } from 'react-query';

function Printful() {
    const ref = useRef<any>()
    const { mutateAsync } = useMutation(() => axios.post('https://api.printful.com/embedded-designer/nonces', {
        external_product_id: 15489
    }, {
        withCredentials: true,
        headers: {
            origin: 'https://api.printful.com',
            'Authorization': `Bearer ghkPL3XOhhx7QSoJiOIvHWdHaWKLUeOHsAGKq94o`,
        }
    }))
    const test = async () => {
        const data = await mutateAsync()
        console.log(data?.data?.data);

        //@ts-ignore
        new PFDesignMaker({
            elemId: ref.current?.id,
            nonce: 'ujpLVVJrd9Bw2v8taK6oiiHjWCcpPqLu',
            externalProductId: '15489',
            initProduct: {
                productId: 362,
            },
        });
    }
    useEffect(() => {
        test()
    }, [])

    return (
        <div ref={ref} id="printful"></div>
    )
}

export default Printful