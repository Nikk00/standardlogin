import user from "../../../models/user";
import { dbConnect } from "../../../utils/mongoose";

dbConnect();

export default async function usersHandler(req, res) {
  const {
    method,
    query: { id },
    body,
} = req;

  switch (method) {
    case "GET":
      try {
        const users = await user.findById(id);
        if (!users) return res.status(404).json({ msg: "User does not exists" });
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "PUT":
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
    case "DELETE":
      try {
        const deletedUsers = await user.findByIdAndDelete(id);
        if (!deletedUsers)
          return res.status(404).json({ msg: "User does not exists" });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}