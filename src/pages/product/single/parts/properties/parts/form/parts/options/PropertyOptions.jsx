import { OptionComponent } from 'modals/rule-modal/RuleModal-style'
import React, { useCallback, useContext } from 'react'
import PropertiesFormModel from '../../model/model'
import propertiesFormContext from '../../context'

function PropertyOptions({ element, types }) {
    const { state } = useContext(propertiesFormContext)
    const { typesAvailable } = PropertiesFormModel

    const typesSelected = useCallback((propertyValue, typeID) => {
        return typesAvailable({
            state,
            typeID,
            propertyValue
        })
    }, [state, types])

    return (
        <>
            {types.map((type, key) => (
                <OptionComponent
                    value={type._id}
                    key={key}
                    disabled={typesSelected(element.value, type._id)}
                >
                    {type.name}
                </OptionComponent>
            ))}
        </>
    )
}

export default PropertyOptions