import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../_shared/components/hero-section/HeroSection'

function MetaverseShowroomHero() {
    return (
        <HeroSection
            title={`Immersive Commerce`}
            subtitle="Enable visitors to explore and shop in virtual environments. Create and manage inventory alongside interactive AR/VR 3D shopping experiences"
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
            videoDesktop="https://upload-file-droplinked.s3.amazonaws.com/cb0c7e385980967c070ca12245597e112c1e3ad103b43382fb4fb7d78beb8330_or.webm"
            videoTablet="https://upload-file-droplinked.s3.amazonaws.com/27a5e38f59a35bd0041c92f1a53ec4798250e3827dec91e428555df1314cddf2_or.webm"
            videoMobile="https://upload-file-droplinked.s3.amazonaws.com/0daa143aafdf9501ab6a621547b4825297a8790bd0c27e3f48e53864be89658d_or.webm"
            videoStyle={{
                margin: "48px auto auto",
                paddingInline: "0px"
            }}
        />
    )
}

export default MetaverseShowroomHero