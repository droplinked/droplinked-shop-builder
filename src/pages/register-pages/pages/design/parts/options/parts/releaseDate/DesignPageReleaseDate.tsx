import { Flex } from '@chakra-ui/react'
import AppDatepicker from 'components/common/datepicker/AppDatepicker'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useState } from 'react'
import DesignPageCard from '../card/DesignPageCard'
import TimeInput from './TimeInput'

function DesignPageReleaseDate() {
    const { methods: { dispatch }, state: { shop: { launchDate } } } = useContext(designContext)
    const [showDetails, setDetailsVisibility] = useState(() => Boolean(launchDate))
    const [hour, setHour] = useState(launchDate ? new Date(launchDate).getHours() : "")
    const [minute, setMinute] = useState(launchDate ? new Date(launchDate).getMinutes() : "")
    const [second, setSecond] = useState(launchDate ? new Date(launchDate).getSeconds() : "")

    const handleSwitchChange = (checked: boolean) => {
        setDetailsVisibility(checked)
        if (!checked) dispatch({ type: 'updateShop', params: { launchDate: null } })
    }

    const updateLaunchDate = () => {
    }

    return (
        <DesignPageCard title='Release Date' section='releaseDate'>
            <Flex direction={"column"} gap={12}>
                <Flex alignItems={"center"} gap={3}>
                    <AppSwitch onChange={({ target: { checked } }) => handleSwitchChange(checked)} isChecked={showDetails} />
                    <AppTypography userSelect={"none"} fontSize={14} fontWeight={"600"} color='#C2C2C2'>Date Counter</AppTypography>
                </Flex>

                {showDetails &&
                    <Flex direction={"column"} gap={4}>
                        <AppDatepicker
                            onChange={(value: any) => dispatch({ type: 'updateShop', params: { launchDate: value.toISOString() } })}
                            placeholderText="YYYY-MM-DD"
                            minDate={new Date()}
                            label='Product Release Date'
                            value={launchDate ? new Date(launchDate) : null}
                        />

                        <Flex direction={"column"} gap={3}>
                            <AppTypography fontSize={16} fontWeight={500}>Product Release Time</AppTypography>
                            <Flex justifyContent={"space-between"} flexWrap={"wrap"} alignItems={"center"} gap={3}>
                                <TimeInput name='hour' value={hour} min={0} max={23} onChange={({ target: { value, validity } }) => {
                                    if (validity.valid) {
                                        setHour(value)
                                        updateLaunchDate()
                                    }
                                }} />
                                <TimeInput name='minute' value={minute} min={0} max={59} onChange={({ target: { value, validity } }) => {
                                    if (validity.valid) {
                                        setMinute(value)
                                        updateLaunchDate()
                                    }
                                }} />
                                <TimeInput name='second' value={second} min={0} max={59} onChange={({ target: { value, validity } }) => {
                                    if (validity.valid) {
                                        setSecond(value)
                                        updateLaunchDate()
                                    }
                                }} />
                            </Flex>
                        </Flex>
                    </Flex>
                }
            </Flex>
        </DesignPageCard>
    )
}

export default DesignPageReleaseDate