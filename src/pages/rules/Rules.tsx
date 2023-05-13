import { useProfile } from 'hooks/useProfile/useProfile'
import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import AppDataGrid from 'components/shared/datagrid/DataGrid'
import { ITableRows } from 'components/shared/table/AppTable'
import { ruleService } from 'lib/apis/rule/ruleServices'
import discountIcon from "assest/icon/discount-active-icon.svg";
import gatedIcon from "assest/icon/gated-active-icon.svg";
import { Box, HStack, Image } from '@chakra-ui/react'
import AppTypography from 'components/shared/typography/AppTypography'

interface IStates {
    rows: Array<ITableRows>
}

function Rules() {
    const { mutate, isLoading } = useMutation(() => ruleService())
    const [States, setStates] = useState<IStates>({
        rows: []
    })
    const { shop } = useProfile()

    // fetch data and refactor
    const fetch = useCallback(() => {
        mutate(null, {
            onSuccess: (res) => {
                setStates(prev => ({
                    ...prev, rows: res.data.data.map((el: any): ITableRows => ({
                        type: {
                            caption: "Rule type",
                            value: (
                                <HStack>
                                    <Box><Image src={el.gated ? gatedIcon : discountIcon} w="16px" h="16px" /></Box>
                                    <Box><AppTypography size='14px'>{el.gated ? "gated" : "discount"}</AppTypography></Box>
                                </HStack>
                            )
                        },
                        Offer: {
                            value: "%" + el?.rules[0].discountPercentage
                        },
                        minimum: {
                            value: el?.rules[0].nftsCount
                        }
                    }))
                }))
            }
        })
    }, [])

    useEffect(() => fetch(), [mutate])

    return (
        <AppDataGrid
            loading={isLoading}
            rows={States.rows}
        />
    )
}

export default Rules