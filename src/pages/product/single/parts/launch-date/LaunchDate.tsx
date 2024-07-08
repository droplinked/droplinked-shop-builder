import { Flex, Grid } from '@chakra-ui/react'
import AppDatepicker from 'components/common/datepicker/AppDatepicker'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import TimeInput from 'pages/register-pages/pages/design/parts/options/parts/releaseDate/TimeInput'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { productContext } from '../../context'
import ProductCollapse from '../modules/collapse/ProductCollapse'

const LaunchDate = () => {
    const { state: { launchDate }, methods: { updateState } } = useContext(productContext)
    const [showDetails, setDetailsVisibility] = useState(Boolean(launchDate))
    const [time, setTime] = useState(() => {
        const date = launchDate ? new Date(launchDate) : null
        return {
            hour: date ? date.getHours() : "",
            minute: date ? date.getMinutes() : "",
            second: date ? date.getSeconds() : ""
        }
    })

    const handleSwitchChange = (checked: boolean) => {
        setDetailsVisibility(checked)
        if (!checked) {
            updateState("launchDate", null)
        }
    }

    const handleTimeChange = (key, value) => {
        setTime(prevTime => ({ ...prevTime, [key]: value }))

        const date = launchDate ? new Date(launchDate) : new Date()
        date.setHours(key === "hour" ? value : date.getHours())
        date.setMinutes(key === "minute" ? value : date.getMinutes())
        date.setSeconds(key === "second" ? value : date.getSeconds())
        updateState("launchDate", date.toISOString())
    }

    useEffect(() => {
        const date = launchDate ? new Date(launchDate) : null
        setDetailsVisibility(Boolean(date))
        setTime({
            hour: date ? date.getHours() : "",
            minute: date ? date.getMinutes() : "",
            second: date ? date.getSeconds() : ""
        })
    }, [launchDate])

    return (
        <ProductCollapse
            title="Release Date"
            description="Select a shipping method to deliver your product."
            isRequired={false}
        >
            <Flex direction="column" gap={6}>
                <Flex alignItems="center" gap={3}>
                    <AppSwitch isChecked={showDetails} onChange={({ target: { checked } }) => handleSwitchChange(checked)} />
                    <AppTypography userSelect="none" fontSize={14} fontWeight={600} color='#C2C2C2'>
                        Date Counter
                    </AppTypography>
                </Flex>

                {showDetails && (
                    <Flex justifyContent="space-between">
                        {/* Time Inputs */}
                        <Flex direction="column" gap={3}>
                            <AppTypography fontSize={16} fontWeight={500}>Product Release Time</AppTypography>
                            <Flex flexWrap="wrap" gap={3}>
                                {["hour", "minute", "second"].map((unit, index) => (
                                    <Fragment key={unit}>
                                        {index > 0 && (
                                            <Grid as="span" height="100%" placeContent="center" color="#808080">:</Grid>
                                        )}
                                        <TimeInput
                                            name={unit}
                                            value={time[unit]}
                                            min={0}
                                            max={unit === "hour" ? 23 : 59}
                                            onChange={({ target: { value, validity } }) => {
                                                if (validity.valid) {
                                                    handleTimeChange(unit, value)
                                                }
                                            }}
                                        />
                                    </Fragment>
                                ))}
                            </Flex>
                        </Flex>

                        {/* Date Picker */}
                        <AppDatepicker
                            onChange={(value) => updateState("launchDate", value.toISOString())}
                            placeholderText="YYYY-MM-DD"
                            minDate={new Date()}
                            label='Product Release Date'
                            value={launchDate ? new Date(launchDate) : null}
                        />
                    </Flex>
                )}
            </Flex>
        </ProductCollapse>
    )
}

export default LaunchDate