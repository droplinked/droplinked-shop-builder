import Select from 'pages/invoice-management/components/Select'
import React from 'react'

interface Props {
    onWalletChange: (wallet: string) => void
}

function WalletSelect({ onWalletChange }: Props) {
    const statusOptions = [
        { title: "Active", value: "ACTIVE" },
        { title: "Pending", value: "PENDING" },
        { title: "Checked Out", value: "CHECKED_OUT" }
    ]

    return (
        <Select
            items={statusOptions}
            labelAccessor='title'
            valueAccessor='value'
            selectProps={{
                width: "100%",
                borderColor: "#292929",
                bgColor: "#1C1C1C",
                color: "white",
                placeholder: "Wallet",
                onChange: (e) => onWalletChange(e.target.value)
            }}
        />
    )
}

export default WalletSelect