import { VStack } from '@chakra-ui/react'
import React from 'react'
import FieldLabel from '../form/fieldLabel/FieldLabel'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from './style.module.scss'

interface IProps {
    value?: Date
    endDate?: Date
    onChange: any
    label?: string
    minDate?: Date
    className?: any
    inline?: boolean
    selectsRange?: boolean
    placeholderText?: string
}

function AppDatepicker({ onChange, value, label, minDate, placeholderText, inline, className, endDate, selectsRange }: IProps) {
    return (
        <VStack align="stretch" className={`${classes.datepicker} ${className || ''}`}>
            {label && <FieldLabel label={label} />}
            <DatePicker {...typeof endDate && { endDate }} selectsRange={selectsRange} selected={value} dateFormat="Y/M/d" inline={inline} placeholderText={placeholderText} {...minDate && { minDate }} onKeyDown={(e) => e.preventDefault()} onChange={(date) => onChange(date)} className={classes.input} />
        </VStack>
    )
}

export default AppDatepicker