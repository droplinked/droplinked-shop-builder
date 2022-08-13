import {  Spinner, Box, Input, FormLabel } from '@chakra-ui/react'
import { MdOutlineEdit , MdDeleteOutline} from "react-icons/md";
import { useRef, useState } from 'react'
import { useToasty } from "../../../context/toastify/ToastContext"

import defaultProfile from "../../../assest/profile/defaultProfile.png"
import axios from 'axios';

export default function InputImage({ image, setImage }) {

    const [loading, setLoading] = useState(false)
    
    const inputFile = useRef(null);
    const { successToast, errorToast } = useToasty()
  


    const changeImage = (e) => {

        const file = e.target.files[0];

        if (file.size > 500000) {
            errorToast("File size exceeded (max: 500 kb)");
            return;
        }
        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/gif" &&
            file.type !== "image/jpg"
        ) {
            errorToast("File type not supported");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        setLoading(true)
        axios.post('https://cdn.droplinked.com/upload', formData)
            .then(e => {
                setLoading(false);
                successToast('The image uploaded');
                setImage(e.data.small)
            })
            .catch(e => {
                errorToast(e.response.data.message);
                setLoading(false);
                return;
            })
    }

    return (
        <Box
            pos='relative'
            maxW='150px'
            w='150px'
            m="0px auto"
        >
            <Box
                pos='absolute'
                right='0px'
                zIndex='1'
                top='10px'
            >
                <Input
                    id="imageUpload"
                    display='none'
                    type='file'
                    ref={inputFile}
                    onChange={changeImage}
                />
                <FormLabel
                    htmlFor='imageUpload'
                    display='flex'
                    w='30px'
                    h='30px'
                    mb='0'
                    borderRadius='100%'
                    bgColor='#222'
                    border='2px'
                    borderColor='#8053ff'
                    cursor='pointer'
                    justifyContent='center'
                    alignItems='center'
                    _hover={{ border: "4px", borderColor: '#8053ff' }}
                >
                    <MdOutlineEdit style={{ fill:"white"}} />
                </FormLabel>
            </Box>
            {(image) &&
                <Box
                pos='absolute'
                left='0px'
                zIndex='1'
                top='10px'
            >
                <FormLabel
                    htmlFor='imageUpload'
                    display='flex'
                    w='30px'
                    h='30px'
                    mb='0'
                    borderRadius='100%'
                    bgColor='#222'
                    border='2px'
                    borderColor='#fa6653'
                    cursor='pointer'
                    justifyContent='center'
                    alignItems='center'
                    _hover={{ border: "4px", borderColor: '#fa6653' }}
                    onClick={() => {setImage('')}}
                >
                    <MdDeleteOutline style={{ fill:"white"}} />
                </FormLabel>
            </Box>
            }
            
            <Box
                w='100%'
                h='150px'
                pos='relative'
                borderRadius='100%'
                border='4px'
                borderColor='#8053ff'
                boxShadow='0px 2px 4px 0px rgba(0, 0, 0, 0.1)'
            >
                <Box
                    bgImage={(image == "") ? defaultProfile : image}
                    w='100%'
                    h='100%'
                    border='6px'
                    borderColor='#8053ff'
                    borderRadius='100%'
                    backgroundSize={(image == "")?"50%":'cover'}
                    bgRepeat='no-repeat'
                    bgPosition='center'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    {(loading) &&
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='#8053ff'
                            size='xl'
                        />
                    }
                </Box>
            </Box>
        </Box>
    )
}