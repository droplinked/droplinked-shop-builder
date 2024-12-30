import useAppToast from 'functions/hooks/toast/useToast';
import { citiesService } from 'lib/apis/address/addressServices';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DropDown from './DropDown';
import { useFormikContext } from 'formik';
import { IAddressInputs } from '../formConfigs';

export default function CitiesField() {
    const { showToast } = useAppToast()
    const [cities, setCities] = useState([]);
    const { values } = useFormikContext<IAddressInputs>()
    const { isFetching: isCityFetching } = useQuery({
        queryKey: ["city", values.state, values.country],
        enabled: !!values.state && !!values.country,
        onSuccess(data) {
            const cities = data?.data?.data?.cities.map((city) => ({ label: city.name, value: city.name }))
            setCities(cities);
        },
        queryFn: () => citiesService({ country_name: values.country, state_name: values.state }),
        onError: () => {
            showToast({
                message: "Unable to cities Information",
                type: "error",
            });
        },
    });


    return (
        <DropDown isLoading={isCityFetching} options={cities} name="city" placeholder="City" disabled={isCityFetching || !values.state} key={"city"} />
    )
}
