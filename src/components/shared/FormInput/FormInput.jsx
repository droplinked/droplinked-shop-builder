import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea
} from '@chakra-ui/react'

export default function FormInput({ value, changeValue, label, type, placeholder, isError, ...otherProps }) {


  return (
    <FormControl {...otherProps} >
      <FormLabel
        htmlFor='input-com'
        fontWeight='600'
        fontSize={{ base: '14px', md: '20px' }}
        color='#fff'
      >{label}</FormLabel>
      {(type == "textarea")
        ?
        <Textarea
          id='input-com'
          type={(type) ? type : "text"}
          value={value}
          onChange={changeValue}
          fontWeight='600'
          fontSize={{ base: '14px', md: '20px' }}
          color='#fff'
          border='none'
        //  borderColor='#b3b3b3'
          borderRadius='8px'
          px="16px"
          py={{ base: "8px", md: "12px" }}
          outline='none'
          _focus={{ outline:'none'}}
          h='auto'
          placeholder={placeholder}
        />
        :
        <Input
          id='input-com'
          type={(type) ? type : "text"}
          value={value}
          onChange={changeValue}
          fontWeight='600'
          fontSize={{ base: '14px', md: '20px' }}
          color='#DBDBDB'
          bgColor='#181818'
          border='none'
        //  border='2px'
         // borderColor='#b3b3b3'
          borderRadius='8px'
          px="16px"
          py={{ base: "8px", md: "12px" }}
          outline='none'
          _focus={{ outline:'none' }}
          h='auto'
          placeholder={placeholder}
        />
      }
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