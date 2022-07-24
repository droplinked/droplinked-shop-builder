import "./View-merch-page-style.scss"

import FormInput from "../../../components/shared/FormInput/FormInput"
import InputImagesGroup from "../../../components/shared/InputImageGroupe/Input-images-component"
import CheckBox from "../../../components/shared/Checkbox/CheckBox-component"
import VariantItem from "../components/variant item component/Variant-item-component"
import AddVariantForm from "../components/add variant form/Add-variantForm-component"
import Loading from "../../../components/shared/loading/Loading";
import Dropdown from "../../../components/shared/Dropdown/Dropdown-component"
import SmallModal from "../../../components/Modal/Small-modal/Small-modal-component"
import BasicButton from "../../../components/shared/BasicButton/BasicButton"

import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useToasty } from "../../../context/toastify/ToastContext"
import { useNavigate } from 'react-router-dom';
import { getVariants } from "../../../api/producer/Product-api"
import { getCollections } from "../../../api/producer/Collection-api"
import { getProduct } from "../../../api/public/Product-api"
import { deleteSku, addSkuToProduct, updateMerch, deleteMerch } from "../../../api/producer/Product-api"

export default function ViewMerchPage() {

    const [merch, setMerch] = useState([])
    const [title, setTitle] = useState("") // title
    const [description, setDescription] = useState("") // description
    const [collectionSelected, setCollectionSelected] = useState("") // collection
    const [images, setImages] = useState([]) // images
    const [varintType, setVariantType] = useState([]) //variantsType
    const [collectionList, setCollection] = useState([])
    const [options, setOptions] = useState([])
    const [variants, setVariants] = useState([])
    const [addvariant, setAddvariant] = useState(false)
    const [deleteMerchModal, setDeleteModal] = useState(false)
    const { successToast, errorToast } = useToasty();
    const [disbtn, setdisbtn] = useState(false)
    const [modalDisBtn, setModalDisBtn] = useState(false)


    const merchId = useParams().id;
    const navigate = useNavigate();


    useEffect(() => {

        const initialData = async () => {
            let variantresult = await getVariants()
            let collectionResult = await getCollections()
            await getMerch()
            if (variantresult != null) setVariantType(variantresult)
            if (collectionResult != null) {
                let collectionArray = collectionResult.map(coll => { return { id: coll._id, value: coll.title } })
                setCollection(collectionArray)
            }

        }

        initialData()

    }, [])


    useEffect(() => {
        setTitle(merch.title)
        setDescription(merch.description)
        setCollectionSelected(merch.productCollectionID)
        if (merch.media) {
            let imgs = merch.media.map(im => im.url)
            setImages(imgs)
        }
        if (merch.skus) {
            let vatnt = merch.skus.map(im => im)
            setVariants(vatnt)
        }
    }, [merch])

    const toggleAddVariant = () => {
        setAddvariant(p => !p)
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

    //delete variant
    const deleteVariant = async (id, veri) => {
        let result = deleteSku(veri._id)
        if (result == true) {
            await getMerch()
        } else {
            errorToast(result)
        }
    }

    //delete edit variant
    const editVariant = (e) => {
    }

    const getMerch = async () => {
        let productResult = await getProduct(merchId)
        if (productResult != null) {
            setMerch(productResult)
        } else {
            errorToast(productResult)
        }

    }


    //delete merch
    const DeleteMerch = async () => {
        setModalDisBtn(true)
        let result = await deleteMerch(merchId)
        if (result == true) {
            successToast("Merch deleted successfully");
            navigate("/producer/ims")
        } else {
            errorToast(result)
            setDeleteModal(false)
        }
        setModalDisBtn(false)
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
        else if (collectionSelected == "") {
            errorToast("Select a collection");
            return;
        } else if (variants.length == 0) {
            errorToast("Add a variant");
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
            productCollectionID: collectionSelected,
            media: media,
            sku: variants
        }

        const sku = variants.filter(vr => vr.ownerID == undefined)

        if (sku.length > 0) {
            let skuResult = await addSkuToProduct(merchId, sku)
            if (skuResult != true) errorToast(skuResult)
        }

        setdisbtn(true)
        let productResutl = await updateMerch(merchId, product)
        if (productResutl == true) {
            successToast("Merch updated successfully");
            navigate("/producer/ims")
        } else {
            errorToast(productResutl)
        }
        setdisbtn(false)
    }

    return (<>
        {(merch == [])

            ?
            <Loading />
            :

            <div className="add-product-page-wrapper"  >
                <div className="ims-title mb-5">Add new item</div>

                <div className="col-12 col-md-6 mb-5">
                    <BasicButton click={() => setDeleteModal(true)} bgColor='#fa6653'>Delete merch</BasicButton>
                </div>

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
                    <Dropdown pairArray={collectionList} change={e => setCollectionSelected(e.target.value)} value={collectionSelected} />
                </dir>
                <div className="mt-5 mb-3 w-100 d-flex justify-content-center align-items-center">
                    <InputImagesGroup setState={setImages} state={images} />
                </div>
                <div className="select-variant-wrap mt-4">
                    <p>Choose options : </p>
                    {(varintType != undefined) &&
                        <>
                            {varintType.map(item => {
                                return <CheckBox key={item._id} val={item._id} id={item._id} onch={onChnageCheckBox}>{item.name}</CheckBox>
                            })}
                        </>
                    }
                </div>
                <div className="mt-5 w-100">
                    {variants.map((variant, i) => {
                        return <VariantItem key={i} variant={variant} id={i} dlt={deleteVariant} edit={editVariant} />
                    })}
                </div>

                <div className="mt-5 w-100 d-flex justify-content-center align-items-center">
                    {(addvariant == false)
                        ?
                        <BasicButton click={toggleAddVariant}>Add variant</BasicButton>
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
                {deleteMerchModal &&
                    <SmallModal
                        show={deleteMerchModal}
                        hide={() => setDeleteModal(false)}
                        text={"Do you want to delete this merch?"}
                        click={DeleteMerch}
                        disable={modalDisBtn}
                    />}
            </div>
        }
    </>)
}