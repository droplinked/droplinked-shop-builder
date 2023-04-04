import { Image, Flex } from "@chakra-ui/react"

export default function FullsizeImage({ image , close }) {

    return (
        <Flex
            justifyContent='center'
            alignItems='center'
            w='100%'
            h='100%'
            bgColor='rgba(0, 0, 0, 0.4)'
            zIndex='20'
            pos='fixed'
            top='0'
            right='0'
            overflow='auto'
            onClick={close}
        >
            <Image
                pos='relative'
                src={image}
                opacity='1'
                zIndex='21'
                w='auto'
                maxW='100%'
                h='auto'
                maxH='100%'
            />
        </Flex>
    )
}