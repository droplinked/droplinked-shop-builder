import { Checkbox, Text } from '@chakra-ui/react'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React, { useCallback } from 'react'
import AppTypography from '../typography/AppTypography'
import classes from './style.module.scss'

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
    checkbox?: {
        state: Array<string>
        update(value: Array<string>): void
    }
}

function AppTable({ rows, vertical, empty, checkbox }: IAppTable) {
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
                        <table className={classes.table}>
                            <tbody>
                                {Object.keys(rows).map((el, key) => (
                                    <tr key={key}>
                                        <td width={"30%"}>{rows[el].caption ? rows[el].caption : el}</td>
                                        <td>{rows[el].value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : rows instanceof Array ? (
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    {checkbox && <th><Checkbox onChange={(e) => selectAll(e.target.checked)} colorScheme='green'></Checkbox></th>}
                                    {Object.keys(rows[0]).filter(el => el !== "_data").map((el, key) =>
                                        <th {...rows[0][el].props} key={key}>
                                            <AppTypography textTransform="none" size='12px' color="#FFF">
                                                {typeof rows[0][el].caption !== "undefined" ? rows[0][el].caption : capitalizeFirstLetter(el)}
                                            </AppTypography>
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((el: any, key) =>
                                    <tr key={key}>
                                        {checkbox && (
                                            <td width="50">
                                                <Checkbox
                                                    isChecked={checkbox.state.includes(el?._data?._id || key)}
                                                    colorScheme='green'
                                                    onChange={(e) => selected(el?._data?._id || key, e.target.checked)}
                                                >
                                                </Checkbox>
                                            </td>
                                        )}
                                        {Object.keys(el).filter(el => el !== "_data").map((item, key) => (
                                            <td {...el[item].props} key={key}>{el[item].value}</td>
                                        ))}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : null}
                </>
            ) : empty || ""}
        </>
    )
}

export default AppTable