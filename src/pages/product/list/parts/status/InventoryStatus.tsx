import AppBadge from 'components/common/badge/AppBadge';
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers';
import React from 'react'

interface IProps {
    data: any
}

function InventoryStatus({ data }: IProps) {
    return (
        <div><AppBadge colorScheme={data?.publish_status === "DRAFTED" ? "purple" : "green"} textTransform="capitalize" text={data?.publish_status === "PUBLISHED" ? capitalizeFirstLetter(data?.publish_status) : "Draft" } /></div>
    )
}

export default InventoryStatus