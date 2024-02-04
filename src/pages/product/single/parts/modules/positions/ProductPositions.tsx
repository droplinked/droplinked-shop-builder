import { Box, Flex, Image } from '@chakra-ui/react'
import { printPositionsServices } from 'lib/apis/product/productServices'
import React from 'react'
import { useQuery } from 'react-query'
import shirtBack from 'assest/image/positions/back.svg'
import shirtCenter from 'assest/image/positions/center.svg'
import shirtLeft from 'assest/image/positions/left.svg'
import shirtRight from 'assest/image/positions/right.svg'

interface IProps {
    update(element: string): void
    state: Array<string>
    posistion?: "back" | "front"
}

function ProductPositions({ update, state, posistion }: IProps) {
    const { data } = useQuery({
        queryFn: printPositionsServices,
        queryKey: "positions_query",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })

    const icons = {
        FRONT_CENTER: shirtCenter,
        FRONT_LEFT_CHEST: shirtLeft,
        FRONT_RIGHT_CHEST: shirtRight,
        BACK_CENTER: shirtBack,
    }

    return (
        <Flex gap={3}>
            {data?.data?.data && data.data.data.filter((el:string) => posistion ? posistion === "back" ? !el.search("BACK") : el.search("BACK_") : true).map((el: any, key: number) => (
                <Box key={key}>
                    <Image
                        style={{ border: `3px solid ${state.includes(el) ? "#2EC99E" : "transparent"}`, borderRadius: "8px" }}
                        onClick={() => update(el)}
                        src={icons[el]}
                        cursor="pointer"
                        width="58px"
                        height="58px"
                    />
                </Box>
            ))}
        </Flex>
    )
}

export default ProductPositions