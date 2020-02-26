import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isSeller: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: String,
    default: new Date().toISOString()
  }
});

export default model("user", userSchema);
