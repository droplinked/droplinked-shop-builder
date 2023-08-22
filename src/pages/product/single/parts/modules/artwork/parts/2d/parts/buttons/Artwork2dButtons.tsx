import { Flex } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import useAppToast from 'functions/hooks/toast/useToast'
import { IpodGenerateMockupService } from 'lib/apis/pod/interfaces'
import { podGenerateMockupService } from 'lib/apis/pod/services'
import { appDeveloment } from 'lib/utils/app/variable'
import { productContext } from 'pages/product/single/context'
import introductionClass from 'pages/product/single/parts/general/model'
import VariantsMakeDataModel from 'pages/product/single/parts/modules/variants/model/modules/makeData'
import React, { useCallback, useContext } from 'react'
import { useMutation } from 'react-query'
import artwork2dContext, { artwork2dStates } from '../../context'
import Artwork2dButtonsModel from './model'

function Artwork2dButtons() {
    const { mutateAsync, isLoading } = useMutation((params: IpodGenerateMockupService) => podGenerateMockupService(params))
    const { state: { sku, artwork }, productID, methods: { updateState }, store: { state: { variants, available_variant } } } = useContext(productContext)
    const { position, setStates } = useContext(artwork2dContext)
    const { check_available } = VariantsMakeDataModel
    const { refactorImage } = introductionClass
    const { showToast } = useAppToast()
    const { getSizeImage } = Artwork2dButtonsModel

    const submit = useCallback(async () => {
        try {
            const variant_ids = sku.map(el => check_available({ available_variant, options: el.options }).size?.id)
            let width = position.width

            if (!artwork) throw Error("Please upload artwork")
            if (!Boolean(variant_ids.find(el => el))) throw Error("Please pick size and color variant")

            if (!width) {
                const size: any = await getSizeImage(artwork)
                width = Math.round((size.width / size.height) * position.height)
            }

            const data = await mutateAsync({
                productId: variants._id,
                params: {
                    variant_ids,
                    files: [
                        {
                            image_url: artwork,
                            placement: "front",
                            position: {
                                ...position,
                                width
                            }
                        }
                    ]
                }
            })
            updateState("media", refactorImage(data?.data?.data))
            updateState("positions", position)
            updateState("artwork_position", 'front')
        } catch (error) {
            showToast(error?.message || "Somthing went wrong", "error");
        }
    }, [variants, sku, available_variant, artwork, position])

    const reset = useCallback(async () => {
        updateState("media", [])
        updateState("artwork", null)
        updateState("artwork_position", null)
        updateState("positions", null)
        setStates(artwork2dStates)
    }, [])

    return (
        <Flex justifyContent="space-between" flexDirection="row-reverse">
            <BasicButton onClick={submit} isDisabled={!appDeveloment || Boolean(productID)} isLoading={isLoading}>Save</BasicButton>
            <BasicButton onClick={reset} variant="outline" isDisabled={isLoading || Boolean(productID)}>Reset All</BasicButton>
        </Flex>
    )
}

export default Artwork2dButtons