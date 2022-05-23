import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function ShopInfoAddress({ close, addAddressF, addressData }) {
    const [loading, setLoading] = useState(false)
    const token = JSON.parse(localStorage.getItem('token'));

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            line1: (addressData) && addressData.line1,
            line2: (addressData && (addressData.line2 != undefined)) && addressData.line2,
            country: (addressData) && addressData.country,
            city: (addressData) && addressData.city,
            state: (addressData) && addressData.state,
            Zip: (addressData) && addressData.Zip

        }
    });


    const onSubmit = data => {
        setLoading(true);

        let addresInfo = {
            addressLine1: data.line1,
            addressLine2: data.line2,
            country: data.country,
            city: data.city,
            state: data.state,
            zip: data.Zip
        }
        axios.post('https://api.droplinked.com/dev/producer/shop/address', addresInfo,
            { headers: { Authorization: 'Bearer ' + token } })
            .then(e => {
                toast.success("address added")
                localStorage.setItem('address', JSON.stringify(e.data.addressBook))
                addAddressF(data);
                close();
            })
            .catch(e => {
                toast.error(e.response.data.message.message)
                setLoading(false);
            })



    };




    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="register-label-input ">
                <label>Address line 1</label>
                <input type="text" placeholder="Address line 1" {...register("line1", { required: true })} />
                {errors.line1?.type === 'required' && <span className="span-error">line1 is required</span>}
            </div>

            <div className="register-label-input ">
                <label>Address line 2 ( building of unit # )</label>
                <input type="text" placeholder="Address line 2 ( building of unit # )" {...register("line2")} />
            </div>

            <div className="d-flex justify-content-between w-100" style={{ maxWidth: "100%" }}>
                <div className="register-label-input" style={{ width: "45%" }}>
                    <label>Country</label>
                    <input type="text" placeholder="Country" {...register("country", { required: true })} />
                    {errors.country?.type === 'required' && <span className="span-error">country is required</span>}
                </div>
                <div className="register-label-input" style={{ width: "45%" }}>
                    <label>City</label>
                    <input type="text" placeholder="City" {...register("city", { required: true })} />
                    {errors.city?.type === 'required' && <span className="span-error">city is required</span>}
                </div>
            </div>

            <div className="d-flex justify-content-between w-100" style={{ maxWidth: "100%" }}>
                <div className="register-label-input" style={{ width: "45%" }}>
                    <label>State</label>
                    <input type="text" placeholder="State" {...register("state", { required: true })} />
                    {errors.state?.type === 'required' && <span className="span-error">state is required</span>}
                </div>
                <div className="register-label-input" style={{ width: "45%" }}>
                    <label>Zip</label>
                    <input type="text" placeholder="Zip" {...register("Zip", { required: true })} />
                    {errors.Zip?.type === 'required' && <span className="span-error">Zip is required</span>}
                </div>
            </div>

            <input type="submit" className={`next-back-btn ${(loading ? "loading-btn" : "non-loading-btn")}`} value="save" />
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
    </>
    )
}