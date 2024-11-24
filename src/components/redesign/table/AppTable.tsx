import React, { useCallback } from 'react'
import { Checkbox, Table, TableHeadProps, TableRowProps, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

//Helper Functions
import { capitalizeFirstLetter } from 'lib/utils/helpers/helpers'
import AppTypography from 'components/common/typography/AppTypography'

//Components

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
    rows?: Array<ITableRows> | ITableRows | any
    empty?: any
    props?: {
        tr?: TableRowProps
        thead?: TableHeadProps
    }
    checkbox?: {
        state: Array<string>
        update(value: Array<string>): void
        isDisabled?: boolean
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
                        <Table color="#fff" width="100%" variant="unstyled" borderRadius="8px" padding="0 24px">
                            <Tbody>
                                {Object.keys(rows).map((el, key) => (
                                    <Tr key={key} _first={{ borderTopRadius: "8px" }} _last={{ borderBottomRadius: "8px" }}>
                                        <td width={"30%"}>{rows[el].caption ? rows[el].caption : el}</td>
                                        <td>{rows[el].value}</td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    ) : rows instanceof Array ? (
                        <Table color="#fff" width="100%" variant="unstyled" borderRadius="8px" padding="0 24px">
                            <Thead background={"#262626"} {...props?.thead}>
                                <Tr verticalAlign={"baseline"}>
                                    {checkbox && <Th textTransform="uppercase" padding="14px 15px 14px 0"><Checkbox onChange={(e) => selectAll(e.target.checked)} isDisabled={checkbox.isDisabled} colorScheme='green'></Checkbox></Th>}
                                    {Object.keys(rows[0]).filter(el => el !== "_data").map((el, key) =>
                                        <Th _first={{ borderTopLeftRadius: "8px" }} _last={{ borderTopRightRadius: "8px" }} textTransform="uppercase" padding="16px 24px" {...rows[0][el].props} key={key}>
                                            <AppTypography textTransform="none" fontSize='12px' color="#7B7B7B">
                                                {typeof rows[0][el].caption !== "undefined" ? rows[0][el].caption : capitalizeFirstLetter(el)}
                                            </AppTypography>
                                        </Th>
                                    )}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {rows.map((el: any, key) => {
                                    return (
                                        <Tr {...key !== 0 && { borderTop: "1px solid #292929" }} key={key} {...props?.tr} _first={{ borderTopRadius: "8px" }} _last={{ borderBottomRadius: "8px" }}>
                                            {checkbox && (
                                                <Td width="50" padding="14px 15px 14px 0">
                                                    <Checkbox
                                                        isChecked={checkbox.state.includes(el?._data?._id || key)}
                                                        isDisabled={checkbox.isDisabled}
                                                        colorScheme='green'
                                                        onChange={(e) => selected(el?._data?._id || key, e.target.checked)}
                                                    >
                                                    </Checkbox>
                                                </Td>
                                            )}
                                            {Object.keys(el).filter(el => el !== "_data").map((item, key) => (
                                                <Td padding="16px 24px" fontSize=".9rem" {...el[item].props} key={key}>
                                                    {el[item].value}
                                                </Td>
                                            ))}
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    ) : null}
                </>
            ) : empty || ""}
        </>
    )
}

export default AppTable
