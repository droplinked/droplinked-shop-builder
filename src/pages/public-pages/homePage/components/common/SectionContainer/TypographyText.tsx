import { Heading, useMediaQuery } from '@chakra-ui/react';
import React from 'react';



export default function TypographyText({ text }: { text?: string }) {
    const [isSmallerThanMd] = useMediaQuery('(max-width: 768px)');
    if (!text) return null;

    return (
        <Heading
            display={isSmallerThanMd ? 'none' : 'block'}
            mt="48px"
            fontSize={{ base: '88px', lg: '144px', xl: '160px' }}
            fontWeight={900}
            lineHeight={{ base: '88px', lg: '144px', xl: '160px' }}
            letterSpacing={{ base: "-1.76px", lg: "-2.88px", xl: "-3.2px" }}
            textAlign="center"
            sx={{
                background: 'linear-gradient(180deg, rgba(20, 20, 20, 0.50) 0%, rgba(20, 20, 20, 0.25) 70%, rgba(20, 20, 20, 0.00) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            }}
        >
            {text}
        </Heading>
    );
}
