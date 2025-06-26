import { Heading, useMediaQuery } from '@chakra-ui/react'
import React from 'react'

function TypographyText({ text }: { text: string }) {
    const [isSmallerThanMd] = useMediaQuery('(max-width: 768px)')

    if (isSmallerThanMd) return null

    return (
        <Heading
            mb="-16px"
            textAlign="center"
            fontSize={{ md: '78px', xl: '144px', '2xl': '160px' }}
            fontWeight={900}
            lineHeight={{ md: '88px', xl: '136px', '2xl': '144px' }}
            letterSpacing={{ md: "-1.76px", xl: "-2.88px", '2xl': "-3.2px" }}
            bgGradient="linear-gradient(180deg, rgba(20, 20, 20, 0.75) 0%, rgba(20, 20, 20, 0.00) 100%)"
            bgClip="text"
            sx={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textStroke: '1px #2929299e',
                WebkitTextStroke: '1px #2929299e',
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
            }}
        >
            {text}
        </Heading>
    )
}

export default TypographyText