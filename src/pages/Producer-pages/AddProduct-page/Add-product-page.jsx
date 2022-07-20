import "./Add-product-page-style.scss"


import InputImagesGroup from "../../../components/shared/InputImageGroupe/Input-images-component"
import FormInput from "../../../components/shared/FormInput/FormInput"
import VariantItem from "../components/variant item component/Variant-item-component"
import BasicButton from "../../../components/shared/BasicButton/BasicButton"
import AddVariantForm from "../components/add variant form/Add-variantForm-component"
import CheckBox from "../../../components/shared/Checkbox/CheckBox-component"
import Dropdown from "../../../components/shared/Dropdown/Dropdown-component"

import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { getVariants, postProduct } from "../../../api/Producer-apis/Product-api"
import { getCollections } from "../../../api/Producer-apis/Collection-api"
import { useToasty } from "../../../context/toastify/ToastContext"


function AddProductPage() {

    const token = JSON.parse(localStorage.getItem('token'));

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [selectedCollection, setSelectCollection] = useState("")
    const [images, setImages] = useState([])
    const [addvariant, setAddvariant] = useState(false)
    const [variants, setVariants] = useState([])
    const [options, setOptions] = useState([])
    const [varintType, setVariantType] = useState(null)
    const [collectionList, setCollection] = useState([])
    const [disbtn, setdisbtn] = useState(false)

    const { successToast , errorToast } = useToasty()

    const navigate = useNavigate();


    useEffect(() => {
        if (token == null) { navigate("/") }

        const getDate = async () => {
            let vrnt = await getVariants();
            let coll = await getCollections()
            setVariantType(vrnt)
            coll = coll.map(col =>{return  {id:col._id , value:col.title}})
            setCollection(coll)
        }
        getDate()

    }, [])


    const toggleAddVariant = () => {
        setAddvariant(p => !p)
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



    const submitForm = async (e) => {
        e.preventDefault()
        if (title == "") {
            errorToast("Merch name is required");
            return;
        } else if (description == "") {
            errorToast("Merch description is required");
            return;
        }
        else if (selectedCollection == "") {
            errorToast("Select a collection");
            return;
        } else if (variants.length == 0) {
            errorToast("Add a variant");
            return;
        } else if (images.length == 0) {
            errorToast("Add a image for merch");
            return;
        }

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
            successToast("Merch added successfully");
            navigate("/producer/ims")
        } else {
            errorToast(result)
            setdisbtn(false)
        }
    }


    const onChnageCheckBox = (e, val, name) => {
        let newOptions = []
        if (e.target.checked) {
            newOptions = options.map(opt => opt)
            newOptions.push({ optionName: name, optionID: val })
        } else {
            newOptions = options.filter(opt => opt.optionID != val)
        }
        setOptions(newOptions)
    }

    const deleteVariant = (id, vari) => {
        let arr = []
        for (const v of variants) {
            arr.push(v)
        }
        arr.forEach((item, i) => {
            if (i == id) { arr.splice(i, 1) }
        })
        setVariants(arr)
    }

    const editVariant = (e) => {
    }



    return (
        <div className="add-product-page-wrapper"  >
            <div className="ims-title mb-5">Add new item</div>
            <div className="mb-4 w-100 p-0">
                <FormInput label={"Title"} changeValue={changeTitle} value={title} />
            </div>
            <div className="mb-4 w-100 p-0" >            
               <FormInput  type={"textarea"} label={"Description"} changeValue={changeDescription} value={description} /> 
            </div>
            <dir className="drop-wrape">
            {collectionList &&  <Dropdown value={selectedCollection} pairArray={collectionList} change={changeCollection} placeholder={"Choose collection"}/>}
            </dir>
            <div className="mt-5 mb-3 w-100 d-flex justify-content-center align-items-center">
                <InputImagesGroup setState={setImages} state={images} />
            </div>
            <div className="select-variant-wrap mt-4">
                <p>Choose options : </p>
                {(varintType != undefined) &&
                    <>
                        {varintType.map(item => {
                            return <CheckBox key={item._id} val={item._id} onch={onChnageCheckBox}>{item.name}</CheckBox>
                        })}
                    </>
                }
            </div>
            <div className="mt-5 w-100">
                {variants && variants.map((variant, i) => {
                    return <VariantItem key={i} vari={variant} id={i} dlt={deleteVariant} edit={editVariant} />
                })}
            </div>

            <div className="mt-5 w-100 d-flex justify-content-center align-items-center">
                {(addvariant == false)
                    ?
                    <div className="col-12 col-md-4">
                        <BasicButton click={toggleAddVariant}>Add variant</BasicButton>
                    </div>
                    :

                    <AddVariantForm state={variants} setState={setVariants} toggle={toggleAddVariant} optionsArray={options} />
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