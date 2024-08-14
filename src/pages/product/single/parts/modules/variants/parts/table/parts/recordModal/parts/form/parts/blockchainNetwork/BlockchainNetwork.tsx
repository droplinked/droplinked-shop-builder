import AppSelectBox from 'components/common/form/select/AppSelectBox'
import { supportedChainsService } from 'lib/apis/sku/services'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React from 'react'
import { useQuery } from 'react-query'

interface Iprops {
    error: any
    onChange: any
    value: any
}

function BlockchainNetwork({ error, onChange, value }: Iprops) {
    const { data, isFetching } = useQuery({
        queryFn: supportedChainsService,
        queryKey: "supported_chains",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        onSuccess: (data) => onChange(data.data.data[0])
    })

    return <AppSelectBox
        items={data ? data?.data?.data.map((el: any) => ({ value: el, caption: capitalizeFirstLetter(el) })) : []}
        name="blockchain"
        label='Blockchain Network'
        loading={!isFetching}
        error={error}
        onChange={(e) => onChange(e.target.value)}
        value={value}
    />
}

export default BlockchainNetwork