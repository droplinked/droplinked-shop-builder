import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../_shared/components/hero-section/HeroSection'

function TokenpayHero() {
    return (
        <HeroSection
            title="Token Powered Commerce Driven by Communities"
            subtitle="Leverage tokenpay with any ERC20, BRC20 and SPL tokens to unlock real utility"
            subTitleElements={
                <Flex justifyContent="center" mt={{ base: 4, lg: 6 }} gap={4}>
                    <Link to={AUTH_ROUTES.SIGN_UP}>
                        <AppButton>
                            Start Now
                        </AppButton>
                    </Link>
                    <Link to='mailto:support@droplinked.com'>
                        <AppButton variant='normal' bg="label.primary" color="neutral.white">
                            Request a Demo
                        </AppButton>
                    </Link>
                </Flex>
            }
            imageDesktop="https://upload-file-droplinked.s3.amazonaws.com/fbaf8e74973ed4b141b858f4e2904401e3d15d2bd86e04eb0fe915924b4c0bcc.png"
            imageTablet="https://upload-file-droplinked.s3.amazonaws.com/f1701d3b12a66dceafa44490b8c393cb2a10bb95f8a889c6849ed34f8a931bab.png"
            imageMobile="https://upload-file-droplinked.s3.amazonaws.com/39459f0d64714a5048496d708787e2de55629075d8ed3c3cfc77ca1754d21627.png"
        />
    )
}

export default TokenpayHero