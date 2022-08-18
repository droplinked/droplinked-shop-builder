import { Flex, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getCollections } from "../../../api/producer/Collection-api"

import FormInput from "../../../components/shared/FormInput/FormInput"
import InputImagesGroup from "../../../components/shared/InputImageGroupe/Input-images-component"
import Dropdown from "../../../components/shared/Dropdown/Dropdown-component"

const ProductInformation = ({ productInfo, setProductInfo, defaultValue }) => {

    const [images, setImages] = useState(defaultValue ? defaultValue.images : [])
    const [collectionList, setCollection] = useState([])

    // change productInfo.images with images state changing 
    useEffect(() => {
        onchnageValues(images, "IMAGE")
    }, [images])

    useEffect(() => {
        initialState()
        initialCollection()
    }, [])


    const initialCollection = async () => {
        let result = await getCollections()
        if (result != null) {
            let collections = result.map(col => { return { id: col._id, value: col.title } })
            setCollection(collections)
        }
    }


    const initialState = () => {
        if (defaultValue) {
            setProductInfo({
                title: defaultValue.title,
                description: defaultValue.description,
                productCollectionID: defaultValue.productCollectionID,
                images: defaultValue.images
            })

        }
        else {
            setProductInfo({ title: '', description: '', productCollectionID: '', images: [] })
        }
    }

    const onchnageValues = (e, valueType) => {
        switch (valueType) {
            case "TITLE":
                setProductInfo({ ...productInfo, title: e.target.value })
                return
            case "DESCRIPTION":
                setProductInfo({ ...productInfo, description: e.target.value })
                return
            case "IMAGE":
                setProductInfo({ ...productInfo, images: e })
                return
            case "COLLECTIONID":
                setProductInfo({ ...productInfo, productCollectionID: e.target.value })
                return
        }
    }

    return (
        <>
            {productInfo &&
                <Box w='100%'>

                    <Box w='100%' mb={{ base: '10px', md: '20px' }}>
                        <FormInput
                            label={"Title"}
                            changeValue={(e) => { onchnageValues(e, "TITLE") }}
                            value={productInfo.title}
                        />
                    </Box>
                    <Box w='100%' mb={{ base: '20px', md: '30px' }}>
                        <FormInput
                            type={"textarea"}
                            label={"Description"}
                            changeValue={(e) => { onchnageValues(e, "DESCRIPTION") }}
                            value={productInfo.description}
                        />
                    </Box>

                    <Flex justifyContent='center'>
                        <Box
                            w={{ base: "100%", md: '50%' }}
                            mb={{ base: '20px', md: '30px' }}
                        >
                            {(collectionList.length>0) && <Dropdown
                                value={productInfo.productCollectionID}
                                pairArray={collectionList}
                                change={(e) => { onchnageValues(e, "COLLECTIONID") }}
                            placeholder={(defaultValue)
                                ?collectionList.find(collection=>collection.id==defaultValue.productCollectionID).value
                                :"Choose collection"
                                } 
                            />}
                        </Box>
                    </Flex>
                    <Box w='100%' mb={{ base: '10px', md: '20px' }}>
                        <InputImagesGroup setState={setImages} state={images} />
                    </Box>
                </Box>
            }
        </>
    )
}

export default ProductInformation