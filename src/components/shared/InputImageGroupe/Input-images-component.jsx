import "./Input-images-component.scss"

import axios from "axios"
import dltImg from "../../../assest/icon/icons8-multiply-100.png"

import { useRef, useState} from "react"
import { useToasty } from "../../../context/toastify/ToastContext"

export default function InputImagesGroup({ setState, state }) {

    const [loading, setLoading] = useState(false);
    const fileRef = useRef(null);

    const { successToast , errorToast } = useToasty()

    const changeImage = (e) => {
      
        const file = e.target.files[0];
        if (file.size > 500000) {
            errorToast("File size exceeded (Max: 500 kb)");
            setLoading(false);
            return;
        }
        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/gif" &&
            file.type !== "image/jpg"
        ) {
            errorToast("File type not supported");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        setLoading(true);
        axios.post('https://cdn.droplinked.com/upload', formData)
            .then(e => {
                let imgArr = [];
                for (let i = 0; i < state.length; i++) {
                    imgArr.push(state[i])
                }
                imgArr.push(e.data.standard)
                setState(imgArr)
                successToast(e.data.message);
                setLoading(false);
                return;
            })
            .catch(e => {
                errorToast(e.response.data.message);
                setLoading(false);
                return;
            })
    }


    const deleteImg = (e)=>{
        let newArr = state.filter(url => url!=e)
        setState(newArr)
    }


    return (
        <div className="input-images-component-wrapper d-flex justify-content-start">
            {state.map((items, i) => {
                return (<div className="img-item " id={i} key={i}>
                    <img className="delete-icon" src={dltImg} alt="delete" onClick={()=>deleteImg(items)} />
                    <img src={items} />
                </div>)
            })}

            <div className="img-item ratio ratio-1x1">
                {(loading == true)
                    ?
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center input-add-image">
                        <div className="spinner-border text-light w-50 h-50" role="status" >
                            <span className="sr-only"></span>
                        </div>
                    </div>
                    :
                    <div className="input-add-image"
                        onClick={() => { fileRef.current.click() }}>
                        <p>+ Add image</p>
                    </div>
                }
            </div>
            <input type="file" className="d-none" ref={fileRef} onChange={changeImage} />
        </div>
    )
}