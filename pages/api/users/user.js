import user from "../../../models/user";
/* import { dbConnect } from "../../../utils/mongoose"; */
import connectDB from '../../../utils/mongoose';
import Profile from "../../../models/Profile";
import onError from "../../../common/errormiddleware";
import nc from "next-connect";
const cors = require('cors')
//dbConnect();
const handler = nc(onError);
handler.use(cors())
handler.post(async (req, res) => {
  try {
    const {email, password} = req.body
    const newUser = new user({email, password});
    const savedUser = await newUser.save();

    console.log(savedUser)
    
    if(!savedUser){
      return res.json({ "code": "User not created" });
    }else{
      const profile = new Profile({"_id": savedUser._id});
      const savedProfile = await profile.save();
      console.log(savedProfile)
      return res.status(200).json({ "code": "User created" })
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message })
  }
});
handler.put(async (req, res) => {
  const {email, password} = req.body
  await user.findOne({email}).then(user =>{
    if (!user) return res.status(400).json({ msg: "User not exist" })
    user.isCorrectPassword(password, (err,result) =>{
      if(err){
        return res.status(400).json(err)
      }else if(result){
        return res.status(200).json({"code":"Usuario autenticado"})
      }else{
        return res.status(400).json({"code":"Usuario Y/O contraseña incorrecta"})
      }
    })
  })
});

export default connectDB(handler)