import { Flex, useRadioGroup } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useState } from 'react'
import CustomRadioCard from '../../../../common/CustomRadioCard'

interface Props {
    selectedPODProduct: any
}

function TechniqueSelection({ selectedPODProduct }: Props) {
    const [selectedTechnique, setSelectedTechnique] = useState("")
    const { setFieldValue } = useProductForm()
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'pod-technique',
        onChange: (value: string) => setSelectedTechnique(value),
        value: selectedTechnique
    })

    return (
        <Flex
            direction="column"
            gap={4}
            {...getRootProps()}
        >
            {selectedPODProduct.techniques.map((t, index) => (
                <CustomRadioCard
                    key={index}
                    label={`${t.display_name}${t.is_default ? " (Default)" : ""}`}
                    {...getRadioProps({ value: t.key })}
                />
            ))}

            <Button
                type='button'
                isDisabled={!selectedTechnique}
                onClick={() => setFieldValue("technique", selectedTechnique)}
            >
                Next
            </Button>
        </Flex>
    )
}

export default TechniqueSelection