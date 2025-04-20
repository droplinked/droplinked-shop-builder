import React from 'react'
import FilterInputs from './FilterInputs'

export default function HistoryTable() {
    const handleSerachChange = (value: string) => {
        console.log("Search value: ", value)
    }
    const handleStatusChange = (value: string) => {
        console.log("Status value: ", value)
    }

    return (
        <FilterInputs onSearchChange={handleSerachChange} onStatusChange={handleStatusChange} />
    )
}
