import React, { useCallback, useContext } from 'react'
import PropertiesFormModel from '../../../../model/model'
import propertiesFormContext from '../../../../context'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import { typesProperties } from 'lib/utils/statics/types'
import { productContext } from 'pages/product/single/context'

function PropertyOptions({ element, onChange, value }) {
    const { state: { properties, publish_product }, productID } = useContext(productContext)
    const { typesAvailable } = PropertiesFormModel

    const typesSelected = useCallback((propertyValue, title) => {
        return typesAvailable({
            state: properties,
            title,
            propertyValue
        })
    }, [properties, typesProperties])
    return (
        <>
            <AppSelectBox
                name={element.title}
                backgroundColor="#1C1C1C !important"
                isDisabled={Boolean(productID) && publish_product}
                onChange={onChange}
                value={value}
                {...!value && { placeholder: "Select property" }}
                items={typesProperties.map((el) => ({
                    value: el.name,
                    caption: el.name,
                    disabled: typesSelected(element.value, el.name)
                }))}
            />
        </>
    )
}

export default PropertyOptions