import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useEffect, useState } from 'react'
import CustomHeading from '../parts/heading/Heading'
import Layout from '../parts/layout/Layout'
import StarryBorder from '../parts/starry-border/StarryBorder'
import Container from './_components/container/Container'
import Input from './_components/input/Input'
import Radio from './_components/radio/Radio'
import ROIResultRow from './_components/roi-result-row/ROIResultRow'
import Select from './_components/select/Select'

const plans = [
    { title: 'Capsule', duration: 30, skus: 5, productRecords: 50000, baseCommitment: 10000 },
    { title: 'Pilot', duration: 90, skus: 25, productRecords: 250000, baseCommitment: 50000 },
    { title: 'Enterprise', duration: 365, skus: 100, productRecords: 1000000, baseCommitment: 150000 },
]

const availableNetworks = [
    { title: "ETH", constantValue: 7.2 },
    { title: "POLY", constantValue: 0.1 },
    { title: "ARB", constantValue: 0.02 },
    { title: "OP", constantValue: 0.008 },
    { title: "BASE", constantValue: 0.001 },
    { title: "SKALE", constantValue: 0 },
    { title: "SOL", constantValue: 0 },
    { title: "NEAR", constantValue: 0.002 },
    { title: "STX", constantValue: 0.007 },
    { title: "HBAR", constantValue: 0.05 },
    { title: "CSPR", constantValue: 0.04 }
]

function ROIPage() {
    const [selectedPlan, setSelectedPlan] = useState(() => plans[0])
    const [productDetails, setProductDetails] = useState({
        serviceFee: selectedPlan.baseCommitment.toString(),
        totalSkus: selectedPlan.skus.toString(),
        productRecordCount: selectedPlan.productRecords.toString(),
        transactionCount: "10000"
    })
    const [metrics, setMetrics] = useState({
        averageOrderValue: "500",
        royaltyPercentage: "5",
        CapturedSecondarySales: "50",
        transactionCost: "100",
    })
    const networks = availableNetworks.map(network => {
        const { totalSkus, productRecordCount, serviceFee } = productDetails
        return {
            title: network.title,
            value: ((network.constantValue) * (+totalSkus + +productRecordCount * 100) + +serviceFee) / +productRecordCount
        }
    })
    const [selectedNetwork, setSelectedNetwork] = useState<number>()
    const [result, setResult] = useState({
        grossInvestment: 0,
        grossMerchandiseValue: 0,
        grossCapturedValue: 0,
        ROI: 0
    })
    const [totalSkusErrorMessage, setTotalSkusErrorMessage] = useState("")


    const updateProductDetails = <K extends keyof typeof productDetails>(key: K, value: typeof productDetails[K]) =>
        setProductDetails({ ...productDetails, [key]: value })

    const updateMetrics = <K extends keyof typeof metrics>(key: K, value: typeof metrics[K]) =>
        setMetrics({ ...metrics, [key]: value })


    const handlePlanChange = (plan) => {
        setSelectedPlan(plan)
        setTotalSkusErrorMessage("")
    }

    const handleTotalSkusChange = (e) => {
        const newSkuValue = e.target.value
        updateProductDetails("totalSkus", newSkuValue)

        if (+newSkuValue > selectedPlan.skus) {
            const upgradedPlan = plans.find(plan => plan.skus >= +newSkuValue)
            if (upgradedPlan) {
                setSelectedPlan(upgradedPlan)
                setTotalSkusErrorMessage(`Upgraded to ${upgradedPlan.title} due to entered value exceeding the ${selectedPlan.title} plan limit threshold.`)
            }
        }
    }

    const handleCalculation = () => {
        const { averageOrderValue, royaltyPercentage, CapturedSecondarySales } = metrics

        const grossInvestment = selectedNetwork * +productDetails.productRecordCount
        const grossMerchandiseValue = +averageOrderValue * +productDetails.transactionCount
        const grossCapturedValue = grossMerchandiseValue * +royaltyPercentage * +CapturedSecondarySales
        const ROI = grossCapturedValue / grossInvestment

        setResult({ grossInvestment, grossMerchandiseValue, grossCapturedValue, ROI })
    }

    useEffect(() => {
        setProductDetails({
            ...productDetails,
            productRecordCount: selectedPlan.productRecords.toString(),
            serviceFee: selectedPlan.baseCommitment.toString(),
            totalSkus: selectedPlan.skus.toString()
        })
    }, [selectedPlan])

    return (
        <Layout>
            <Flex width={"100%"} direction={"column"} gap={100}>
                <Flex direction={"column"} gap={4}>
                    <CustomHeading title='Product Record Calculator' textAlign={"center"} />
                    <AppTypography margin={"auto"} maxWidth={"700px"} fontSize={24} color={"#fff"} textAlign={"center"}>Project anticipated ROI when using droplinked’s enterprise inventory management and sales tracking.</AppTypography>
                </Flex>
                <Flex direction={{ base: "column", xl: "row" }} gap={{ base: 6, xl: 9 }}>
                    {/* left side */}
                    <Flex flex={1.75} direction={"column"} gap={6}>
                        <Container title='Plans'>
                            {plans.map((plan, index) => <Radio
                                key={index}
                                isSelected={selectedPlan?.title === plan.title}
                                onChange={() => handlePlanChange(plan)}
                                title={plan.title}
                                duration={plan.duration}
                                skus={plan.skus}
                                productRecords={plan.productRecords}
                                baseCommitment={plan.baseCommitment}
                            />)}
                        </Container>

                        <Container title='Protocols'>
                            <Select placeholder='Network Selection' items={networks} setter={setSelectedNetwork} />
                        </Container>

                        <Container title='Product Details'>
                            <Input label='Service Fee' value={productDetails.serviceFee} isDisabled leftIcon={<AppIcons.GrayDollor />} rightIcon={<AppIcons.BlackCircleI />} onChange={(e) => updateProductDetails("serviceFee", e.target.value)} />
                            <Input label='Total SKUs' value={productDetails.totalSkus} errorMessage={totalSkusErrorMessage} onChange={handleTotalSkusChange} />
                            <Input label='Product Record Count' value={productDetails.productRecordCount} onChange={(e) => updateProductDetails("productRecordCount", e.target.value)} />
                            <Input label='Transaction Count' value={productDetails.transactionCount} onChange={(e) => updateProductDetails("transactionCount", e.target.value)} />
                        </Container>

                        <Container title='Financial and Performance Metrics'>
                            <Input label='Average Order Value' value={metrics.averageOrderValue} rightIcon={<AppIcons.BlackCircleI />} onChange={(e) => updateMetrics("averageOrderValue", e.target.value)} />
                            <Input label='Royalty Percentage from Resales' value={metrics.royaltyPercentage} leftIcon={<AppIcons.GrayPercent />} rightIcon={<AppIcons.BlackCircleI />} onChange={(e) => updateMetrics("royaltyPercentage", e.target.value)} />
                            <Input label='Captured Secondary Sales Percentage' value={metrics.CapturedSecondarySales} leftIcon={<AppIcons.GrayPercent />} rightIcon={<AppIcons.BlackCircleI />} onChange={(e) => updateMetrics("CapturedSecondarySales", e.target.value)} />
                            <Input label='Estimated Transaction Cost' value={metrics.transactionCost} isDisabled leftIcon={<AppIcons.GrayDollor />} rightIcon={<AppIcons.BlackCircleI />} onChange={(e) => updateMetrics("transactionCost", e.target.value)} />
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
                        <BasicButton borderRadius={8} onClick={handleCalculation}>Calculate</BasicButton>
                    </Flex>
                </Flex>
            </Flex>

            <StarryBorder
                title='Enquire to learn more'
                description='Minimize fraud, adhere to compliance, increase conversions for your organization'
                buttonText='Contact Us'
                buttonFunctionality={() => { }}
            />
        </Layout>
    )
}

export default ROIPage