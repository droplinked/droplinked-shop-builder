import { DrawerFooter as ChakraDrawerFooter, Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'

interface Props {
    onClose: () => void
    isSubmitting?: boolean
    isEditing?: boolean
}

const ShippingProfileDrawerFooter = ({ onClose, isSubmitting = false, isEditing = false }: Props) => {
    return (
        <ChakraDrawerFooter
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderTop="1px solid"
            borderColor="neutral.gray.800"
            padding={9}
        >
            <AppButton type="button" variant="secondary" isDisabled={isSubmitting} onClick={onClose}>
                Discard
            </AppButton>

            <Flex gap={4}>
                <AppButton type="submit" isLoading={isSubmitting}>
                    {isEditing ? 'Update Profile' : 'Create Profile'}
                </AppButton>
            </Flex>
        </ChakraDrawerFooter>
    )
}

export default ShippingProfileDrawerFooter
