// const url = `https://api.cloudinary.com/v1_1/imprincekush/auto/upload`
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`

const uploadFileCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append("upload_preset", "chat-app")  //to store in any folder of cloudinary

    const response =await fetch(url, {
        method:'post',
        body: formData
    })
    const responseData = await response.json()

    return responseData
}

export default uploadFileCloudinary