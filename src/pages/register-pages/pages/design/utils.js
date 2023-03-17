


export const isValidData = ( shopData ) => {
    let result = true

    if(shopData.backgroundImage.length === 0){
        result = false
    }else if (shopData.headerIcon.length === 0){
        result = false
    }else if (shopData.logo.length === 0){
        result = false
    }

    return result

}