import "./Personal-page-style.scss"


import { useState, useEffect, useContext } from "react";
import { toastValue } from "../../../context/toastify/ToastContext"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../context/profile/ProfileContext"
import { updateProfileApi } from "../../../api/base-user/Profile-api"
import  InputImage  from "../../../components/shared/InputImage/InputImage"

export default function PersonalPage() {

    const [profileImg, setProfileImg] = useState("")
    const [loading, setLoading] = useState(false);

    const { updateProfile } = useProfile()
    const { errorToast } = useContext(toastValue)
    
    let user = JSON.parse(localStorage.getItem('profile'));


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

    let navigate = useNavigate();


    const onSubmit = async (data) => {
        setLoading(true)
        let profileInfo = {
            firstname: data.firstName,
            lastname: data.lastName,
            avatar: (profileImg == undefined) ? "" : profileImg,
            phone: data.phoneNumber,
        }

        let result = await updateProfileApi(profileInfo)
        if (result.status == 'success') {
            updateProfile(result.data.user)
            navigate("/register/shopInfo");
        } else {
            errorToast(result.reason)
        }

        setLoading(false);
    }


    return (
        // <RegisterStructure level={"personalinfo"}>

        <div className="register-personalinfo-wrapper">

            <InputImage image={profileImg} setImage={setProfileImg}/>

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
                    <input type="email" placeholder="email" readOnly  value={user.email} />
                </div>
                <div className="register-label-input ">
                    <label>Phone number</label>
                    <input type="number"
                        {...register("phoneNumber")} />
                </div>
                {/* {errors.phoneNumber?.type === 'required' && <span className="register-error">phone number is required</span>} */}
                <div className="d-flex justify-content-end w-100">
                    <input type="submit" value="Next" className={`next-back-btn ${(loading) ? "loading-btn" : "non-loading-btn"}`} />
                </div>
            </form>
        </div>
        // </RegisterStructure>
    )
}



