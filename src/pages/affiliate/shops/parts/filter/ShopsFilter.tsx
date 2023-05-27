import FiltersDatagrid from 'components/common/datagrid/parts/filters/FiltersDatagrid'
import React from 'react'

function ShopsFilter() {
    const filters = [
        {
            title: "Sort",
            list: [
                {
                    title: "New Window",
                    onClick: () => { }
                },
                {
                    title: "Open Closed Tab",
                    onClick: () => { }
                }
            ]
        },
        {
            title: "Filter",
            list: [
                {
                    title: "New Window",
                    onClick: () => { }
                },
                {
                    title: "Open Closed",
                    onClick: () => { }
                }
            ]
        }
    ]

    return (
        <FiltersDatagrid item={filters} />
    )
}

export default ShopsFilter