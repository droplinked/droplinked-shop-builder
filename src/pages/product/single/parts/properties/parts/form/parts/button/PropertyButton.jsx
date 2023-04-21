import BasicButton from 'components/shared/BasicButton/BasicButton'
import React, { useCallback, useContext, useMemo } from 'react'
import AppendModule from '../../model/module/append'
import PropertiesFormModel from '../../model/model'
import propertiesFormContext from '../../context'

function PropertyButton({ state, types }) {
    const { updateState } = useContext(propertiesFormContext)
    const { appendHandle } = PropertiesFormModel

    const append = useCallback(() => {
        updateState(prev => appendHandle({
            state: prev,
            types
        }))
    }, [])

    const checkLengthProperty = useMemo(() => {
        return AppendModule.checkLengthProperty({
            properties: state,
            types
        })
    }, [state, types])

    return (
        <>
            {!checkLengthProperty && (
                <BasicButton click={append} cancelType>Make New Properties</BasicButton>
            )}
        </>
    )
}

export default PropertyButton