import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import AppDataGrid from 'components/common/datagrid/DataGrid'
import { ITableRows } from 'components/common/table/AppTable'
import { ruleService } from 'lib/apis/rule/ruleServices'
import { Box, HStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import AppEmptyPage from 'components/common/empty/AppEmptyPage'
import AppIcons from 'assest/icon/Appicons'

interface IStates {
    rows: Array<ITableRows>
}

function Rules() {
    const { mutate, isLoading } = useMutation(() => ruleService())
    const [States, setStates] = useState<IStates>({
        rows: []
    })
    const sizes = {
        width: "16px",
        height: "16px"
    }

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
                                    
                                    <Box>{el.gated ? <AppIcons.GatedIcon {...sizes}  /> : <AppIcons.DiscountIcon {...sizes} />}</Box>
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
            empty={<AppEmptyPage title="No rulesets available yet!" />}
        />
    )
}

export default Rules