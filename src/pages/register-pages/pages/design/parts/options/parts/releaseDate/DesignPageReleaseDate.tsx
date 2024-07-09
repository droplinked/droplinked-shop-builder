import { Flex, Grid } from '@chakra-ui/react'
import AppDatepicker from 'components/common/datepicker/AppDatepicker'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { getTomorrowMidnightISO } from 'lib/utils/heper/helpers'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import DesignPageCard from '../card/DesignPageCard'
import TimeInput from './TimeInput'

function DesignPageReleaseDate() {
    const { methods: { dispatch }, state: { shop: { launchDate } } } = useContext(designContext)
    const [showDetails, setDetailsVisibility] = useState(() => Boolean(launchDate))
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
        if (checked) return dispatch({ type: 'updateShop', params: { launchDate: getTomorrowMidnightISO() } })
        dispatch({ type: 'updateShop', params: { launchDate: null } })
    }

    const handleTimeChange = (key, value) => {
        const date = launchDate ? new Date(launchDate) : new Date()
        date.setHours(key === "hour" ? value : date.getHours())
        date.setMinutes(key === "minute" ? value : date.getMinutes())
        date.setSeconds(key === "second" ? value : date.getSeconds())
        dispatch({ type: 'updateShop', params: { launchDate: date.toISOString() } })
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
        <DesignPageCard title='Release Date' section='releaseDate'>
            <Flex direction={"column"} gap={12}>
                <Flex alignItems={"center"} gap={3}>
                    <AppSwitch isChecked={showDetails} onChange={({ target: { checked } }) => handleSwitchChange(checked)} />
                    <AppTypography userSelect={"none"} fontSize={14} fontWeight={"600"} color='#C2C2C2'>Date Counter</AppTypography>
                </Flex>

                {showDetails &&
                    <Flex direction={"column"} gap={4}>
                        <AppDatepicker
                            onChange={(value: any) => dispatch({ type: 'updateShop', params: { launchDate: value.toISOString() } })}
                            placeholderText="YYYY-MM-DD"
                            minDate={new Date()}
                            label="Shop Release Date"
                            value={launchDate ? new Date(launchDate) : null}
                        />

                        <Flex direction="column" gap={3}>
                            <AppTypography fontSize={16} fontWeight={500}>Shop Release Time</AppTypography>
                            <Flex height={12} flexWrap="wrap" gap={3}>
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
                                            onChange={({ target: { value, validity } }) => validity.valid && handleTimeChange(unit, value)}
                                        />
                                    </Fragment>
                                ))}
                            </Flex>
                        </Flex>
                    </Flex>
                }
            </Flex>
        </DesignPageCard>
    )
}

export default DesignPageReleaseDate