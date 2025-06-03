import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'

interface Props {
  onClose: () => void
  onDone: () => void
  isLoading: boolean
}

export default function GenerationFooterButtons({ onClose, onDone, isLoading }: Props) {
  return (
    <Flex py={{ base: 4, md: "24px", lg: 9 }} px={{ base: 4, md: 9, lg: "48px" }} justifyContent="space-between" borderTop="1px solid #292929">
      <AppButton variant='secondary' onClick={onClose}>
        Close
      </AppButton>
      <AppButton onClick={onDone} isLoading={isLoading} loadingText="Generating...">
        Done
      </AppButton>
    </Flex>
  )
}
