import { Flex, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import { IAdditionalLinkes } from 'pages/register-pages/pages/design/reducer'
import React, { useCallback, useContext } from 'react'
import OptionsCaption from '../caption/OptionsCaption'

interface IProps {
    element: "footerLinks" | "bannerLinks"
}

function AdditionalLinkes({ element }: IProps) {
    const { methods: { dispatch }, state: { shop: { shopDesign } } } = useContext(designContext)
    const { showToast } = useAppToast()

    const change = useCallback((key, value, field) => {
        const data = shopDesign[element].map((el: IAdditionalLinkes, elKey: number) => ({
            caption: key === elKey && field === "caption" ? value : el.caption,
            link: key === elKey && field === "link" ? value : el.link,
            save: el.save
        }))
        dispatch({ type: 'updateShop', params: { shopDesign: { [element]: data } } })
    }, [element, shopDesign])

    const add = useCallback(() => {
        dispatch({ type: 'updateShop', params: { shopDesign: { [element]: [...shopDesign[element], { caption: '', link: '' }] } } })
    }, [element, shopDesign.footerLinks, shopDesign.bannerLinks])

    const deleted = useCallback((key) => {
        dispatch({ type: 'updateShop', params: { shopDesign: { [element]: shopDesign[element].filter((el, elKey) => key !== elKey) } } })
    }, [element, shopDesign.footerLinks, shopDesign.bannerLinks])

    const trigger = useCallback((key, save: boolean) => {
        const target = shopDesign[element].find((el, elKey) => key === elKey)
        if (save && !target.caption.length || !target.link.length) return showToast("Please comlete form", "error")
        dispatch({ type: 'updateShop', params: { shopDesign: { [element]: shopDesign[element].map((el, elKey) => ({ ...el, save: elKey === key ? save : el.save })) } } })
    }, [element, shopDesign.footerLinks, shopDesign.bannerLinks])

    return (
        <VStack align="stretch" spacing="24px">
            <OptionsCaption caption='Footer Items' />
            <VStack align="stretch" spacing="12px">
                {shopDesign[element] && shopDesign[element].map((el, key) => (
                    <>
                        {el.save ? (
                            <Flex gap="20px" color="#C2C2C2" justifyContent="space-between">
                                <AppTypography size="14px">{el.caption}</AppTypography>
                                <AppIcons.EditIcon onClick={() => trigger(key, false)} width="18px" height="18px" style={{ cursor: "pointer" }} />
                            </Flex>
                        ) : (
                            <VStack key={key} align="stretch">
                                <VStack align="stretch" spacing="3px">
                                    <AppTypography size="14px" color="#C2C2C2">Item Name</AppTypography>
                                    <AppInput name='' value={el.caption} onChange={(e) => change(key, e.target.value, 'caption')} placeholder='Privacy Policy' />
                                </VStack>
                                <VStack align="stretch" spacing="3px">
                                    <AppTypography size="14px" color="#C2C2C2">URL</AppTypography>
                                    <AppInput name='' value={el.link} onChange={(e) => change(key, e.target.value, 'link')} placeholder='http://' />
                                </VStack>
                                <BasicButton sizes='medium' onClick={() => trigger(key, true)}>Save</BasicButton>
                                <BasicButton sizes='medium' variant='outline' onClick={() => deleted(key)}>Delete</BasicButton>
                            </VStack>
                        )}
                    </>
                ))}
            </VStack>
            <BasicButton variant={shopDesign[element].length ? "outline" : "solid"} onClick={add}>Add Link</BasicButton>
        </VStack>
    )
}

export default AdditionalLinkes