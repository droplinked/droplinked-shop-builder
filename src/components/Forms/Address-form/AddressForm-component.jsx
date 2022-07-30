import { Box, Flex } from "@chakra-ui/react"
import { useState } from "react"
import { useAddress } from "../../../context/address/AddressContext"

import FormInput from "../../shared/FormInput/FormInput"
import BasicButton from "../../shared/BasicButton/BasicButton"



export default function AddressForm({ type, addressBook, close }) {

    const { addAddress, updateAddress } = useAddress()


    // form values states
    const [line1, setLine1] = useState((addressBook) ? addressBook.addressLine1 : '')
    const [line2, setLine2] = useState((addressBook) ? addressBook.addressLine2 : '')
    const [country, setCountry] = useState((addressBook) ? addressBook.country : '')
    const [city, setCity] = useState((addressBook) ? addressBook.city : '')
    const [state, setState] = useState((addressBook) ? addressBook.state : '')
    const [zip, setZip] = useState((addressBook) ? addressBook.zip : '')
    const [firstname, setFirstname] = useState((addressBook) ? addressBook.firstname : '')
    const [lastname, setLastname] = useState((addressBook) ? addressBook.lastname : '')
    // state for show wrror
    const [error, setError] = useState('')

    // state for loading mode
    const [loading, setLoading] = useState(false)



    // change state valuse
    const ChangeLine1 = e => {
        setLine1(e.target.value)
        if (error == 'line1') setError('')
    }

    const ChangeLine2 = e => {
        setLine2(e.target.value)
    }

    const ChangeCountry = e => {
        setCountry(e.target.value)
        if (error == 'country') setError('')
    }

    const ChangeCity = e => {
        setCity(e.target.value)
        if (error == 'city') setError('')
    }

    const ChangeState = e => {
        setState(e.target.value)
        if (error == 'state') setError('')
    }

    const ChangeZip = e => {
        setZip(e.target.value)
        if (error == 'zip') setError('')
    }

    const ChangeFirstname = e => {
        setFirstname(e.target.value)
        if (error == 'firstname') setError('')
    }

    const ChangeLastname = e => {
        setLastname(e.target.value)
        if (error == 'lastname') setError('')
    }

    // submit form
    const submitForm = async () => {

       

        let validation = validationForm()

        if (!validation) return

       
        let formDate 

        if(type == "CUSTOMER"){
            formDate = {
                firstname: firstname,
                lastname: lastname,
                addressLine1: line1,
                addressLine2: line2,
                country: country,
                city: city,
                state: state,
                zip: zip,
                addressType: type
            }
        }else{
             formDate = {
                addressLine1: line1,
                addressLine2: line2,
                country: country,
                city: city,
                state: state,
                zip: zip,
                addressType: type
            }
        }

        setLoading(true)
        let result
        if (addressBook) {
            result = await updateAddress(formDate, addressBook._id);
        } else {
            result = await addAddress(formDate);
        }
        setLoading(false)

        if (result == true) close()
    }


    // validation form required
    const validationForm = () => {
        if (line1 == '') {
            setError('line1')
            return false
        }
        else if (country == '') {
            setError('country')
            return false
        }
        else if (city == '') {
            setError('city')
            return false
        }
        else if (state == '') {
            setError('state')
            return false
        }
        else if (zip == '') {
            setError('zip')
            return false
        } else if (type == "CUSTOMER") {
            let flag = true ;
            if (firstname == '') {
                setError('firstname')
                flag =  false
            }
            if (lastname == '') {
                setError('lastname')
                flag =  false
            }
            return flag
        } else {
            return true
        }
    }

    return (
        <Box
            border='1px'
            borderColor='#fff'
            borderRadius="15px"
            py="40px"
            px={{ base: "10px", md: "30px" }}
        >
            <FormInput
                mb='30px'
                label={"Address line 1"}
                placeholder={"Address line 1"}
                value={line1}
                changeValue={ChangeLine1}
                isError={(error == "line1") && "Address line1 is required"}
            />
            <FormInput
                mb='30px'
                label={"Address line 2 ( building of unit #)"}
                placeholder={"Address line 2 ( building of unit #)"}
                value={line2}
                changeValue={ChangeLine2}
            />
            <Flex
                mb='30px'
                justifyContent='space-between'
                alignItems='center'
            >
                <FormInput
                    w='45%'
                    label={"Country"}
                    placeholder={"Country"}
                    value={country}
                    changeValue={ChangeCountry}
                    isError={(error == "country") && "Country is required"}
                />
                <FormInput
                    w='45%'
                    label={"City"}
                    placeholder={"City"}
                    value={city}
                    changeValue={ChangeCity}
                    isError={(error == "city") && "City is required"}
                />
            </Flex>

            <Flex
                mb='30px'
                justifyContent='space-between'
                alignItems='center'
            >
                <FormInput
                    w='45%'
                    label={"State"}
                    placeholder={"State"}
                    value={state}
                    changeValue={ChangeState}
                    isError={(error == "state") && "State is required"}
                />
                <FormInput
                    w='45%'
                    label={"Zip"}
                    placeholder={"Zip"}
                    value={zip}
                    changeValue={ChangeZip}
                    isError={(error == "zip") && "Zip is required"}
                />
            </Flex>

            {(type == "CUSTOMER") ?
                <Flex
                    mb='60px'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <FormInput
                        w='45%'
                        label={"First Name"}
                        placeholder={"firstnams"}
                        value={firstname}
                        changeValue={ChangeFirstname}
                        isError={(error == "firstname") && "firstname is required"}
                    />
                    <FormInput
                        w='45%'
                        label={"Last Name"}
                        placeholder={"lastname"}
                        value={lastname}
                        changeValue={ChangeLastname}
                        isError={(error == "lastname") && "Lastname is required"}
                    />
                </Flex>
                :
                <Box mb='60px'></Box>
            }

            <Flex
                justifyContent='space-between'
                alignItems='center'
            >
                <BasicButton w='45%' p='12px 16px' click={close} loading={loading} disabled={loading} >Cansel</BasicButton>
                <BasicButton w='45%' p='12px 16px' click={submitForm} loading={loading} disabled={loading}>Submit</BasicButton>
            </Flex>
        </Box>
    )
}