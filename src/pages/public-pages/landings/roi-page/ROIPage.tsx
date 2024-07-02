import { Flex, Spinner } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import CustomHeading from '../parts/heading/Heading'
import Layout from '../parts/layout/Layout'
import StarryBorder from '../parts/starry-border/StarryBorder'
import Container from './_components/container/Container'
import Input from './_components/input/Input'
import Radio from './_components/radio/Radio'
import ROIResultRow from './_components/roi-result-row/ROIResultRow'
import Select from './_components/select/Select'
import useROICalculation from './utils/hooks/useROICalculation'
import { useNavigate } from 'react-router-dom'

function ROIPage() {
    const navigate = useNavigate()
    const {
        plans, selectedPlan, handlePlanChange,
        networks, selectedNetwork, setSelectedNetwork,
        productDetails, updateProductDetails,
        handleTotalSkusChange, totalSkusErrorMessage,
        metrics, updateMetrics,
        buttonDisabled, handleCalculation, result, isLoading
    } = useROICalculation()

    return (
        <Layout>
            <Flex width={"100%"} direction={"column"} gap={100}>
                <Flex direction={"column"} gap={4}>
                    <CustomHeading title='Product Record Calculator' textAlign={"center"} />
                    <AppTypography margin={"auto"} maxWidth={"700px"} fontSize={24} color={"#fff"} textAlign={"center"}>Project anticipated ROI when using droplinked's enterprise inventory management and sales tracking.</AppTypography>
                </Flex>
                <Flex direction={{ base: "column", xl: "row" }} gap={{ base: 6, xl: 9 }}>
                    {/* left side */}
                    <Flex flex={1.75} direction={"column"} gap={6}>
                        <Container title='Plans'>
                            {plans.map((plan, index) => <Radio
                                key={index}
                                plan={plan}
                                isSelected={selectedPlan?.title === plan.title}
                                onChange={() => handlePlanChange(plan)}
                            />)}
                        </Container>

                        <Container title='Protocols'>
                            {isLoading ? 
                                <Spinner />
                                :
                                <Select items={networks} selectedItem={selectedNetwork} onChange={(e) => setSelectedNetwork(+e.target.value)} />
                            }
                        </Container>

                        <Container title='Product Details'>
                            <Input label='Service Fee' value={productDetails.serviceFee} isDisabled leftIcon={<AppIcons.GrayDollor />} tooltipText='Baseline cost associated with plan selected' onChange={(e) => updateProductDetails("serviceFee", e.target.value)} />
                            <Input label='Total SKUs' value={productDetails.totalSkus} errorMessage={totalSkusErrorMessage} onChange={handleTotalSkusChange} />
                            <Input label='Product Record Count' value={productDetails.productRecordCount} onChange={(e) => updateProductDetails("productRecordCount", e.target.value)} />
                            <Input label='Transaction Count' value={productDetails.transactionCount} onChange={(e) => updateProductDetails("transactionCount", e.target.value)} />
                        </Container>

                        <Container title='Financial and Performance Metrics'>
                            <Input label='Average Order Value' value={metrics.averageOrderValue} leftIcon={<AppIcons.GrayDollor />} tooltipText='Anticipated retail price of the item sold' onChange={(e) => updateMetrics("averageOrderValue", e.target.value)} />
                            <Input label='Royalty Percentage from Resales' value={metrics.royaltyPercentage} leftIcon={<AppIcons.GrayPercent />} tooltipText='The payout % of the retail price of an item sold that goes back to originator for ongoing sales' onChange={(e) => updateMetrics("royaltyPercentage", e.target.value)} />
                            <Input label='Captured Secondary Sales Percentage' value={metrics.CapturedSecondarySalesPercentage} leftIcon={<AppIcons.GrayPercent />} tooltipText='The % of anticipated secondary sales captured' onChange={(e) => updateMetrics("CapturedSecondarySalesPercentage", e.target.value)} />
                        </Container>
                    </Flex>

                    {/* right side */}
                    <Flex flex={1} direction={"column"} flexShrink={0} gap={6}>
                        <Container title='Return on Investment'>
                            <ROIResultRow title='Gross Investment' value={result.grossInvestment} />
                            <ROIResultRow title='Gross Merchandise Value (GMV)' value={result.grossMerchandiseValue} />
                            <ROIResultRow title='Gross Captured Value' value={result.grossCapturedValue} />
                            <ROIResultRow title='Return on Investment (ROI)' value={result.ROI} />
                        </Container>
                        <BasicButton isDisabled={buttonDisabled} borderRadius={8} onClick={handleCalculation}>Calculate</BasicButton>
                    </Flex>
                </Flex>
            </Flex>

            <StarryBorder
                title='Enquire to learn more'
                description='Minimize fraud, adhere to compliance, increase conversions for your organization'
                buttonText='Contact Us'
                buttonFunctionality={() => navigate("/contact-us")}
            />
        </Layout>
    )
}

export default ROIPage