import { Grid, GridItem } from '@chakra-ui/react'
import React, { useContext } from 'react'
import clarityContext from '../../context'
import Item from './parts/item/Item'

function DataGrid() {
    const { clarityData } = useContext(clarityContext)

    return (
        <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            templateRows={"repeat(2, 1fr)"}
            gap={6}
            height={"fit-content"}
        >
            <Item title='Sessions' value={clarityData?.totalSessionCount || "-"} />
            <Item title='Pages Per Session' value={clarityData?.pagesPerSession || "-"} />
            <GridItem colSpan={{ base: 1, md: 2 }}>
                <Item title='Active Time Per Session' value={clarityData?.activeTimeSpent || "-"} />
            </GridItem>
        </Grid>
    )
}

export default DataGrid