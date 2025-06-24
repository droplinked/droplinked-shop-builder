import { Heading, useMediaQuery } from '@chakra-ui/react'
import React from 'react'

function TypographyText({ text }: { text?: string }) {
    const [isSmallerThanMd] = useMediaQuery('(max-width: 768px)')

    if (!text || isSmallerThanMd) return null

    return (
        <Heading
            mb="-16px"
            textAlign="center"
            fontSize={{ md: '78px', xl: '144px', '2xl': '160px' }}
            fontWeight={900}
            lineHeight={{ md: '88px', xl: '136px', '2xl': '144px' }}
            letterSpacing={{ md: "-1.76px", xl: "-2.88px", '2xl': "-3.2px" }}
            sx={{
                background: 'linear-gradient(180deg, rgba(20, 20, 20, 0.50) 0%, rgba(20, 20, 20, 0.00) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                textShadow: `
                    0px 2px 0px rgba(20, 20, 20, 0.3),
                    0px 4px 0px rgba(20, 20, 20, 0.25)
                `,
            }}
        >
            {text}
        </Heading>
    )
}

export default TypographyText