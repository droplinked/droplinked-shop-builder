import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useState } from 'react'

function OptionUploadLogo() {
    const { methods: { dispatch }, state: { shop: { logo } } } = useContext(designContext)
    return <AppUploadImage onChange={(value) => dispatch({ type: 'updateShop', params: { logo: value } })} size="original" values={logo} mode="horizontal" />
}

export default OptionUploadLogo