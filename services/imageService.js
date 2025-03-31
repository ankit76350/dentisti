export const getUserImageSrc = imagePath => {
    if (imagePath) {
        return getCatalystFileUrl(imagePath)
    } else {
        return require('../assets/images/defaultuser.png')
    }
}


export const getCatalystFileUrl = filePath => {
    if (filePath) {
        return { uri: null } // later fetch from database
    }
    return null
}