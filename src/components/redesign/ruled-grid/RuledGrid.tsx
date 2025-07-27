import { Box, Grid, GridProps } from "@chakra-ui/react"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import React from "react"

/**
 * RuledGrid Component - Grid layout with ruled borders
 * 
 * Creates a grid with configurable columns where each cell is separated
 * by border lines. Supports nested grids and properly handles edge borders.
 * 
 * @param {object} props - Component props
 * @param {number} props.columns - Number of columns to display in the grid
 * @param {boolean} [props.nested=false] - Whether this grid is nested inside another RuledGrid
 * @param {React.ReactNode} props.children - Content to display in grid cells
 * @param {GridProps} props - Additional Chakra UI grid props
 */
export interface RuledGridProps extends GridProps {
    columns: number
    nested?: boolean
}

function RuledGrid({ columns, nested = false, children, ...rest }: RuledGridProps) {
    const { isRTL } = useLocaleResources("common")

    // Convert children to an array
    const childrenArray = React.Children.toArray(children)

    return (
        <Grid
            templateColumns={`repeat(${columns}, 1fr)`}
            border={nested ? "unset" : "1px solid"}
            borderColor="neutral.gray.800"
            overflow="hidden"
            {...rest}
        >
            {childrenArray.map((child, index) => (
                <Box
                    key={index}
                    // Draw internal vertical borders depending on layout direction.
                    borderRight={(!isRTL && index % columns !== columns - 1) || (isRTL && index % columns !== 0) ? "1px solid" : "none"}
                    // Reset borderLeft to none to avoid double borders in RTL.
                    borderLeft="none"
                    borderBottom={index < childrenArray.length - columns ? "1px solid" : "none"}
                    borderColor={rest.borderColor ?? "neutral.gray.800"}
                >
                    {child}
                </Box>
            ))}
        </Grid>
    )
}

export default RuledGrid