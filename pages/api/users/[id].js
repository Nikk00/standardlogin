import user from "../../../models/user";
import { dbConnect } from "../../../utils/mongoose";
import onError from "../../../common/errormiddleware";
import nc from "next-connect";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const cors = require('cors')
dbConnect();
const handler = nc(onError);
handler.use(cors())
handler.get(async (req, res) => {
  const {
    query: { id },
    body,
} = req;
if(id != ''){
  try {
    const users = await user.find({email: id})
    if (!users) return res.status(404).json({ msg: "User does not exists" });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}else{
  try {
    const users = await user.find({body})
    if (!users) return res.status(404).json({ msg: "User does not exists" });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}
  
});
handler.put(async (req, res) => {
    const {
      query: { id },
      body,
  } = req;
  body.password = bcrypt.hashSync(body.password, salt);
    try {
      const users = await user.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      if (!users) return res.status(404).json({ msg: "User does not exists" });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
});
handler.delete(async (req, res) => {
  const {
    query: { id },
    body,
} = req;
  try {
    const deletedUsers = await user.findByIdAndDelete(id);
    if (!deletedUsers)
      return res.status(404).json({ msg: "User does not exists" });
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});
export default handler
