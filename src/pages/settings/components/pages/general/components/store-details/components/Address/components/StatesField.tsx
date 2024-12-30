import useAppToast from 'functions/hooks/toast/useToast';
import { statesService } from 'lib/apis/address/addressServices';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DropDown from './DropDown';
import { useFormikContext } from 'formik';
import { IAddressInputs } from '../formConfigs';

export default function StatesField() {
    const { showToast } = useAppToast()
    const [states, setStates] = useState([]);
    const { values } = useFormikContext<IAddressInputs>()
    const { isFetching: isStateFetching } = useQuery({
        queryKey: ["state", values.country],
        enabled: !!values.country,
        queryFn: () => statesService({ country_name: values.country }),
        onSuccess(data) {
            const states = data?.data?.data?.states.map((state) => ({ label: state.name, value: state.name }))
            setStates(states);
        },
        onError: () => {
            showToast({
                message: "Unable to states Information",
                type: "error",
            });
        },
    });

    return (
        <DropDown isLoading={isStateFetching} options={states} name="state" placeholder="State" disabled={isStateFetching || !values.country} key={"state"} />
    )
}
