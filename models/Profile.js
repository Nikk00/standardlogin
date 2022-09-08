import { Schema, model, models } from "mongoose";

const profileSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "User",
      maxlength: [20, "name cannot be grater than 20 characters"],
    },
    bio: {
      type: String,
      trim: true,
      default: "Write your biography",
      maxlength: [100, "bio cannot be grater than 100 characters"],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [12, "phone cannot be grater than 12 characters"],
      },
    photo: {
      name: String,
      data: Buffer,
      contentType: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Profile || model("Profile", profileSchema);
