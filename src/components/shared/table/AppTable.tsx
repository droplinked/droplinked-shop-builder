import { Text } from '@chakra-ui/react'
import React from 'react'
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
}

function AppTable({ rows, vertical }: IAppTable) {
    return (
        <>
            {rows && rows.length ? (
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
                                        <Text fontFamily={"aven"}>{typeof rows[0][el].caption !== "undefined" ? rows[0][el].caption : el}</Text>
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
            ) : null}
        </>
    )
}

export default AppTable