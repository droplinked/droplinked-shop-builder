import { Flex, Spinner } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../_components/layout/Layout'
import SpectrumHeader from '../_components/spectrum-header/SpectrumHeader'
import StarryBorder from '../_components/starry-border/StarryBorder'
import Container from './_components/container/Container'
import Input from './_components/input/Input'
import Radio from './_components/radio/Radio'
import ROIResultRow from './_components/roi-result-row/ROIResultRow'
import Select from './_components/select/Select'
import useROICalculation from './utils/hooks/useROICalculation'
import localEn from 'locales/public-pages/landings/roi-page/en.json'
import localAr from 'locales/public-pages/landings/roi-page/ar.json'

function ROIPage() {
    const navigate = useNavigate()
    const { t } = useLocaleResources('public-pages/landings/roi-page', { en: localEn, ar: localAr })

    const {
        plans, selectedPlan, handlePlanChange,
        networks, selectedNetwork, setSelectedNetwork,
        productDetails, updateProductDetails,
        handleTotalSkusChange, totalSkusErrorMessage,
        metrics, updateMetrics,
        buttonDisabled, handleCalculation, result, isLoading
    } = useROICalculation(t)

    return (
        <Layout>
            <Flex width={"100%"} direction={"column"} gap={100}>
                <Flex direction={"column"} alignItems={"center"} gap={4}>
                    <SpectrumHeader fontSize={{ base: 24, md: 28, lg: 36, xl: 40 }}>{t('pageTitle')}</SpectrumHeader>
                    <AppTypography maxWidth={"700px"} textAlign={"center"} fontSize={{ base: 16, xl: 18 }} color={"#fff"}>{t('pageDescription')}</AppTypography>
                </Flex>
                <Flex direction={{ base: "column", xl: "row" }} gap={{ base: 6, xl: 9 }}>
                    {/* left side */}
                    <Flex flex={1.75} direction={"column"} gap={6}>
                        <Container title={t('sections.plans')}>
                            {plans.map((plan, index) => <Radio
                                key={index}
                                plan={plan}
                                isSelected={selectedPlan?.title === plan.title}
                                onChange={() => handlePlanChange(plan)}
                                t={t}
                            />)}
                        </Container>

                        <Container title={t('sections.protocols')}>
                            {isLoading ?
                                <Spinner />
                                :
                                <Select items={networks} selectedItem={selectedNetwork} onChange={(e) => setSelectedNetwork(+e.target.value)} />
                            }
                        </Container>

                        <Container title={t('sections.productDetails')}>
                            <Input label={t('inputs.serviceFee.label')} value={productDetails.serviceFee} isDisabled leftIcon={<AppIcons.GrayDollar />} tooltipText={t('inputs.serviceFee.tooltip')} onChange={(e) => updateProductDetails("serviceFee", e.target.value)} />
                            <Input label={t('inputs.totalSkus.label')} value={productDetails.totalSkus} errorMessage={totalSkusErrorMessage} onChange={handleTotalSkusChange} />
                            <Input label={t('inputs.productRecordCount.label')} value={productDetails.productRecordCount} onChange={(e) => updateProductDetails("productRecordCount", e.target.value)} />
                            <Input label={t('inputs.transactionCount.label')} value={productDetails.transactionCount} onChange={(e) => updateProductDetails("transactionCount", e.target.value)} />
                        </Container>

                        <Container title={t('sections.financialMetrics')}>
                            <Input label={t('inputs.averageOrderValue.label')} value={metrics.averageOrderValue} leftIcon={<AppIcons.GrayDollar />} tooltipText={t('inputs.averageOrderValue.tooltip')} onChange={(e) => updateMetrics("averageOrderValue", e.target.value)} />
                            <Input label={t('inputs.royaltyPercentage.label')} value={metrics.royaltyPercentage} leftIcon={<AppIcons.GrayPercent />} tooltipText={t('inputs.royaltyPercentage.tooltip')} onChange={(e) => updateMetrics("royaltyPercentage", e.target.value)} />
                            <Input label={t('inputs.capturedSecondarySalesPercentage.label')} value={metrics.CapturedSecondarySalesPercentage} leftIcon={<AppIcons.GrayPercent />} tooltipText={t('inputs.capturedSecondarySalesPercentage.tooltip')} onChange={(e) => updateMetrics("CapturedSecondarySalesPercentage", e.target.value)} />
                        </Container>
                    </Flex>

                    {/* right side */}
                    <Flex flex={1} direction={"column"} flexShrink={0} gap={6}>
                        <Container title={t('sections.roi')}>
                            <ROIResultRow title={t('results.grossInvestment')} value={result.grossInvestment} />
                            <ROIResultRow title={t('results.grossMerchandiseValue')} value={result.grossMerchandiseValue} />
                            <ROIResultRow title={t('results.grossCapturedValue')} value={result.grossCapturedValue} />
                            <ROIResultRow title={t('results.roi')} value={result.ROI} />
                        </Container>
                        <BasicButton isDisabled={buttonDisabled} borderRadius={8} onClick={handleCalculation}>{t('buttons.calculate')}</BasicButton>
                    </Flex>
                </Flex>
            </Flex>

            <StarryBorder
                title={t('starryBorder.title')}
                description={t('starryBorder.description')}
                buttonText={t('buttons.contactUs')}
                onButtonClick={() => navigate("/contact-us")}
            />
        </Layout>
    )
}

export default ROIPage