import "./PersonalInfo.scss"

import RegisterStructure from "../register structure/RegisterStructure"
import axios from 'axios';

import { useRef, useState, useEffect, useContext } from "react";
import { toastValue } from "../../../sevices/context/Toast-context"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../sevices/hooks/useProfile"
import { ReactComponent as IconMenu } from "../assest/icons8-delete.svg"
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"

export default function PersonalInfo() {

    const [profileImg, setProfileImg] = useState(null)
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const { updateProfile } = useProfile()

    const { errorToast, successToast } = useContext(toastValue)
    let user = JSON.parse(localStorage.getItem('profile'));
    const token = JSON.parse(localStorage.getItem('token'));

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            firstName: (user.firstname) ? user.firstname : "",
            lastName: (user.lastname) ? user.lastname : "",
            phoneNumber: (user.phone) ? user.phone : ""
        }
    });

    useEffect(() => {
        if (user.avatar) {
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

        if (file.size > 500000) {
            errorToast("File size exceeded (Max: 500 kb)");
            setUploadingImage(false);
            return;
        }
        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/gif" &&
            file.type !== "image/jpg"
        ) {
            errorToast("File type not supported");
            setUploadingImage(false);
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        axios.post('https://cdn.droplinked.com/upload', formData)
            .then(e => {
                
                setUploadingImage(false);
                successToast(e.data.message);
                setProfileImg(e.data.small)
            })
            .catch(e => {
                errorToast(e.response.data.message);
                setUploadingImage(false);
                return;
            })
    }

    const deleteImage = () => {
        user = { ...user, avatar: "" }
        localStorage.setItem('profile', JSON.stringify(user));
        setProfileImg(null);
        inputFile.current.value = ""
    }



    const onSubmit = data => {
        setLoading(true)
        let profileInfo = {
            firstname: data.firstName,
            lastname: data.lastName,
            avatar: (profileImg == undefined) ? "" : profileImg,
            phone: data.phoneNumber,
        }
        axios.put(BasicURL+'/profile', profileInfo,
            { headers: { Authorization: 'Bearer ' + token } }
        ).then(res => {
          //  updateProfile(res.data.data.user)
            navigate("/register/shopInfo");
        })
            .catch(err => {
                errorToast(err.response.data.reason);
                setLoading(false);
            })
    }

console.log("x");
    return (
        // <RegisterStructure level={"personalinfo"}>

            <div className="register-personalinfo-wrapper">

                <div className="input-perosnal-image"
                    style={{ backgroundImage: `url(${(profileImg == null || profileImg == "") ? "" : profileImg})` }}>
                    {(uploadingImage) &&
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    }
                    <input className="d-none" type="file" ref={inputFile} onChange={changeImage} />
                    <div className="add-image-hov"
                        onClick={chooseFile}>+</div>
                    {(profileImg == undefined || profileImg == "") ? <></> :
                        <div className="delet-image-icon" onClick={deleteImage}>
                            <IconMenu style={{ width: "100%", height: "100%" }} />
                        </div>
                    }
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex justify-content-between w-100" style={{ maxWidth: "100%" }}>
                        <div className="register-label-input" style={{ width: "45%" }}>
                            <label>First name</label>
                            <input type="text"
                                {...register("firstName", { required: true })} />
                            {errors.firstName?.type === 'required' && <span className="register-error">required</span>}
                        </div>

                        <div className="register-label-input" style={{ width: "45%" }}>
                            <label>Last name</label>
                            <input type="text"
                                {...register("lastName", { required: true })} />
                            {errors.lastName?.type === 'required' && <span className="register-error">required</span>}
                        </div>

                    </div>
                    <div className="register-label-input ">
                        <label>Email</label>
                        <input type="email" placeholder="email" readonly value={user.email} />
                    </div>
                    <div className="register-label-input ">
                        <label>Phone number</label>
                        <input type="number"
                            {...register("phoneNumber")} />
                    </div>
                    {/* {errors.phoneNumber?.type === 'required' && <span className="register-error">phone number is required</span>} */}
                    <div className="d-flex justify-content-end w-100">
                        <input type="submit" value="next" className={`next-back-btn ${(loading) ? "loading-btn" : "non-loading-btn"}`} />
                    </div>
                </form>
            </div>
        // </RegisterStructure>
    )
}



