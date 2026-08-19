const express= require('express');
const musicController= require("../controllers//music.controllers")
const authMiddleware= require("../middlewares/auth.middleware")
const multer= require('multer')
const upload=multer({
    storage: multer.memoryStorage()
})

const router=express.Router();
router.post("/upload",authMiddleware.authArtist,upload.single("music"), musicController.createMusic)

router.post("/album",authMiddleware.authArtist, musicController.createAlbum)

module.exports= router;