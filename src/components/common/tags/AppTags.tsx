import React from 'react'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

interface IProps {
    value: Array<string | number>
    onChange(value: Array<string | number>): void
}

function AppTags({ onChange, value }: IProps) {
    return <TagsInput value={value} onChange={(value) => onChange(value)} />
}

export default AppTags