import { OptionComponent } from 'modals/rule-modal/RuleModal-style'
import React, { useCallback, useContext } from 'react'
import PropertiesFormModel from '../../model/model'
import propertiesFormContext from '../../context'
import AppSelectBox from 'components/shared/form/select/AppSelectBox'
import { typesProperties } from 'lib/utils/statics/types'
import { productContext } from 'pages/product/single/context'

function PropertyOptions({ element, onChange, value }) {
    const { state } = useContext(propertiesFormContext)
    const { productID } = useContext(productContext)
    const { typesAvailable } = PropertiesFormModel

    const typesSelected = useCallback((propertyValue, typeID) => {
        return typesAvailable({
            state,
            typeID,
            propertyValue
        })
    }, [state, typesProperties])

    return (
        <>
            <AppSelectBox
                name={element.title}
                onChange={onChange}
                value={value}
                optionDefault="property"
                items={typesProperties.filter(el => productID ? el.name === value : !typesSelected(element.value, el._id)).map((el) => ({
                    value: el._id,
                    caption: el.name,
                    disabled: typesSelected(element.value, el._id)
                }))}
            />
        </>
    )
}

export default PropertyOptions