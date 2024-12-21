import React, { useState } from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import SwitchBox from '../common/SwitchBox'
import ProductDeliveryMessage from '../fields/ProductDeliveryMessage'
import ProductKeywords from '../fields/ProductKeywords'
import ProductTermsAndConditions from '../fields/ProductTermsAndConditions'
import VisibilityStatus from '../fields/VisibilityStatus'
import AppDatepicker from 'components/redesign/datepicker/AppDatepicker'
import { AnimatePresence, motion } from "framer-motion"
function AdditionalDetailsAccordion() {
    const [customField, setCustomField] = useState(false)
    const [discountAllowance, setDiscountAllowance] = useState(false)
    const [releaseDateSwitch, setReleaseDateSwitch] = useState(false)
    const [date, setDate] = useState("")
    return (
        <ProductFormAccordion label='Additional Details'>
            <VisibilityStatus />
            <ProductKeywords />

            <SwitchBox
                title='Release Date'
                description='Select a specific release date for this product.'
                isChecked={releaseDateSwitch}
                onToggle={() => setReleaseDateSwitch(prev => !prev)}
            >
                <AnimatePresence initial={false}>
                    {releaseDateSwitch &&
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "linear" }}
                        >
                            <AppDatepicker
                                onChange={(value) => setDate(value.toISOString())}
                                minDate={new Date()}
                                value={date ? new Date(date) : new Date()}
                                showTimeInput
                            />
                        </motion.div>
                    }
                </AnimatePresence>
            </SwitchBox>

            <SwitchBox
                title='Custom Field'
                description='Add custom information to display during checkout.'
                isChecked={customField}
                onToggle={() => setCustomField(prev => !prev)}
            />

            <SwitchBox
                title='Discount Allowance'
                description='Allow customers to apply discount codes for this product during checkout.'
                isChecked={discountAllowance}
                onToggle={() => setDiscountAllowance(prev => !prev)}
            />

            <ProductDeliveryMessage />
            <ProductTermsAndConditions />
        </ProductFormAccordion>
    )
}

export default AdditionalDetailsAccordion