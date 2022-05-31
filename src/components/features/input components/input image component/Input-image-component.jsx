import "./Input-image-component.scss"
import img1 from "./testimg1.jpg"
import img2 from "./testimg2.jpg"
import { useRef, useState } from "react"
import Loading from "../../loading/Loading"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function InputImageComponent({ setState, state }) {

    const [loading, setLoading] = useState(false);
    const fileRef = useRef(null);

    const changeImage = (e) => {
        setLoading(true);
        const file = e.target.files[0];

        if (file.size > 200000) {
            toast.error("File size exceeded (Max: 200 kb)");
            setLoading(false);
            return;
        }
        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/gif" &&
            file.type !== "image/jpg"
        ) {
            toast.error("File type not supported");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        axios.post('https://cdn.droplinked.com/upload', formData)
            .then(e => {
                console.log(e.data.standard);
                let imgArr = [];
                for (let i = 0; i < state.length; i++) {
                    imgArr.push(state[i])
                }
                imgArr.push(e.data.standard)
                setState(imgArr)
                toast.success(e.data.message);
                setLoading(false);
                return;
            })
            .catch(e => {
                toast.error(e.response.data.message);
                setLoading(false);
                return;
            })
        setLoading(false);

    }

    return (
        <div className="input-images-component-wrapper d-flex justify-content-start">
            {state.map((items, i) => {
                return (<div className="img-item " id={i}>
                    <img src={items} />
                </div>)
            })}

            <div className="img-item ratio ratio-1x1">
                {(loading == true)
                    ?
                    <Loading />
                    :
                    <div className="input-add-image"
                        onClick={() => { fileRef.current.click() }}>
                        <p>+ add image</p>
                    </div>
                }

            </div>
            <input type="file" className="d-none" ref={fileRef} onChange={changeImage} />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </div>
    )
}