import { VStack } from '@chakra-ui/react'
import React from 'react'
import FieldLabel from '../form/fieldLabel/FieldLabel'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from './style.module.scss'

interface IProps {
    value?: Date
    onChange: any
    label?: string
    minDate?: Date
    placeholderText?: string
}

function AppDatepicker({ onChange, value, label, minDate, placeholderText }: IProps) {
    return (
        <VStack align="stretch" className={classes.datepicker}>
            {label && <FieldLabel label={label} />}
            <DatePicker selected={value} dateFormat="Y/M/d" placeholderText={placeholderText} {...minDate && { minDate }} onKeyDown={(e) => e.preventDefault()} onChange={(date) => onChange(date)} className={classes.input} />
        </VStack>
    )
}

export default AppDatepicker