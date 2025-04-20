import Button from 'components/redesign/button/Button';
import React from 'react'

export default function ExportButton() {
    const handleExport = () => {
        alert("Export functionality not implemented yet.");
    }

    return (
        <Button
            fontSize={14}
            fontWeight={500}
            iconSpacing="6px"
            paddingInline="14px"
            variant='secondary'
            onClick={handleExport}
        >
            Export
        </Button>
    )
}
