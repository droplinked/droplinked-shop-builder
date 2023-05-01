import React from 'react'
import classes from './style.module.scss'

interface Irows {
    [props: string]: {
        caption?: string
        value: any
        props?: Object
    }
}

interface IProps {
    vertical?: boolean
    rows?: Array<Irows> | Irows
}

function AppTable({ rows, vertical }: IProps) {
    return (
        <>
            {rows ? (
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
                                {Object.keys(rows[0]).map((el, key) => <th key={key}>{typeof rows[0][el].caption !== "undefined" ? rows[0][el].caption : el}</th>)}
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