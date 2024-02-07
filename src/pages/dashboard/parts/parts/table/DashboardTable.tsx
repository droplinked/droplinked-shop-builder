import AppTable, { ITableRows } from 'components/common/table/AppTable'
import React from 'react'
import DashboardEmpty from '../empty/DashboardEmpty'

interface IProps {
    items: Array<ITableRows>
}
function DashboardTable({ items }: IProps) {
    return (
        <AppTable
            empty={<DashboardEmpty />}
            props={{
                tr: { border: "none" },
                thead: {
                    borderTop: "none"
                }
            }}
            rows={items}
        />
    )
}

export default DashboardTable