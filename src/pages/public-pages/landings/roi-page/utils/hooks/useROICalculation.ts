import { useCallback, useEffect, useState } from "react"
import { Plan } from "../interfaces/interfaces"

const plans: Plan[] = [
    { title: 'Capsule', duration: 30, skus: 5, productRecords: 50000, baseCommitment: 10000 },
    { title: 'Pilot', duration: 90, skus: 25, productRecords: 250000, baseCommitment: 50000 },
    { title: 'Enterprise', duration: 365, skus: 100, productRecords: 1000000, baseCommitment: 150000 },
]

const availableNetworks = [
    { title: "Ethereum", constantValue: 7.2 },
    { title: "Polygon", constantValue: 0.1 },
    { title: "Arbitrum", constantValue: 0.02 },
    { title: "OP", constantValue: 0.008 },
    { title: "Base", constantValue: 0.001 },
    { title: "Skale", constantValue: 0 },
    { title: "Solana", constantValue: 0 },
    { title: "Near", constantValue: 0.002 },
    { title: "Stacks", constantValue: 0.007 },
    { title: "Hedera", constantValue: 0.05 },
    { title: "Casper", constantValue: 0.04 }
]

const useROICalculation = () => {
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

    const [selectedNetwork, setSelectedNetwork] = useState(() => networks[0].value)

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

    const buttonDisabled = [...Object.values(productDetails), ...Object.values(metrics)].some(value => !value)

    const handleCalculation = useCallback(() => {
        if (buttonDisabled) return
        const { averageOrderValue, royaltyPercentage, CapturedSecondarySales } = metrics

        const grossInvestment = selectedNetwork * +productDetails.productRecordCount
        const grossMerchandiseValue = +averageOrderValue * +productDetails.transactionCount
        const grossCapturedValue = grossMerchandiseValue * +royaltyPercentage * +CapturedSecondarySales
        const ROI = grossCapturedValue / grossInvestment

        setResult({ grossInvestment, grossMerchandiseValue, grossCapturedValue, ROI })
    }, [buttonDisabled, metrics, selectedNetwork, productDetails, setResult])

    useEffect(() => {
        setProductDetails({
            ...productDetails,
            productRecordCount: selectedPlan.productRecords.toString(),
            serviceFee: selectedPlan.baseCommitment.toString(),
            totalSkus: selectedPlan.skus.toString()
        })
    }, [selectedPlan])

    useEffect(() => { handleCalculation() }, [handleCalculation])

    return {
        plans,
        selectedPlan,
        handlePlanChange,
        networks,
        selectedNetwork,
        setSelectedNetwork,
        productDetails,
        updateProductDetails,
        handleTotalSkusChange,
        totalSkusErrorMessage,
        metrics,
        updateMetrics,
        buttonDisabled,
        handleCalculation,
        result
    }
}

export default useROICalculation