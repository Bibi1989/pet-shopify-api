import { model, Schema } from "mongoose";

const cartSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  category_id: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    default: "1"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categories"
  },
  createdAt: {
    type: String,
    default: new Date().toISOString()
  }
});

export default model("order", cartSchema);
