import Profile from "../../../models/Profile";
import { dbConnect } from "../../../utils/mongoose";
import onError from "../../../common/errormiddleware";
import nc from "next-connect";
const cors = require('cors')
const fs = require('fs')
const multer  = require('multer')
dbConnect();
const handler = nc(onError);
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
handler.use(cors())
handler.get(async (req, res) => {
    const {
      query: { id },
      body,
  } = req;
    try {
      const profile = await Profile.findById(id);
      if (!profile) return res.status(201).json({ msg: "Profile does not exists" });
      return res.status(200).json(profile);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
})
handler.put(async (req, res) => {
  const {
    query: { id },
    body,
    file,
} = req;
  
    try {
      if(file == undefined){
        const profile = await Profile.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!profile) return res.status(404).json({ msg: "Profile does not exists" });
        return res.status(200).json(profile);
      }else{
        var img = fs.readFileSync(file.path);
        var encode_img = img.toString('base64');
        console.log(file.filename)
        var final_img = {
          photo:{
            name: file.filename,
            contentType:file.mimetype,
            data: encode_img
        }}
        const result = Object.assign(body,final_img);
        const profile = await Profile.findByIdAndUpdate(id, result, {
          new: true,
          runValidators: true,
        });
        if (!profile) return res.status(404).json({ msg: "Profile does not exists" });
        return res.status(200).json(profile);
      }
      
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
})
handler.delete(async (req, res) => {
  const {
    query: { id }
} = req;
    try {
      const deletedProfile = await Profile.findByIdAndDelete(id);
      if (!deletedProfile)
        return res.status(404).json({ msg: "Profile does not exists" });
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
})

export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};