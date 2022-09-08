import Profile from "../../../models/Profile";
import { dbConnect } from "../../../utils/mongoose";
import onError from "../../../common/errormiddleware";
import nc from "next-connect";
const cors = require('cors')
const fs = require('fs')
/* const path = require("path"); */
const multer  = require('multer')
/* const process = require('process') */
dbConnect();
const handler = nc(onError);
handler.use(cors())
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-'+ file.originalname)
  }
})

const upload = multer({ storage: storage })

let uploadFile = upload.single('myFile');
handler.use(uploadFile)

handler.put(async (req, res) => {
    const {
        query: { id },
        body,
    } = req;
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
      photo:{
      contentType:req.file.mimetype,
      data: encode_img
      }
    };
  /* const saveImage = new Profile({
    photo:{
      data: fs.readFileSync(process.cwd()+'/public/data/uploads/'+ req.file.filename),
      contentType: req.file.mimetype
    } */
  //})
  try {
    const profile = await Profile.findByIdAndUpdate(id, final_img, {
      new: true,
      runValidators: true,
    })
    if (!profile) return res.status(404).json({ msg: "Profile does not exists" });
      return res.status(200).json(profile);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
  
   /* await Profile.save(id, final_img) */
    /* .then(res => {
      res.status(200).json({"code":"Imagen guardada."})
    })
    .catch(err => {
      res.status(400).json(err)
    }) */
});

export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};