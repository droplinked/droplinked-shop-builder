import "./PersonalInfo.scss"
import RegisterStructure from "../register structure/RegisterStructure"
import { useRef, useState , useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import img from "../../../assest/image/default profile/icons8-user-100.png"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useProfile } from "../../../sevices/hooks/useProfile"

export default function PersonalInfo() {
    const [profileImg, setProfileImg] = useState(undefined)
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(undefined);
    const [uploadingImage, setUploadingImage] = useState(false);
    const { updateProfile } = useProfile()

    let user = JSON.parse(localStorage.getItem('profile'));
    const token = JSON.parse(localStorage.getItem('token'));

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            firstName: (user.firstname)? user.firstname : "",
            lastName: (user.lastname) ? user.lastname : "",
            phoneNumber: (user.phone) ? user.phone : ""
        }
    });

    useEffect(()=>{
        if(user.avatar){
            setProfileImg(user.avatar)
        }
    })

    const inputFile = useRef(null);
    let navigate = useNavigate();
    const chooseFile = () => {
        inputFile.current.click();
    };


    const changeImage = (e) => {
        setUploadingImage(true);
        const file = e.target.files[0];

        if (file.size > 200000) {
            toast.error("File size exceeded (Max: 200 kb)");
            setUploadingImage(false);
            return;
        }
        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/gif" &&
            file.type !== "image/jpg"
        ) {
            toast.error("File type not supported");
            setUploadingImage(false);
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        axios.post('https://cdn.droplinked.com/upload', formData)
            .then(e => {
                setUploadingImage(false);
                toast.success(e.data.message);
                setProfileImg(e.data.small)
            })
            .catch(e => {
                toast.error(e.response.data.message);
                setUploadingImage(false);
                return;
            })

    }



    const onSubmit = data => {
        setLoading(true)
        let profileInfo = {
            firstname: data.firstName,
            lastname: data.lastName,
            avatar: (profileImg == undefined)? "" : profileImg,
            phone: data.phoneNumber,
        }
        axios.put('https://api.droplinked.com/dev/producer/profile', profileInfo,
            { headers: { Authorization: 'Bearer ' + token } }
        ).then(res => {
            updateProfile(res.data)
            navigate("/register/shopInfo");
        })
            .catch(err => {
                setMessage(err.response.data.message.message);
                setLoading(false);
            })
    }


    return (
        <RegisterStructure level={"personalinfo"}>

            <div className="register-personalinfo-wrapper">
                <div className="error-message">{(message != undefined) && message}</div>
                <div className="input-perosnal-image" onClick={chooseFile}
                    style={{ backgroundImage: `url(${(profileImg == undefined) ? img : profileImg})` }}>
                    {(uploadingImage) &&
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    }
                    <input className="d-none" type="file" ref={inputFile} onChange={changeImage} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex justify-content-between w-100" style={{ maxWidth: "100%" }}>
                        <div className="register-label-input" style={{ width: "45%" }}>
                            <label>First name</label>
                            <input type="text" placeholder="first name"
                                {...register("firstName", { required: true })} />
                            {errors.firstName?.type === 'required' && <span className="register-error">firstname is required</span>}
                        </div>

                        <div className="register-label-input" style={{ width: "45%" }}>
                            <label>Last name</label>
                            <input type="text" placeholder="last name"
                                {...register("lastName", { required: true })} />
                            {errors.lastName?.type === 'required' && <span className="register-error">lastname is required</span>}
                        </div>

                    </div>
                    <div className="register-label-input ">
                        <label>Email</label>
                        <input type="email" placeholder="email" readonly value={user.email} />
                    </div>
                    <div className="register-label-input ">
                        <label>Phone number</label>
                        <input type="number" placeholder="phone number"
                            {...register("phoneNumber")} />
                    </div>
                    {errors.phoneNumber?.type === 'required' && <span className="register-error">phone number is required</span>}
                    <div className="d-flex justify-content-end w-100">
                        <input type="submit" value="next" className={`next-back-btn ${(loading) ? "loading-btn" : "non-loading-btn"}`} />
                    </div>
                </form>
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
        </RegisterStructure>
    )
}



