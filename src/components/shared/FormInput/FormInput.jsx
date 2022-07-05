import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

export default function FormInput({ value, changeValue, label, type, placeholder, isError, ...otherProps }) {


  return (
    <FormControl {...otherProps}>
      <FormLabel
        htmlFor='input-com'
        fontWeight='600'
        fontSize={{base:'14px' , md:'20px'}}
        color='#fff'
      >{label}</FormLabel>
      <Input
        id='input-com'
        type={(type) ? type : "text"}
        value={value}
        onChange={changeValue}
        fontWeight='600'
        fontSize={{base:'14px' , md:'20px'}}
        color='#fff'
        border='2px'
        borderColor='#b3b3b3'
        borderRadius='8px'
        px="16px"
        py={{base:"8px" , md:"12px"}}
        outline='none'
        _focus={{ borderColor: "#8053ff" }}
        h='auto'
        placeholder={placeholder}
      />

      {isError && (
        <FormHelperText
          color='red'
        >
          {isError}
        </FormHelperText>
      )}
    </FormControl>
  )
}