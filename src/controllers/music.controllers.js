const musicModel= require("../models/music.model");
const {uploadImage}=require("../services/storage.service")
const jwt= require("jsonwebtoken")
async function createMusic(req, res){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"})

    }try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.role!=="artist"){
        return res.status(403).json({message:"you don't have access to create any music"})
    }

   
    const {title}=req.body;
    const file=req.file;

    const result = await uploadImage(file.buffer.toString('base64'))

    const music= await musicModel.create({
        uri:result.uri,
        title,
        artist:decoded.id
    })
    res.status(201).json({
        message:"Music created successfully",
        music:{
            id:music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist
        }    })

}
 catch(err){
    console.log(err);
        return res.status(401).json({message:"Unauthorized"})
    }
}
module.exports={createMusic}