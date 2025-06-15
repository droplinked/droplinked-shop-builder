import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import { useProducerLayout } from 'context/ProducerLayoutContext'
import React from 'react'
import NavLinks from './NavLinks'

function MobileSidebar() {
  const { isSidebarOpen, toggleSidebar } = useProducerLayout()

  if (!isSidebarOpen) return null

  return (
    <Drawer
      isOpen={isSidebarOpen}
      onClose={toggleSidebar}
      placement="left"
    >
      <DrawerOverlay background="rgba(0, 0, 0, 0.75)" />
      <DrawerContent
        mt="119px" // Start from below the header
        bg="neutral.background"
        maxH="calc(100vh - 119px)"
        padding={0}
      >
        <DrawerBody padding={0}>
          <NavLinks padding="32px 16px" />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileSidebar