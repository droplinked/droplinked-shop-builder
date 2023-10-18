import AppColorPicker from 'components/common/colorPicker/AppColorPicker';
import { designContext } from 'pages/register-pages/pages/design/design-context';
import React, { useContext } from 'react'

function HeaderIconsColor() {
    const { methods: { dispatch }, state: { shop: { shopDesign: { headerBackground } } } } = useContext(designContext)

    return <AppColorPicker onChange={(color) => dispatch({ type: 'updateShop', params: { shopDesign: { headerBackground: color } } })} value={headerBackground || '#aabbcc'} />
}

export default HeaderIconsColor