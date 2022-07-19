

//get date and return mm/dd/yy
export const convertToStandardFormat = (currentDate) => {

    let newDate = new Date(currentDate).toString().split(' ')
    newDate = newDate[1] + '/' + newDate[2] + '/' + newDate[3]
    return newDate
}



export const convetToCustomFormat = (currentDate) => {
    let timeOfOrder = new Date(currentDate).getTime()
    let now = new Date().getTime()
    let time = (now - timeOfOrder) / (1000 * 3600 * 24);

    if (time > 1) {
        return convertToStandardFormat(currentDate)
    } else {
        if(parseInt(time * 24)>1){
            return `${parseInt(time * 24)} hours ago`
        }else{
            return `${parseInt(time * 24 * 60)} minutes ago`
        }
    }
}