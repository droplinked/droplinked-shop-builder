import { InputProps } from '@chakra-ui/react';
import { IAppForm } from 'components/common/form/FormModel';
import AppInput from 'components/common/form/textbox/AppInput';
import React from 'react';

type combine = IAppForm & InputProps

interface Props extends combine {
    name: string;
}

function ContactUsInput({ name, ...props }: Props) {
    return (
        <AppInput
            name={name}
            border={"1px solid #3C3C3C"}
            borderRadius={8}
            backgroundColor={"#262626"}
            padding={4}
            color={"#7B7B7B"}
            fontSize={16}
            {...props}
            _hover={{ backgroundColor: "#262626" }}
            _focus={{ backgroundColor: "#262626" }}
        />
    )
}

export default ContactUsInput