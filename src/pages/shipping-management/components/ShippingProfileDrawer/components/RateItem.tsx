import { Zone } from 'pages/shipping-management/types/shipping'
import React from 'react'

interface Props {
    zone: Zone
}

function RateItem({ zone }: Props) {
    console.log({ zone })

    return (
        <div>RateItem</div>
    )
}

export default RateItem