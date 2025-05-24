import { Flex, Image, Text } from '@chakra-ui/react'
import astronautLookingLeft from 'assets/image/astronaut-looking-left.png'
import astronautLookingRight from 'assets/image/astronaut-looking-right.png'
import React from 'react'
import { Link } from 'react-router-dom'
import useAstronautImageSwitcher from './hooks/useAstronautImageSwitcher'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import enLocal from './translations/en.json'
import arLocal from './translations/ar.json'
import { Trans } from 'react-i18next'

export default function NotFoundPage() {
  return (
    <Flex justifyContent="center" paddingTop="100px">
      <Flex>
        <Flex flex={1} direction="column" gap={{ base: '16px', md: '24px' }} paddingTop={9}>
          <AstronautImage />
          <NotFoundText />
        </Flex>
      </Flex>
    </Flex>
  )
}

function AstronautImage() {
  const images = [astronautLookingRight, astronautLookingLeft]
  const { currentImageIndex } = useAstronautImageSwitcher()

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
  const { t } = useLocaleResources('404Page', {
    en: enLocal,
    ar: arLocal
  })

  return (
    <>
      <Text color="text.white" order={{ base: 1, md: 2 }} fontSize={{ base: '24px', md: '32px' }} fontWeight={700}>
        {t('title')}
      </Text>
      <Text color="text.white" order={{ base: 2, md: 3 }} fontSize={{ base: '16px', md: '24px' }}>
        {t('description')}
      </Text>
      <Text color="text.white" order={{ base: 3, md: 4 }} fontSize={{ base: '14px', md: '16px' }}>
        <Trans
          i18nKey="action"
          t={t}
          components={[
            <Link to="/" style={{ color: '#33a9ec' }} />,
            <Link to="/onboarding?entry=signup" style={{ color: '#33a9ec' }} />
          ]}
        />
      </Text>
    </>
  )
}