import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    cart: [
      {
        qty: {
          type: Number,
          required: true,
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          unique: false,
          ref: "Product",
        },
      },
    ],
    contact: {
      type: Number,
      require: true,
    },
    location:{
        type:String,
        
    },
    password: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
