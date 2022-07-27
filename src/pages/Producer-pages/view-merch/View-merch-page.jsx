import "./View-merch-page-style.scss"

import FormInput from "../../../components/shared/FormInput/FormInput"
import InputImagesGroup from "../../../components/shared/InputImageGroupe/Input-images-component"
import VariantItem from "../components/variant-item-component/Variant-item-component"
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
import { updateMerch, deleteSku } from "../../../api/producer/Product-api"

export default function ViewMerchPage() {

    const [merch, setMerch] = useState(null)
    const [title, setTitle] = useState("") // title
    const [description, setDescription] = useState("") // description
    const [collectionSelected, setCollectionSelected] = useState("") // collection
    const [images, setImages] = useState([]) // images

    const [collectionList, setCollectionList] = useState([])
    const [selectedSku, setSelectedSku] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const { successToast, errorToast } = useToasty();



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
    const closeForm = () => {
        setShowForm(false)
        setSelectedSku(null)
    }

    //update merch list
    const getMerch = async () => {
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
            errorToast("Item name is required");
            return;
        } else if (description == "") {
            errorToast("Item description is required");
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
            successToast("Item successfully updated");
            navigate("/producer/ims")
        } else {
            errorToast(productResutl)
        }
        setLoading(false)
    }

    const editSku = (sku) => {
      setSelectedSku(sku)
    }



    const deleteVariant = async(id) => {
            let result = await deleteSku(id)
            if(result == true){
                successToast("deleted");
                getMerch()
            }else{
                errorToast(result)
            }
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
                    {merch.skus.map(sku => <VariantItem key={sku._id} id={sku._id} variant={sku} deleteVariant={deleteVariant} editVariant={editSku} />)}
                </div>

                <div className="mt-5 w-100 d-flex justify-content-center align-items-center">
                    {(showForm == false && selectedSku==null)
                        ?
                        <BasicButton click={()=>{setShowForm(true)}}>Add variant</BasicButton>
                        :

                        <AddVariantForm updateMerch={getMerch} productId={merch._id} optionTypes={merch.skus[0].options} defaultSku={selectedSku} toggle={closeForm} />
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
