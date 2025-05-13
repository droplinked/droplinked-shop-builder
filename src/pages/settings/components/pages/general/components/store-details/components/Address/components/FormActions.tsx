import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { useFormikContext } from 'formik'
import React, { MouseEvent } from 'react'

export default function FormActions({ onClose }: { onClose: () => void }) {
    const { handleSubmit, isSubmitting, resetForm } = useFormikContext()

    const handleCloseForm = () => {
        onClose()
        resetForm()
    }

    const handleFormSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleSubmit()
    }

    return (
        <Flex width={"100%"} gap={4} justifyContent={"end"}>
            <AppButton variant='secondary' isDisabled={isSubmitting} onClick={handleCloseForm}>Discard</AppButton>
            <AppButton onClick={handleFormSubmit} isLoading={isSubmitting}>Save</AppButton>
        </Flex>
    )
}
