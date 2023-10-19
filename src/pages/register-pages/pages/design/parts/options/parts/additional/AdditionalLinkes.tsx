import { VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppInput from 'components/common/form/textbox/AppInput'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import { IAdditionalLinkes } from 'pages/register-pages/pages/design/reducer'
import React, { useCallback, useContext } from 'react'
import OptionsCaption from '../caption/OptionsCaption'

interface IProps {
    element: "footerLinks" | "bannerLinks"
}

function AdditionalLinkes({ element }: IProps) {
    const { methods: { dispatch }, state: { shop: { shopDesign } } } = useContext(designContext)

    const change = useCallback((key, value, field) => {
        const data = shopDesign[element].map((el: IAdditionalLinkes, elKey: number) => ({
            caption: key === elKey && field === "caption" ? value : el.caption,
            link: key === elKey && field === "link" ? value : el.link
        }))
        dispatch({ type: 'updateShop', params: { shopDesign: { [element]: data } } })

    }, [element, shopDesign])

    const add = useCallback(() => {
        dispatch({ type: 'updateShop', params: { shopDesign: { [element]: [...shopDesign[element], { caption: '', link: '' }] } } })
    }, [element, shopDesign.footerLinks, shopDesign.bannerLinks])

    return (
        <VStack align="stretch" spacing="24px">
            <OptionsCaption caption='Additional linkes' />
            {shopDesign[element] && shopDesign[element].map((el, key) => (
                <VStack key={key} align="stretch">
                    <AppInput name='' value={el.caption} onChange={(e) => change(key, e.target.value, 'caption')} placeholder='Caption' />
                    <AppInput name='' value={el.link} onChange={(e) => change(key, e.target.value, 'link')} placeholder='http://' />
                </VStack>
            ))}
            <BasicButton sizes="large" onClick={add}>Add Link</BasicButton>
        </VStack>
    )
}

export default AdditionalLinkes