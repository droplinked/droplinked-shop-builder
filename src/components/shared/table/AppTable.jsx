import React from 'react'
import classes from './style.module.scss'

function AppTable({ rows }) {
    return (
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
    )
}

export default AppTable