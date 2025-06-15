import { Flex, Box, Image } from '@chakra-ui/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function Stepper() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [progressPercentage, setProgressPercentage] = useState(0)

    useGSAP(() => {
        if (!containerRef.current) return

        gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=100%",
                scrub: 1,
                pin: true,
                pinSpacing: true,
                onUpdate: (self) => {
                    const progress = self.progress * 100
                    setProgressPercentage(progress)
                }
            }
        })
    }, { scope: containerRef })

    return (
        <Flex
            ref={containerRef}
            minH="100vh"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                position="relative"
                backgroundImage="url('https://upload-file-droplinked.s3.amazonaws.com/23cf80fd633d9c14976dbd81b510663bca2e8584b4ac09ad667e6da2c34dbd52.png')"
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                padding="48px 48px 0px 48px"
            >
                <Image
                    src="/path-to-your-content-image.png"
                    alt="Content Image"
                    width="100%"
                    height="auto"
                />
            </Box>
        </Flex>
    )
}
