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
            border={"1px solid"}
            borderColor="neutral.gray.700"
            borderRadius={8}
            backgroundColor={"neutral.gray.850"}
            padding={4}
            color={"text.subtext.placeholder.dark"}
            fontSize={16}
            {...props}
            _hover={{ backgroundColor: "neutral.gray.850" }}
            _focus={{ backgroundColor: "neutral.gray.850" }}
        />
    )
}

export default ContactUsInput