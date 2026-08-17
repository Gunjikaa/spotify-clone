const{ImageKit}=require('@imagekit/nodejs');

const ImageKitClient=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadImage(file){
    const result= await ImageKitClient.files.upload({
        file,
        fileName:"music_" + Date.now(),
        folder:"Backend/music"
    })
    return result;
}
module.exports={uploadImage}