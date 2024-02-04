import { Checkbox, Table, TableHeadProps, TableRowProps, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React, { useCallback } from 'react'
import AppTypography from '../typography/AppTypography'

export interface ITableRows {
    _data?: any
    [props: string]: {
        caption?: string
        value: any
        props?: Object
    }
}

export interface IAppTable {
    vertical?: boolean
    rows?: Array<ITableRows> | ITableRows
    empty?: any
    props?: {
        tr?: TableRowProps
        thead?: TableHeadProps
    }
    checkbox?: {
        state: Array<string>
        update(value: Array<string>): void
    }
}

function AppTable({ rows, vertical, empty, checkbox, props }: IAppTable) {
    const checkRows = vertical ? Object.keys(rows).length : rows.length

    const selected = useCallback((value: string, status: boolean) => {
        checkbox.update(status ? [...checkbox.state, value] : checkbox.state.filter(el => el !== value))
    }, [checkbox])

    const selectAll = useCallback((status: boolean) => {
        if (!(rows instanceof Array)) return false
        checkbox.update(status ? rows.map((el, key) => el?._data?._id || key) : []);
    }, [checkbox, rows])

    return (
        <>
            {rows && checkRows ? (
                <>
                    {vertical ? (
                        <Table color="#bebebe" width="100%" variant="unstyled">
                            <Tbody>
                                {Object.keys(rows).map((el, key) => (
                                    <Tr key={key}>
                                        <td width={"30%"}>{rows[el].caption ? rows[el].caption : el}</td>
                                        <td>{rows[el].value}</td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    ) : rows instanceof Array ? (
                        <Table color="#bebebe" width="100%" variant="unstyled">
                            <Thead borderTop="2px solid #292929" borderBottom="2px solid #292929" {...props?.thead}>
                                <Tr>
                                    {checkbox && <Th textTransform="uppercase" padding="14px 15px 14px 0"><Checkbox onChange={(e) => selectAll(e.target.checked)} colorScheme='green'></Checkbox></Th>}
                                    {Object.keys(rows[0]).filter(el => el !== "_data").map((el, key) =>
                                        <Th textTransform="uppercase" padding="14px 15px" {...key === 0 && { paddingLeft: 0 }} {...rows[0][el].props} key={key}>
                                            <AppTypography textTransform="none" fontSize='12px' color="#FFF">
                                                {typeof rows[0][el].caption !== "undefined" ? rows[0][el].caption : capitalizeFirstLetter(el)}
                                            </AppTypography>
                                        </Th>
                                    )}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {rows.map((el: any, key) =>
                                    <Tr borderBottom="2px solid #292929" key={key} {...props?.tr}>
                                        {checkbox && (
                                            <Td width="50" padding="14px 15px 14px 0">
                                                <Checkbox
                                                    isChecked={checkbox.state.includes(el?._data?._id || key)}
                                                    colorScheme='green'
                                                    onChange={(e) => selected(el?._data?._id || key, e.target.checked)}
                                                >
                                                </Checkbox>
                                            </Td>
                                        )}
                                        {Object.keys(el).filter(el => el !== "_data").map((item, key) => (
                                            <Td padding="14px 15px" {...key === 0 && { paddingLeft: 0 }} fontSize=".9rem" {...el[item].props} key={key}>{el[item].value}</Td>
                                        ))}
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    ) : null}
                </>
            ) : empty || ""}
        </>
    )
}

export default AppTable