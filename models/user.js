import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const salRounds = 10
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "The Email is required "],
      unique: true,
      trim: true,
      maxlength: [30, "Email cannot be grater than 30 characters"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre('save', function(next){
  if(this.isNew || this.isModified('password')){
    const document = this

    bcrypt.hash(document.password, salRounds, (err, hashedPassword)=>{
      if(err){
        next(err)
      }else{
        document.password = hashedPassword;
        next()
      }
    })
  }else{
    next()
  }
})
userSchema.pre('findByIdAndUpdate', function(next){
  if(this.isNew || this.isModified('password')){
    const document = this
    bcrypt.hash(document.password, salRounds, (err, hashedPassword)=>{
      if(err){
        next(err)
      }else{
        document.password = hashedPassword;
        next()
      }
    })
  }else{
    next()
  }
})

userSchema.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err,same){
    if(err){
      callback(err)
    }else{
      callback(err, same)
    }
  })
}


export default models.user || model("user", userSchema);