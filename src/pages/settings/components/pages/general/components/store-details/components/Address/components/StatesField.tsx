import { useFormikContext } from "formik";
import useAppToast from "hooks/toast/useToast";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { statesService } from "services/address/addressServices";
import { IAddressInputs } from "../formConfigs";
import DropDown from "./DropDown";

export default function StatesField() {
    const { showToast } = useAppToast();
    const { t } = useLocaleResources("settings");
    const [states, setStates] = useState([]);
    const { values } = useFormikContext<IAddressInputs>();
    const { isFetching: isStateFetching } = useQuery({
        queryKey: ["state", values.country],
        enabled: !!values.country,
        queryFn: () => statesService({ country_name: values.country }),
        onSuccess(data) {
            const states = data?.data?.data?.states.map((state) => ({
                label: state.name,
                value: state.name,
            }));
            setStates(states);
        },
        onError: () => {
            showToast({
                message: t("common:address.errors.statesError"),
                type: "error",
            });
        },
    });

    return (
        <DropDown
            isLoading={isStateFetching}
            options={states}
            name="state"
            placeholder={t("common:address.fields.state")}
            disabled={isStateFetching || !values.country}
            key={"state"}
        />
    );
}
