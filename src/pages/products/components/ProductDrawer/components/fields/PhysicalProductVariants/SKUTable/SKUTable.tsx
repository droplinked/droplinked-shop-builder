import { ColumnDef } from '@tanstack/react-table'
import Table from 'components/redesign/table-v2/TableV2'
import useProductForm from 'pages/products/hooks/useProductForm'
import { updatePropertiesOnSKUDelete } from 'pages/products/utils/skuUtils'
import { ProductProperty } from 'pages/products/utils/types'
import React, { useCallback } from 'react'
import SKURow from './SKURow'

export default function SKUTable() {
    const { values: { sku, properties }, setFieldValue } = useProductForm()

    const columns: ColumnDef<any>[] = [
        { accessorKey: '', header: 'Variant' },
        { accessorKey: '', header: 'Price' },
        { accessorKey: '', header: 'Quantity' },
        { accessorKey: '', header: 'External ID' }
    ]

    const handleInputChange = useCallback((index: number, field: string, value: any) => {
        const updatedSKUs = [...sku]
        updatedSKUs[index] = {
            ...updatedSKUs[index],
            [field]: value
        }
        setFieldValue('sku', updatedSKUs)
    }, [sku, setFieldValue])

    const toggleQuantity = useCallback((index: number) => {
        const currentSKU = sku[index]
        const newQuantity = currentSKU.quantity === 1000000 ? 0 : 1000000
        handleInputChange(index, 'quantity', newQuantity)
    }, [handleInputChange, sku])

    const handleRemoveSKU = useCallback((index: number) => {
        const updatedSKUs = sku.filter((_, skuIndex) => skuIndex !== index)
        const updatedProperties: ProductProperty[] = updatePropertiesOnSKUDelete(properties, updatedSKUs)
        setFieldValue('sku', updatedSKUs)
        setFieldValue('properties', updatedProperties)
    }, [sku, properties, setFieldValue])

    return (
        <Table.Root
            columns={columns}
        // hasActionColumn
        >
            <Table.Head data={sku} />
            <Table.Body>
                {sku.map((currentSKU, index) => (
                    <SKURow
                        key={index}
                        currentSKU={currentSKU}
                        index={index}
                        onInputChange={handleInputChange}
                        onToggleQuantity={toggleQuantity}
                        onRemoveSKU={handleRemoveSKU}
                    />
                ))}
            </Table.Body>
        </Table.Root>
    )
}