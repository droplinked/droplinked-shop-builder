import MultiSelect from 'components/redesign/select/MultiSelect'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import FormControl from '../../../common/FormControl'

function PositionOptions() {
    const { values: { m2m_positions, m2m_positions_options }, setFieldValue } = useProductForm()

    return (
        <FormControl label='Position Options'>
            <MultiSelect
                value={m2m_positions}
                options={m2m_positions_options}
                labelAccessor="placement"
                placeholder="Select positions"
                onChange={(value) => setFieldValue("m2m_positions", value)}
            />
        </FormControl>
    )
}

export default PositionOptions