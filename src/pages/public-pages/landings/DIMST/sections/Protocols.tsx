import { NetworkLg } from 'assets/icons/System/Network/NetworkLg';
import SelectMenu from 'components/redesign/select-menu/SelectMenu';
import React from 'react';
import CardsOverlay from './components/CardsOverlay';
import useROICalculation from '../hooks/useROICalculation';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface Props {
    roiCalculationVariables: ReturnType<typeof useROICalculation>;
}

export default function Protocols({ roiCalculationVariables }: Props) {
    const { t } = useLocaleResources('public-pages/landings/DIMST')

    const { networks, setSelectedNetwork, selectedNetwork } = roiCalculationVariables
    const convertedNetworks = networks.map(network => ({
        value: String(network.value),
        label: network.title
    }))

    return (
        <CardsOverlay title={t("Protocols.title")} icon={<NetworkLg color='#fff' />}>
            <SelectMenu
                items={convertedNetworks}
                onChange={(value) => setSelectedNetwork(+value)}
                value={String(selectedNetwork)}
                placeholder={convertedNetworks.find(network => String(network.value) === String(selectedNetwork))?.label || 'Select Protocol'}
                fullWidth
            />
        </CardsOverlay>
    )
}
