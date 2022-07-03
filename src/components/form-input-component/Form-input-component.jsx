import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

export default function FormInputComponent({value , changeValue , label, type , ...otherProps}) {

    // /isInvalid={isError}
    return (
        <FormControl {...otherProps}>
            <FormLabel
                htmlFor='input-com'
                fontWeight='600'
                fontSize='20px'
                color='#fff'
            >{label}</FormLabel>
            <Input
                id='input-com'
                type={(type)?type:"text"}
                value={value}
                onChange={changeValue}
                fontWeight='600'
                fontSize='20px'
                color='#fff'
                border='2px'
                borderColor='#b3b3b3'
                borderRadius='8px'
                px="16px"
                py="12px"
                outline='none'
                _focus={{borderColor:"#8053ff"}}
                h='auto'
                
            //   value={input}
            //  onChange={handleInputChange}
            />
            {/* {!isError ? (
                <FormHelperText>
                    Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
            ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
            )} */}
        </FormControl>
    )
}