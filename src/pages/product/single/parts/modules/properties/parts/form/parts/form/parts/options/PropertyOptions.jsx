import React, { useCallback, useContext } from 'react'
import PropertiesFormModel from '../../../../model/model'
import propertiesFormContext from '../../../../context'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import { typesProperties } from 'lib/utils/statics/types'
import { productContext } from 'pages/product/single/context'

function PropertyOptions({ element, onChange, value }) {
    const { state: { properties } } = useContext(productContext)
    const { typesAvailable } = PropertiesFormModel

    const typesSelected = useCallback((propertyValue, typeID) => {
        return typesAvailable({
            state: properties,
            typeID,
            propertyValue
        })
    }, [properties, typesProperties])

    return (
        <>
            <AppSelectBox
                name={element.title}
                backgroundColor="#1C1C1C"
                onChange={onChange}
                value={value}
                {...!value && { placeholder: "property" }}
                items={typesProperties.map((el) => ({
                    value: el._id,
                    caption: el.name,
                    disabled: typesSelected(element.value, el._id)
                }))}
            />
        </>
    )
}

export default PropertyOptions