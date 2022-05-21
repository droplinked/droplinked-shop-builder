import { useForm } from "react-hook-form";
import { useState } from "react";

export default function ShopInfoAddress({ close, addAddressF, addressData }) {
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            line1: (addressData) && addressData.line1,
            country: (addressData) && addressData.country,
            city: (addressData) && addressData.city,
            state: (addressData) && addressData.state,
            Zip: (addressData) && addressData.Zip

        }
    });
    const [loading, setLoading] = useState(false)

    const onSubmit = data => {
        addAddressF(data);
        close();
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="register-label-input ">
                <label>Address line 1</label>
                <input type="text" placeholder="Address line 1" {...register("line1", { required: true })} />
                {errors.line1?.type === 'required' && <span className="span-error">line1 is required</span>}
            </div>

            <div className="register-label-input ">
                <label>Address line 2 ( building of unit # )</label>
                <input type="text" placeholder="Address line 2 ( building of unit # )" />
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
    )
}