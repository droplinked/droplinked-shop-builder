import "./Add-product.page.scss"
import { useState, useRef, useEffect } from "react"
import BasicInput from "../../../components/features/input components/basic input component/Basic-component"
import BasicDropDown from "../../../components/features/input components/basic dropdown/Basic-dropdown-component"
import InputImageComponent from "../../../components/features/input components/input image component/Input-image-component"
import CheckBoxBasic from "../../../components/features/input components/basic checkbox component/CheckBox-component"
import VariantItem from "./variant item component/Variant-item-component"
import BasicButton from "../../../components/features/buttons components/basic button/BasicButton"
import InputRow from "../../../components/features/input components/row input component/Input-row-component"
import AddVariantForm from "./add variant form/Add-variantForm-component"
import axios from "axios"

function AddProductPage() {
    const [addvariant, setAddvariant] = useState(false)
    const [images, setImages] = useState([])
    const [variants, setVariants] = useState([])
    const [varint, setVar] = useState(undefined)
    const [options, setOptions] = useState([])
    const [collectionList, setCollection] = useState(undefined)

    const collections = ["public merchs", "collecion 1", "collecion 2", "collecion 3"];
    const token = JSON.parse(localStorage.getItem('token'));

    const title = useRef("");
    const description = useRef("");
    const collection = useRef(null);

    const colors = ["red", "blue", "green", "black", "white", "yellow", "brown"];
    const sizes = ["small", "medium", "large", "xl", "xxl"];


    useEffect(() => {
        let url1 = "https://api.droplinked.com/dev/producer/product/variant"
        let url2 = "https://api.droplinked.com/dev/producer/collection"

        const requestOne = axios.get(url1, { headers: { Authorization: 'Bearer ' + token } });
        const requestTwo = axios.get(url2, { headers: { Authorization: 'Bearer ' + token } });

        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
            setVar(responseOne.data.variants);
            setCollection(responseTwo.data.collections);
        })).catch(errors => {
            console.log(errors);
        })

    }, [])

    const toggleAddVariant = () => {
        setAddvariant(p => !p)
    }

    const submitForm = (e) => {
        e.preventDefault()

        let media = [];
        images.map((img, i) => {
            media.push({ url: img, isMain: (i == 0) })
        })

        const proDetail = {
            title: title.current.value,
            description: description.current.value,
            priceUnit: "USD",
            productCollectionID: "629366bc022ac4220b842fd4",
            media: media,
            sku: variants
        }

        axios.post('https://api.droplinked.com/dev/producer/product', proDetail,
            { headers: { Authorization: 'Bearer ' + token } })
            .then((res) => {
                console.log(res.data);
            })
            .catch(e => console.log(e));

    }


    const onChnageCheckBox = (e) => {
        let newOprions = []
        let values;
        if (e.target.checked) {
            for (const opt of options) {
                newOprions.push(opt)
            }

            if (e.target.value == "628df708028da49d3f6a73eb") { values = sizes }
            if (e.target.value == "628df720028da49d3f6a73ec") { values = colors }
            newOprions.push({
                variantID: e.target.value,
                valus: values
            })
            setOptions(newOprions)
        } else {
            for (const opt of options) {
                newOprions.push(opt)
            }
            newOprions.map((item, i) => {
                if (item.variantID == e.target.value) { newOprions.splice(i, 1) }
            })
            setOptions(newOprions)
        }
    }



    return (
        <div className="add-product-page-wrapper"  >
            <div className="ims-title mb-5">Add new merch</div>
            <BasicInput refs={title} />
            <BasicInput type={"textarea"} refs={description} />
            <dir className="drop-wrape">
                <BasicDropDown vals={collections} place={"choose collection"} refs={collection} />
            </dir>
            <div className="mt-5 mb-3 w-100 d-flex justify-content-center align-items-center">
                <InputImageComponent setState={setImages} state={images} />
            </div>
            <div className="select-variant-wrap mt-4">
                <p>Choose options : </p>
                {(varint != undefined) &&
                    <>
                        {varint.map(item => {
                            return <CheckBoxBasic vari={item} id={item._id} onch={onChnageCheckBox}>{item.name}</CheckBoxBasic>
                        })}
                    </>
                }
            </div>
            <div className="mt-5 w-100">
                {variants.map(variant => {
                    return <VariantItem size={variant.options[1].value} color={variant.options[0].value} quantity={variant.quantity} price={variant.price} externalId={variant.externalID} />
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
                <BasicButton text={"submit"} click={submitForm} />
                <BasicButton text={"cancel"} click={submitForm} />
            </div>
        </div>
    )
}

export default AddProductPage