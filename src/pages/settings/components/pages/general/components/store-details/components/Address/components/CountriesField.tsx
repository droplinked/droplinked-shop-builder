import useAppToast from 'hooks/toast/useToast';
import { allCountriesService } from 'services/address/addressServices';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import DropDown from './DropDown';

export default function CountriesField() {
    const { showToast } = useAppToast()
    const [countries, setCountries] = useState([]);
    const { isFetching: isCountryFetching } = useQuery({
        queryKey: ["country"],
        queryFn: () => allCountriesService(),
        onSuccess(data) {
            const countries = data?.data?.data?.countries.map((country) => ({ label: country.name, value: country.name }))
            setCountries(countries)
        },
        onError: () => {
            showToast({
                message: "Unable to countries Information",
                type: "error",
            });
        },
    });

    return (
        <DropDown isLoading={isCountryFetching} options={countries} name="country" placeholder="Country" key={"country"} />
    )
}
