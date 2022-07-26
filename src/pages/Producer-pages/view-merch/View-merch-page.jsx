import "./View-merch-page-style.scss"

import FormInput from "../../../components/shared/FormInput/FormInput"
import InputImagesGroup from "../../../components/shared/InputImageGroupe/Input-images-component"
import Variant from "./Variant-component"
import AddVariantForm from "./AddVariant-form"
import Loading from "../../../components/shared/loading/Loading";
import Dropdown from "../../../components/shared/Dropdown/Dropdown-component"
import BasicButton from "../../../components/shared/BasicButton/BasicButton"

import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useToasty } from "../../../context/toastify/ToastContext"
import { useNavigate } from 'react-router-dom';
import { getCollections } from "../../../api/producer/Collection-api"
import { getProduct } from "../../../api/public/Product-api"
import { updateMerch  } from "../../../api/producer/Product-api"

export default function ViewMerchPage() {

    const [merch, setMerch] = useState(null)
    const [title, setTitle] = useState("") // title
    const [description, setDescription] = useState("") // description
    const [collectionSelected, setCollectionSelected] = useState("") // collection
    const [images, setImages] = useState([]) // images
    const [collectionList, setCollectionList] = useState([])
    const [showForm, setShowForm] = useState(false)
    const { successToast, errorToast } = useToasty();
    const [loading, setLoading] = useState(false)


    const merchId = useParams().id;
    const navigate = useNavigate();


    useEffect(() => {
        //get collections 
        getCollections()
            .then(e => {
                let pairCollection = e.map(coll => { return { id: coll._id, value: coll.title } })
                setCollectionList(pairCollection)
            })
            .catch(e => console.log(e))

        initialize()
    }, [])

    // initialize all form data
    const initialize = async () => {
        let result = await getProduct(merchId)
        if (result != null) {
            console.log(result)
            setMerch(result)
            setTitle(result.title)
            setDescription(result.description)
            setCollectionSelected(result.productCollectionID)
            // get images url for InputImagesGroup component
            let images = result.media.map(image => image.url)
            setImages(images)
        } else {
            errorToast(result)
        }
    }

    // toggle form
    const toggleAddVariant = () => {
        setShowForm(p => !p)
    }

    //update merch list
    const getMerch = async() => {
        let result = await getProduct(merchId)
        if (result != null) {
            setMerch(result)
        }
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

        let media = [];
        images.map((img, i) => {
            media.push({ url: img, isMain: (i == 0) })
        })

        const product = {
            title: title,
            description: description,
            priceUnit: "USD",
            collectionID: collectionSelected,
            media: media,
        }
        setLoading(true)

        let productResutl = await updateMerch(merchId, product)

        if (productResutl == true) {
            successToast("Merch updated successfully");
            navigate("/producer/ims")
        } else {
            errorToast(productResutl)
        }
        setLoading(false)
    }



    return (<>

        {(!merch)
            ?
            <Loading />
            :

            <div className="add-product-page-wrapper"  >
                <div className="ims-title mb-5">Add new item</div>

                <div className="mb-4 w-100 p-0">
                    <FormInput
                        label={"Title"}
                        value={title}
                        changeValue={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4 w-100 p-0">
                    <FormInput
                        type={"textarea"}
                        label={"Description"}
                        value={description}
                        changeValue={(e) => setDescription(e.target.value)}
                    />
                </div>

                <dir className="drop-wrape">
                    <Dropdown
                        pairArray={collectionList}
                        change={e => setCollectionSelected(e.target.value)}
                        value={collectionSelected}
                        placeholder={(collectionList.length > 0 && collectionSelected != '') && collectionList.find(coll => coll.id == collectionSelected).value}
                    />
                </dir>

                <div className="mt-5 mb-3 w-100 d-flex justify-content-center align-items-center">
                    <InputImagesGroup setState={setImages} state={images} />
                </div>

                <div className="mt-5 w-100">
                    {merch.skus.map(sku => <Variant key={sku._id} sku={sku} />)}
                </div>

                <div className="mt-5 w-100 d-flex justify-content-center align-items-center">
                    {(showForm == false)
                        ?
                        <BasicButton click={toggleAddVariant}>Add variant</BasicButton>
                        :

                        <AddVariantForm updateMerch={getMerch} productId={merch._id} optionTypes={merch.skus[0].options} toggle={toggleAddVariant}  />
                    }
                </div>

                <div className="d-flex justify-content-between align-items-center"
                    style={{ marginTop: "80px", width: "100%" }}>
                    <div className="col-5 col-md-4">
                        <BasicButton click={cancelForm} loading={loading}>Cancel</BasicButton>
                    </div>
                    <div className="col-5 col-md-4">
                        <BasicButton click={submitForm} loading={loading}>Submit</BasicButton>
                    </div>
                </div>
            </div>
        }
    </>)
}
