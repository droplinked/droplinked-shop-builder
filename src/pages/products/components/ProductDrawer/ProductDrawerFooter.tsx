import { DrawerFooter as ChakraDrawerFooter, Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import { useFormikContext } from 'formik'
import React from 'react'

interface Props {
    onClose: () => void
}

const ProductDrawerFooter = ({ onClose }: Props) => {
    const { setFieldValue, handleSubmit } = useFormikContext()

    const handleAction = (action: string) => {
        setFieldValue('action', action)
        handleSubmit()
    }

    return (
        <ChakraDrawerFooter
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderTop="1px solid #292929"
            padding={9}
            css={{ button: { fontSize: 14, fontWeight: 500 } }}
        >
            <Button variant="secondary" type="button" onClick={onClose}>
                Discard
            </Button>
            <Flex gap={4}>
                <Button
                    variant="outline"
                    borderColor="#2BCFA1"
                    color="#2BCFA1"
                    type="button"
                    onClick={() => handleAction('save-as-draft')}  // Set action to 'save-as-draft' and submit the form
                >
                    Save as draft
                </Button>
                <Button
                    type="button"
                    onClick={() => handleAction('save-product')}  // Set action to 'save-product' and submit the form
                >
                    Add Product
                </Button>
            </Flex>
        </ChakraDrawerFooter>
    )
}

export default ProductDrawerFooter