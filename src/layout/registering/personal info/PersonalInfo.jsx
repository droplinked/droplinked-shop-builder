import "./PersonalInfo.scss"
import RegisterStructure from "../register structure/RegisterStructure"
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import img from "../../../assest/image/default profile/icons8-user-100.png"

export default function PersonalInfo() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [profileImg, setProfileImg] = useState(undefined)
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(undefined);

    const inputFile = useRef(null);
    let user = JSON.parse(localStorage.getItem('profile'));
    let navigate = useNavigate();
    const token = user.jwt;
    const chooseFile = () => {
        inputFile.current.click();
    };


    const enterImage = (e) => {
        // let uploadimg = e.target.files[0];
        // const formData = new FormData();
        // formData.append("image", uploadimg);
        // axios.post('http://18.215.217.156:2021/upload', formData)
        //     .then(res => { console.log(res) })
        //     .catch(e => { console.log(e) })

        // const reader = new FileReader();
        // reader.onload = () => {
        //     img = reader.result;
        //     changeAvatar();
        // }
        // reader.readAsDataURL(uploadimg);
    }

    // async function changeAvatar() {
    //     try {
    //         if (img) {
    //             const image = base64ToImage(img, "image");
    //             const formData = new FormData();
    //             formData.append("image", image, image.name);
    //             axios.post('http://18.215.217.156:2021/upload', formData)
    //                 .then(res => { console.log(res) })
    //                 .catch(e => { console.log(e) })

    //             //    localStorage.setItem("picUrl", res.ID);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         this.toastr.error("Error in change your image", "Error");

    //     }
    // }

    // function base64ToImage(dataurl, filename) {
    //     const arr = dataurl.split(",");
    //     const mime = arr[0].match(/:(.*?);/)[1];
    //     const bstr = atob(arr[1]);
    //     let n = bstr.length;
    //     const u8arr = new Uint8Array(n);
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     return new File([u8arr], filename, { type: mime });
    // }




    const onSubmit = data => {
        setLoading(true)
        let profileInfo = {
            firstname: data.firstName,
            lastname: data.lastName,
            avatar: "",
            phone: data.phoneNumber
        }
        axios.put('https://api.droplinked.com/dev/producer/profile', profileInfo,
            { headers: { Authorization: 'Bearer ' + token } }
        ).then(res => {
            let profile = {
                jwt: user.jwt,
                user: res.data
            }
            localStorage.setItem("profile", JSON.stringify(profile));
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
                    style={{ backgroundImage: `url(${(profileImg == undefined) ? img : img})` }}
                >
                    <input className="d-none" type="file" ref={inputFile}
                        onClick={enterImage}
                    />
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
                        <input type="email" placeholder="email" readonly value={user.user.email} />
                    </div>
                    <div className="register-label-input ">
                        <label>Phone number</label>
                        <input type="number" placeholder="phone number"
                            {...register("phoneNumber", { required: true })} />
                    </div>
                    {errors.phoneNumber?.type === 'required' && <span className="register-error">phone number is required</span>}
                    <div className="d-flex justify-content-end w-100">
                        <input type="submit" className={`next-back-btn ${(loading) ? "loading-btn" : "non-loading-btn"}`} />
                    </div>
                </form>
            </div>
        </RegisterStructure>
    )
}



