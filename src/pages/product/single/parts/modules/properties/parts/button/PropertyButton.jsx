import BasicButton from 'components/common/BasicButton/BasicButton'
import React, { useCallback, useContext, useMemo } from 'react'
import AppendModule from '../../model/module/append'
import PropertiesFormModel from '../../model/model'
import { productContext } from 'pages/product/single/context'

function PropertyButton({ state, types }) {
    const { state: { properties }, methods: { updateState } } = useContext(productContext)
    const { appendHandle } = PropertiesFormModel

    const append = useCallback(() => {
        updateState("properties", appendHandle({
            state: properties,
            types
        }))
    }, [properties])

    const checkLengthProperty = useMemo(() => {
        return AppendModule.checkLengthProperty({
            properties,
            types
        })
    }, [properties, types])

    return (
        <>
            {!checkLengthProperty ? (
                <BasicButton onClick={append} sizes="medium">Create Property</BasicButton>
            ) : ''}
        </>
    )
}

export default PropertyButton