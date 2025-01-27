import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
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
            <Button variant='secondary' isDisabled={isSubmitting} onClick={handleCloseForm}>Discard</Button>
            <Button onClick={handleFormSubmit} isLoading={isSubmitting}>Save</Button>
        </Flex>
    )
}
