import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'

function OptionUploadLogo() {
    const { methods: { dispatch }, state: { shop: { headerIcon } } } = useContext(designContext)
    return <AppUploadImage onChange={(value) => dispatch({ type: 'updateShop', params: { headerIcon: value } })} size="original" values={headerIcon} mode="horizontal" />
}

export default OptionUploadLogo