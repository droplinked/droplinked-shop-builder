import { Box } from '@chakra-ui/react'
import { useProducerLayout } from 'context/ProducerLayoutContext'
import React, { useEffect } from 'react'
import NavLinks from './NavLinks'

function MobileSidebar() {
  const { isSidebarOpen, toggleSidebar } = useProducerLayout()

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSidebarOpen])

  return (
    <>
      <Box
        width="100%"
        position="fixed"
        top="119px"
        left="0"
        bottom="0"
        zIndex={999}
        opacity={isSidebarOpen ? 1 : 0}
        visibility={isSidebarOpen ? 'visible' : 'hidden'}
        bg="rgba(0, 0, 0, 0.4)"
        transition="all 0.6s cubic-bezier(0.65, 0, 0.35, 1)"
        onClick={toggleSidebar}
      />
      <Box
        width={isSidebarOpen ? "80%" : "0%"}
        position="fixed"
        top="119px"
        left="0"
        bottom="0"
        zIndex={1000}
        transform={`translateX(${isSidebarOpen ? '0' : '-100%'})`}
        paddingBlock={8}
        paddingInline={4}
        bg="neutral.background"
        overflow={isSidebarOpen ? "auto" : "hidden"}
        transition="all 0.6s cubic-bezier(0.65, 0, 0.35, 1)"
      >
        <NavLinks />
      </Box>
    </>
  )
}

export default MobileSidebar
