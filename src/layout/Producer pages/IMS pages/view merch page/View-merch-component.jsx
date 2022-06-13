import "./View-merch-style.scss"

import BasicButton from "../../../../components/features/buttons components/basic button/BasicButton";
import BasicInput from "../../../../components/features/input components/basic input component/Basic-component";
import InputImageComponent from "../../../../components/features/input components/input image component/Input-image-component";
import CheckBoxBasic from "../../../../components/features/input components/basic checkbox component/CheckBox-component";
import VariantItem from "../../add product page/variant item component/Variant-item-component"
import AddVariantForm from "../../add product page/add variant form/Add-variantForm-component"
import Loading from "../../../../components/features/loading/Loading";
import DropDownPairValId from "../../../../components/features/input components/dropdown pair val and id/Dropdonw-valId-component"
import AutoWidthButton from "../../../../components/features/buttons components/autow basic button/B-button-component"
import SmallModal from "../../../../components/Modal/little modal/Small-modal-component"

import { BasicURL } from "../../../../sevices/functoinal-service/CallApiService";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useToasty } from "../../../../sevices/hooks/useToastify"
import { GetAuth } from "../../../../sevices/functoinal-service/CallApiService"
import { useNavigate } from 'react-router-dom';

import axios from "axios";

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

    const token = JSON.parse(localStorage.getItem('token'));



    useEffect(() => {

        let url1 = BasicURL + "/producer/product/variant"
        let url2 = BasicURL + "/producer/collection"

        const requestOne = axios.get(url1, { headers: { Authorization: 'Bearer ' + token } });
        const requestTwo = axios.get(url2, { headers: { Authorization: 'Bearer ' + token } });

        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
            setVariantType(responseOne.data.data.variants);
            setCollection(responseTwo.data.data.collections);
            let collectionArray = responseTwo.data.data.collections.map(coll => { return { id: coll._id, value: coll.title } })
            setCollection(collectionArray)
        })).catch(errors => {
            errorToast(errors.response.data.reason)
        })
        GetAuth(`/producer/product/${merchId}?withSku=true`, resHandler, errorHandler)
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


    const resHandler = (e) => {
        setMerch(e.data.data.product);
    }

    const errorHandler = (e) => {
        errorToast(e.response.data.reason)
    }

    const onChnageCheckBox = (e) => {
        let newOprions = []
        if (e.target.checked) {
            for (const opt of options) newOprions.push(opt)
            newOprions.push(e.target.value)
            setOptions(newOprions)
        } else {
            for (const opt of options) newOprions.push(opt)
            newOprions.map((item, i) => { if (item == e.target.value) newOprions.splice(i, 1) })
            setOptions(newOprions)
        }
    }

    //delete variant
    const deleteVariant = (id, veri) => {
        axios.delete(`${BasicURL}/producer/product/sku/${veri._id}`,
            { headers: { Authorization: 'Bearer ' + token } })
            .then(e => {
                console.log(e.data.status)
                GetAuth(`/producer/product/${merchId}?withSku=true`, resHandler, errorHandler)
            })
            .catch(e => errorToast(e.response.data.message))
    }

    //delete edit variant
    const editVariant = (e) => {
    }


    //delete merch
    const DeleteMerch = () => {
        setModalDisBtn(true)
        axios.delete(`${BasicURL}/producer/product/${merchId}`,
            { headers: { Authorization: 'Bearer ' + token } })
            .then(e => {
                successToast("Merch deleted successfully");
                navigate("/producer/ims")
            })
            .catch(e => {
                errorToast(e.response.data.message)
                setModalDisBtn(false)
                setDeleteModal(false)
            })
    }


    const cancelForm = () => {
        navigate("/producer/ims")
    }

    const submitForm = (e) => {
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
            axios.post(`${BasicURL}/producer/product/${merchId}/sku`,
                { skus: sku },
                { headers: { Authorization: 'Bearer ' + token } })
                .then(e => {
                })
                .catch(e => { errorToast(e.response.data.message) })
        }

        setdisbtn(true)
        axios.put(BasicURL + `/producer/product/${merchId}`, product,
            { headers: { Authorization: 'Bearer ' + token } })
            .then(e => {
                successToast("Merch updated successfully");
                navigate("/producer/ims")
            })
            .catch(e => {
                errorToast(e.response.data.message)
                setdisbtn(false)
            })
    }

    return (<>
        {(merch == [])

            ?
            <Loading />
            :

            <div className="add-product-page-wrapper"  >
                <div className="ims-title mb-5">Add new item</div>

                <div className="col-12 col-md-6 mb-5">
                    <AutoWidthButton text="Delete merch" click={() => setDeleteModal(true)} style={{ backgroundColor: "#fa6653" }} />
                </div>

                <div className="mb-4 w-100 p-0">
                    <BasicInput text={"Title"} value={title} change={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-4 w-100 p-0">
                    <BasicInput type={"textarea"} value={description} change={(e) => setDescription(e.target.value)} text={"Description "} />
                </div>
                <dir className="drop-wrape">
                    <DropDownPairValId pairArray={collectionList} change={e => setCollectionSelected(e.target.value)} value={collectionSelected} />
                </dir>
                <div className="mt-5 mb-3 w-100 d-flex justify-content-center align-items-center">
                    <InputImageComponent setState={setImages} state={images} />
                </div>
                <div className="select-variant-wrap mt-4">
                    <p>Choose options : </p>
                    {(varintType != undefined) &&
                        <>
                            {varintType.map(item => {
                                return <CheckBoxBasic key={item._id} val={item._id} id={item._id} onch={onChnageCheckBox}>{item.name}</CheckBoxBasic>
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