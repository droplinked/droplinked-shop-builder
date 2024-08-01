import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import useAppStore from 'lib/stores/app/appStore'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React from 'react'
import DashboardDate from './parts/datepicker/DashboardDate'

function WelcomeDashboard() {
    const { shop } = useAppStore()
    const getTime = () => {
        const currentDate = new Date()
        const currentHour = currentDate.getHours()

        let timeOfDay: string

        if (currentHour >= 5 && currentHour < 12) {
            timeOfDay = "morning";
        } else if (currentHour >= 12 && currentHour < 18) {
            timeOfDay = "evening";
        } else {
            timeOfDay = "night";
        }

        return timeOfDay
    }

    return (
        <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center" gap="10px">
                <AppTypography fontSize="32px" color="#FFF">Good {getTime()}, <strong>{capitalizeFirstLetter(shop?.name)}</strong></AppTypography>
                <AppIcons.Hand />
            </Flex>
            <DashboardDate />
        </Flex>
    )
}

export default WelcomeDashboard