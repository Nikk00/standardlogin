import Profile from "../../../models/Profile";
import connectDB from "../../../utils/mongoose";
import onError from "../../../common/errormiddleware";
import nc from "next-connect";
const cors = require('cors')
const handler = nc(onError);
handler.use(cors())
handler.post(async (req, res) => {
  const {_id} = req.body
  try {
    const profile = new Profile({"_id": _id});
    const savedProfile = await profile.save();
    console.log(savedProfile)
    if(!savedProfile){
      return res.json({ "code": "Profile not created" });
    }else{
      //return res.redirect('/changeinfo')
      return res.status(200).json({"Code": "Profile Creado!"})
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});
handler.get(async (req, res) => {
  try {
    const users = await Profile.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
})
export default connectDB(handler)