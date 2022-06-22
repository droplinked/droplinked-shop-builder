import "./Add-product.page.scss"
import { useState, useEffect } from "react"
import BasicInput from "../../../components/features/input components/basic input component/Basic-component"
import BasicDropDown from "../../../components/features/input components/basic dropdown/Basic-dropdown-component"
import InputImageComponent from "../../../components/features/input components/input image component/Input-image-component"
import CheckBoxBasic from "../../../components/features/input components/basic checkbox component/CheckBox-component"
import VariantItem from "./variant item component/Variant-item-component"
import BasicButton from "../../../components/features/buttons components/basic button/BasicButton"
import AddVariantForm from "./add variant form/Add-variantForm-component"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"
import "react-toastify/dist/ReactToastify.css";

function AddProductPage() {

    const token = JSON.parse(localStorage.getItem('token'));

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [selectedCollection, setSelectCollection] = useState("")
    const [images, setImages] = useState([])
    const [addvariant, setAddvariant] = useState(false)
    const [variants, setVariants] = useState([])
    const [options, setOptions] = useState([])
    const [varintType, setVariantType] = useState([])
    const [collectionList, setCollection] = useState([])
    const [disbtn, setdisbtn] = useState(false)


    const navigate = useNavigate();
 

    useEffect(() => {
        if (token == null) { navigate("/") }

        let url1 = BasicURL + "/producer/product/variant"
        let url2 = BasicURL + "/producer/collection"

        const requestOne = axios.get(url1, { headers: { Authorization: 'Bearer ' + token } });
        const requestTwo = axios.get(url2, { headers: { Authorization: 'Bearer ' + token } });

        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
            setVariantType(responseOne.data.data.variants);
            setCollection(responseTwo.data.data.collections);
        })).catch(errors => {
            console.log(errors);
        })
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



    const submitForm = (e) => {
        e.preventDefault()
        if (title == "") {
            toast.error("Merch name is required");
            return;
        } else if (description == "") {
            toast.error("Merch description is required");
            return;
        }
        else if (selectedCollection == "") {
            toast.error("Select a collection");
            return;
        } else if (variants.length == 0) {
            toast.error("Add a variant");
            return;
        } else if (images.length == 0) {
            toast.error("Add a image for merch");
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

        axios.post(BasicURL + '/producer/product', proDetail,
            { headers: { Authorization: 'Bearer ' + token } })
            .then((res) => {
                toast.success("Merch added successfully");
                navigate("/producer/ims")
            })
            .catch(e => {
                toast.error(e.response.data.message)
                setdisbtn(false)
            });

    }


    const onChnageCheckBox = (e, val, name) => {
        let newOptions = []
        if (e.target.checked) {
            newOptions = options.map(opt => opt)
            newOptions.push({ optionName: name, optionID: val })
        } else {
            newOptions = options.filter(opt =>  opt.optionID != val)
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
                <BasicInput text={"Title"} change={changeTitle} />
            </div>
            <div className="mb-4 w-100 p-0">
                <BasicInput type={"textarea"} change={changeDescription} text={"Description "} />
            </div>
            <dir className="drop-wrape">
                <BasicDropDown valArray={collectionList} place={"Choose collection"} cnhg={changeCollection} />
            </dir>
            <div className="mt-5 mb-3 w-100 d-flex justify-content-center align-items-center">
                <InputImageComponent setState={setImages} state={images} />
            </div>
            <div className="select-variant-wrap mt-4">
                <p>Choose options : </p>
                {(varintType != undefined) &&
                    <>
                        {varintType.map(item => {
                            return <CheckBoxBasic key={item._id} val={item._id}  onch={onChnageCheckBox}>{item.name}</CheckBoxBasic>
                        })}
                    </>
                }
            </div>
            <div className="mt-5 w-100">
                {variants.map((variant, i) => {
                    return <VariantItem key={i} vari={variant} id={i} dlt={deleteVariant} edit={editVariant} />
                })}
            </div>

            <div className="mt-5 w-100 d-flex justify-content-center align-items-center">
                {(addvariant == false)
                    ?

                    <BasicButton text={"Add variant"} click={toggleAddVariant} />
                    :

                    <AddVariantForm state={variants} setState={setVariants} toggle={toggleAddVariant} optionsArray={options} />
                }
            </div>

            <div className="d-flex justify-content-between align-items-center"
                style={{ marginTop: "80px", width: "100%" }}>
                <div className="col-5 col-md-4">
                    <BasicButton text={"Cancel"} click={cancelForm} disable={disbtn} />
                </div>
                <div className="col-5 col-md-4">
                    <BasicButton text={"Submit"} click={submitForm} disable={disbtn} />
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </div>
    )
}

export default AddProductPage