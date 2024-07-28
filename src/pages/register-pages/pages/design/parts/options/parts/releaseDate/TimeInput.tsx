import { Input, InputProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends InputProps { }

function TimeInput({ ...props }: Props) {
    return (
        <Input
            type="number"
            variant={"unstyled"}
            width={16}
            maxWidth={16}
            height={12}
            outline="none"
            border={"3px solid #141414"}
            borderRadius={8}
            padding={1}
            textAlign={"center"}
            background="#141414"
            color="#808080"
            _focus={{ borderColor: "primary" }}
            onKeyDown={(e) => { if (["+", "-", "e"].includes(e.key)) e.preventDefault() }}
            {...props}
        />
    )
}

export default TimeInput