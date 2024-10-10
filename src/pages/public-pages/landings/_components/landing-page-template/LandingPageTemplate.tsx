import { useDisclosure } from '@chakra-ui/react'
import AuthModal from 'components/modals/auth-modal/AuthModal'
import { MODAL_TYPE } from 'pages/public-pages/homePage/HomePage'
import React from 'react'
import { ILandingPageTemplate } from '../../types/interfaces'
import AboveTheFoldSection from '../above-the-fold/AboveTheFoldSection'
import DualSideFlex from '../dual-side-flex/DualSideFlex'
import Features from '../features/Features'
import Layout from '../layout/Layout'
import PaymentDetails from '../payment-details/PaymentDetails'
import ConnectWithUs from './connect-with-us/ConnectWithUs'
import DetailsSection from './DetailsSection'

function LandingPageTemplate({ data }: { data: ILandingPageTemplate }) {
    const { aboveTheFoldSection, detailsSection, dualSideFlexData, featureGroups } = data
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Layout>
            <AboveTheFoldSection
                image={aboveTheFoldSection.image}
                title={aboveTheFoldSection.title}
                description={aboveTheFoldSection.description}
                CTAButtonText={aboveTheFoldSection.CTAButtonText}
                CTAButtonFunction={onOpen}
            />

            <DetailsSection data={detailsSection} />

            <PaymentDetails />

            {dualSideFlexData.map((item, index) => (
                <DualSideFlex
                    key={index}
                    direction={index % 2 === 0 ? 'rtl' : 'ltr'}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                />
            ))}

            <Features features={featureGroups} />

            <ConnectWithUs />

            {isOpen && <AuthModal show={isOpen} type={MODAL_TYPE.SIGNUP} close={onClose} />}
        </Layout>
    )
}

export default LandingPageTemplate