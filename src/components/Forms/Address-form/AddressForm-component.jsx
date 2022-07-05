import { Box, Flex } from "@chakra-ui/react"
import { useState } from "react"
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"

import FormInput from "../../shared/FormInput/FormInput"
import BasicButton from "../../shared/BasicButton/BasicButton"
import axios from "axios"


export default function AddressForm({type , addressBook}) {

    let token = JSON.parse(localStorage.getItem("token"));

    // form values states
    const [line1, setLine1] = useState('')
    const [line2, setLine2] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    // state for show wrror
    const [error, setError] = useState('')

    // state for loading mode
    const [loading, setLoading] = useState('')



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

    // submit form
    const submitForm = () => {
        let validation = validationForm()
        if (!validation) return

        axios.post(`${BasicURL}/address`,
        {headers: { Authorization: "Bearer " + token }})
        .then(e => {

        })
        .catch(e => {
            console.log();
        })


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
                mb='60px'
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

            <Flex
                justifyContent='space-between'
                alignItems='center'
            >
                <BasicButton w='45%' p='12px 16px' click={submitForm}>Submit</BasicButton>
                <BasicButton w='45%' p='12px 16px'>Cansel</BasicButton>
            </Flex>
        </Box>
    )
}