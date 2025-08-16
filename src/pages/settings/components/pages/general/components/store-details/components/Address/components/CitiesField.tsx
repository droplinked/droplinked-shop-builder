import { useFormikContext } from "formik";
import useAppToast from "hooks/toast/useToast";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { citiesService } from "services/address/addressServices";
import { IAddressInputs } from "../formConfigs";
import DropDown from "./DropDown";

export default function CitiesField() {
    const { showToast } = useAppToast();
    const { t } = useLocaleResources("settings");
    const [cities, setCities] = useState([]);
    const { values } = useFormikContext<IAddressInputs>();
    const { isFetching: isCityFetching } = useQuery({
        queryKey: ["city", values.state, values.country],
        enabled: !!values.state && !!values.country,
        onSuccess(data) {
            const cities = data?.data?.data?.cities.map((city) => ({
                label: city.name,
                value: city.name,
            }));
            setCities(cities);
        },
        queryFn: () =>
            citiesService({ country_name: values.country, state_name: values.state }),
        onError: () => {
            showToast({
                message: t("common:address.errors.citiesError"),
                type: "error",
            });
        },
    });

    return (
        <DropDown
            isLoading={isCityFetching}
            options={cities}
            name="city"
            placeholder={t("common:address.fields.city")}
            disabled={isCityFetching || !values.state}
            key={"city"}
        />
    );
}
