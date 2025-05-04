import { Box, Circle } from '@chakra-ui/react'
import DroplinkedLogo from 'assets/brand-identity/Drop3'
import React from 'react'

const CenterIcon = () => {
  return (
    <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
      {/* Outer glow circle */}
      <Circle size="260px" border="1px solid rgba(255, 255, 255, 0.04)" bg="rgba(20, 20, 20, 0.25)" backdropFilter="blur(100px)">
        {/* Middle dark circle */}
        <Circle size="64px" boxShadow="inset 0px 4px 16px 0px rgba(255,255,255,0.50)">
          {/* Inner teal circle with icon */}
          <Circle
            size="64px"
            bg="main.primary"
            _after={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bg: 'rgba(20,20,20,0.25)',
              borderRadius: 'inherit'
            }}
          >
            <DroplinkedLogo height={'24px'} width={'24px'} color="white"></DroplinkedLogo>
          </Circle>
        </Circle>
      </Circle>
    </Box>
  )
}

export default CenterIcon
