import React from 'react'
import { Flex, Image, Text } from '@chakra-ui/react'
import astronautLookingLeft from 'assets/image/astronaut-looking-left.png'
import astronautLookingRight from 'assets/image/astronaut-looking-right.png'
import useAstronautImageSwitcher from './useAstronautImageSwitcher'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  const images = [astronautLookingRight, astronautLookingLeft]
  const { currentImageIndex } = useAstronautImageSwitcher()

  return (
    <>
      <Flex justifyContent="center" paddingTop="100px">
        <Flex>
          <Flex flex={1} direction="column" gap={{ base: '16px', md: '24px' }} paddingTop={9}>
            <AstronautImage images={images} currentImageIndex={currentImageIndex} />
            <NotFoundText />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

function AstronautImage({ images, currentImageIndex }: { images: string[], currentImageIndex: number }) {
  return (
    <Flex order={{ base: 4, md: 1 }} justify="center">
      <Image
        src={images[currentImageIndex]}
        objectFit="contain"
        backgroundPosition="center"
        width="670px"
        height="300px"
      />
    </Flex>
  )
}

function NotFoundText() {
  return (
    <>
      <Text color={"#fff"} order={{ base: 1, md: 2 }} fontSize={{ base: '24px', md: '32px' }} fontWeight={700}>
        Oooops
      </Text>
      <Text color={"#fff"} order={{ base: 2, md: 3 }} fontSize={{ base: '16px', md: '24px' }}>
        Looks like the store you’re looking for has gone on a little adventure.
      </Text>
      <Text color={"#fff"} order={{ base: 3, md: 4 }} fontSize={{ base: '14px', md: '16px' }}>
        You can{' '}
        <Link to="/" style={{ color: "#33a9ec" }}>
          go back to the homepage
        </Link>
        , or unleash your inner entrepreneur and{' '}
        <Link to={`/signup`} style={{ color: "#33a9ec" }}>
          create your own store
        </Link>
      </Text>
    </>
  )
}