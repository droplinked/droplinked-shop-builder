import "./Add-product-page-style.scss"


import InputImagesGroup from "../../../components/shared/InputImageGroupe/Input-images-component"
import FormInput from "../../../components/shared/FormInput/FormInput"
import VariantItem from "../components/variant-item-component/Variant-item-component"
import BasicButton from "../../../components/shared/BasicButton/BasicButton"
import AddVariantForm from "./Add-variantForm-component"
import CheckBox from "../../../components/shared/Checkbox/CheckBox-component"
import Dropdown from "../../../components/shared/Dropdown/Dropdown-component"

import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { getVariants, postProduct } from "../../../api/producer/Product-api"
import { getCollections } from "../../../api/producer/Collection-api"
import { useToasty } from "../../../context/toastify/ToastContext"


function AddProductPage() {

    const token = JSON.parse(localStorage.getItem('token'));

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [selectedCollection, setSelectCollection] = useState("")
    const [images, setImages] = useState([])
    const [options, setOptions] = useState([])
    const [variants, setVariants] = useState([])

    const [addvariant, setAddvariant] = useState(false)
    const [variantSelected, setVariantSelected] = useState(null)
    const [disbtn, setdisbtn] = useState(false)

    // state for vanriants type 
    const [varintType, setVariantType] = useState(null)
    // state for collection list 
    const [collectionList, setCollection] = useState([])


    const { successToast, errorToast } = useToasty()
    const navigate = useNavigate();


    useEffect(() => {
        if (token == null) { navigate("/") }
        initializ()
    }, [])


    // initialize variantType and collectin List
    const initializ = () => {
        getVariants()
            .then(e => setVariantType(e))
            .catch(e => console.log(e))
        getCollections()
            .then(e => {
                // convert collection for pass to Dropdown
                let collections = e.map(col => { return { id: col._id, value: col.title } })
                setCollection(collections)
            })
            .catch(e => console.log(e))
    }



    // close variant form
    const closeForm = () => {
        setAddvariant(false)
        setVariantSelected(null)
    }

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const changeDescription = (e) => {
        setDescription(e.target.value)
    }

    const changeCollection = (e) => {
        setSelectCollection(e.target.value)
    }

    const cancelForm = () => {
        navigate("/producer/ims")
    }

    const validationForm = () => {
        if (title == "") {
            errorToast("Item name is required");
            return true
        }
        //  else if (description == "") {
        //     errorToast("Item description is required");
        //     return true
        // }
        else if (selectedCollection == "") {
            errorToast("Choose a collection");
            return true
        } else if (images.length == 0) {
            errorToast("Add an image for this item");
            return true
        } else if (variants.length == 0) {
            errorToast("Add a new variant");
            return true
        } else {
            return false
        }
    }



    const submitForm = async (e) => {
        e.preventDefault()

        if (validationForm()) return

        let media = [];
        images.map((img, i) => {
            media.push({ url: img, isMain: (i == 0) })
        })

        const proDetail = {
            title: title,
            description: description,
            priceUnit: "USD",
            productCollectionID: selectedCollection,
            media: media,
            sku: variants
        }

        setdisbtn(true)
        let result = await postProduct(proDetail)
        if (result == true) {
            successToast("Item added successfully");
            navigate("/producer/ims")
        } else {
            errorToast(result)
            setdisbtn(false)
        }
    }


    // change selected options with change checkbox
    const onChnageCheckBox = (e) => {
        let newOptions = []
        if (e.target.checked) {
            newOptions = options.map(opt => opt)
            newOptions.push({ optionName: e.target.value , optionID: e.target.id })
        } else {
            newOptions = options.filter(opt => opt.optionID != e.target.id)
        }
        setOptions(newOptions)
    }

    //delete a variant 
    const deleteVariant = (index) => {
        let newVariantList = []
        for (const v of variants) newVariantList.push(v)
        newVariantList.forEach((item, i) => { if (i == index) newVariantList.splice(i, 1) })
        setVariants(newVariantList)
    }

    const editVariant = (e, index) => {
        setVariantSelected({ ...e, index: index })
    }


    return (
        <div className="add-product-page-wrapper"  >
            <div className="ims-title mb-5">Add new item</div>
            <div className="mb-4 w-100 p-0">
                <FormInput label={"Title"} changeValue={changeTitle} value={title} />
            </div>
            <div className="mb-4 w-100 p-0" >
                <FormInput type={"textarea"} label={"Description"} changeValue={changeDescription} value={description} />
            </div>
            <dir className="drop-wrape">
                {collectionList && <Dropdown value={selectedCollection} pairArray={collectionList} change={changeCollection} placeholder={"Choose collection"} />}
            </dir>
            <div className="mt-5 mb-3 w-100 d-flex justify-content-center align-items-center">
                <InputImagesGroup setState={setImages} state={images} />
            </div>
            <div className="select-variant-wrap mt-4">
                <p>Choose options: </p>
                {(varintType != null) &&
                    <>
                        {varintType.map(item => {
                            return <CheckBox key={item._id} id={item._id} change={onChnageCheckBox} disabled={(variants.length > 0)}>{item.name}</CheckBox>
                        })}
                    </>
                }
            </div>
            <div className="mt-5 w-100">
                {variants && variants.map((variant, i) => {
                    return (
                        <VariantItem
                            key={i}
                            variant={variant}
                            id={i}
                            deleteVariant={deleteVariant}
                            editVariant={editVariant} />
                    )
                })}
            </div>

            <div className="mt-5 w-100 d-flex justify-content-center align-items-center">
                {(addvariant == false && variantSelected == null)
                    ?
                    <div className="col-12 col-md-4">
                        <BasicButton click={() => { setAddvariant(true) }}>Add variant</BasicButton>
                    </div>
                    :

                    <AddVariantForm
                        state={variants}
                        setState={setVariants}
                        toggle={closeForm}
                        defaultVariant={variantSelected}
                        optionsArray={options}
                    />
                }
            </div>

            <div className="d-flex justify-content-between align-items-center"
                style={{ marginTop: "80px", width: "100%" }}>
                <div className="col-5 col-md-4">
                    <BasicButton click={cancelForm} disabled={disbtn}>Cancel</BasicButton>
                </div>
                <div className="col-5 col-md-4">
                    <BasicButton click={submitForm} disabled={disbtn}>Submit</BasicButton>
                </div>
            </div>
        </div>
    )
}

export default AddProductPage