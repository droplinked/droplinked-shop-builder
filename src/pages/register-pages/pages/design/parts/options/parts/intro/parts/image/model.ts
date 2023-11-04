const uploadAddress = 'https://upload-file-flatlay.s3.us-west-2.amazonaws.com'
const images = [
    uploadAddress + '/91b9390f2d29012f8920c49444f30fd815c8ae033cc2894707cc011042fcd41c.png_or.png',
    uploadAddress + '/4e72d49e4de6b50c66be928360af0f78442299d11af80751c51d8dfcf14dd9bf.png_or.png',
    uploadAddress + '/97d61d7fb0fd493c15267dfe912dbd418beb119eddb607fd5f543dd8386815b1.png_or.png',
    uploadAddress + '/6615ad35af266a1107ce8aae97442c4d4774cf42989f7f32b417c418f0a4fcdd.png_or.png',
    uploadAddress + '/ca99d11b41ee8bc01492b27bd1b74b54d6932a755fca77e29fb2f6d8a92b3bd9.png_or.png',
]
const OptionBannerModel = ({
    images,
    defaults: [
        {
            banner_src: images[0],
            thumb: uploadAddress + "/91b9390f2d29012f8920c49444f30fd815c8ae033cc2894707cc011042fcd41c.png",
            color: "#27262B",
        },
        {
            banner_src: images[1],
            thumb: uploadAddress + "/4e72d49e4de6b50c66be928360af0f78442299d11af80751c51d8dfcf14dd9bf.png",
            color: "#27262B",
        },
        {
            banner_src: images[2],
            thumb: uploadAddress + "/97d61d7fb0fd493c15267dfe912dbd418beb119eddb607fd5f543dd8386815b1.png",
            color: "#27262B",
        },
        {
            banner_src: images[3],
            thumb: uploadAddress + "/6615ad35af266a1107ce8aae97442c4d4774cf42989f7f32b417c418f0a4fcdd.png",
            color: "#27262B",
        },
        {
            banner_src: images[4],
            thumb: uploadAddress + "/ca99d11b41ee8bc01492b27bd1b74b54d6932a755fca77e29fb2f6d8a92b3bd9.png",
            color: "#27262B",
        },
    ]

})

export default OptionBannerModel