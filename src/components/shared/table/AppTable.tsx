import { Text } from '@chakra-ui/react'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React from 'react'
import AppTypography from '../typography/AppTypography'
import classes from './style.module.scss'

export interface ITableRows {
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
}

function AppTable({ rows, vertical, empty }: IAppTable) {
    const checkRows = vertical ? Object.keys(rows).length : rows.length
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
                                {Object.keys(rows[0]).map((el, key) =>
                                    <th key={key}>
                                        <AppTypography size='12px' weight='bolder'>
                                            {typeof rows[0][el].caption !== "undefined" ? capitalizeFirstLetter(rows[0][el].caption) : capitalizeFirstLetter(el)}
                                        </AppTypography>
                                    </th>
                                )}
                            </thead>
                            <tbody>
                                {rows.map((el, key) =>
                                    <tr key={key}>
                                        {Object.keys(el).map((item, key) => (
                                            <td {...el[item].props} key={key}>{el[item].value}</td>
                                        ))}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : null}
                </>
            ) : empty || "empty"}
        </>
    )
}

export default AppTable